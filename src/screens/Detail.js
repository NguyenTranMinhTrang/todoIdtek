import React from "react";
import { LogBox, View, Text, Alert, ScrollView, TouchableOpacity, Switch, ActivityIndicator, Pressable, Keyboard } from "react-native";
import { SIZES, COLORS, FONTS, dummys } from "../constants";
import { AntDesign, Fontisto } from '@expo/vector-icons';
import DatePicker from "../components/DatePicker";
import * as yup from 'yup';
import { Formik, FastField, FieldArray } from "formik";
import InputField from "../components/InputField";
import InputDetail from "../components/InputDetail";
import debounce from "lodash.debounce";
import { SelectList } from "react-native-dropdown-select-list";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
/* redux */
import { useSelector } from "react-redux";
import actions from "../redux/actions";
import { formatDate } from "../helpers";

const today = new Date();
LogBox.ignoreLogs(['Non-serializable']);
LogBox.ignoreLogs(['Warning: Each child']);

const Detail = ({ navigation, route }) => {

    const state = useSelector((state) => state.todo.state);
    const loading = useSelector((state) => state.todo.loading);
    const [show, setShow] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const formik = React.useRef();
    const arrayHelpersRef = React.useRef(null);
    const colors = dummys.colors;

    const debouncedValidate = React.useMemo(
        () => debounce(() => formik.current?.validateForm, 500),
        [formik],
    );

    React.useEffect(() => {
        setDate(route.params.item.date);
    }, []);

    React.useEffect(() => {
        debouncedValidate(formik.current?.values);
    }, [formik.current?.values, debouncedValidate]);




    const validate = yup.object().shape({
        job: yup.string().required("Name job is required !"),
        delete: yup.number().min(1, "The minimum is 1").max(formik.current?.values.todoDetails.length, "Number is invalid!")

    });

    const updateTodo = (values) => {
        actions.updateTodo({
            ...values,
            date
        })
            .then((result) => {
                Alert.alert(result);
                if (state.single) {
                    actions.checkChangeDate(state.date);
                }
                else {
                    actions.getListFilter(state.date.start, state.date.end);
                }
            });
    }

    const checkEnable = () => {
        if (date.getFullYear() <= today.getFullYear() && date.getMonth() <= today.getMonth()
            && date.getDate() < today.getDate()
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    const renderHeader = () => {
        return (
            <View
                style={{
                    padding: SIZES.padding
                }}
            >
                {/* Title */}
                <View
                    style={{
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            height: 50,
                            width: 50,
                            justifyContent: 'center',
                            alignItems: "flex-start"
                        }}

                        onPress={() => navigation.goBack()}
                    >
                        <AntDesign
                            name="arrowleft"
                            size={30}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>
                    <Text style={{ ...FONTS.h2 }}>Detail</Text>
                </View>
            </View>
        )
    };

    const renderContent = () => {
        return (
            <View
                style={{
                    paddingHorizontal: SIZES.padding
                }}
            >
                <Formik
                    innerRef={formik}
                    enableReinitialize={true}
                    validationSchema={validate}
                    validateOnChange={false}
                    initialValues={{
                        ...route.params.item,
                        delete: 1
                    }}
                    onSubmit={(values) => {
                        updateTodo(values);
                    }}
                >
                    {({ setFieldValue, values, handleSubmit, errors, touched }) => {

                        return (
                            <>
                                {/* Name job */}
                                <FastField
                                    name="job"
                                >
                                    {(props) => (
                                        <InputField title="To do: " {...props} />
                                    )}
                                </FastField>

                                {(errors.job && touched.job) &&
                                    <Text style={{ ...FONTS.h3_light, color: "red", marginTop: SIZES.base }}>{errors.job}</Text>
                                }

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginTop: SIZES.padding
                                    }}
                                >
                                    <FastField
                                        name="delete"
                                    >
                                        {(props) => (
                                            <InputField
                                                style={{
                                                    flex: 1,
                                                }}
                                                title="Todo details :"
                                                {...props}
                                            />
                                        )}
                                    </FastField>

                                    <TouchableOpacity
                                        style={{
                                            borderRadius: SIZES.radius,
                                            padding: SIZES.base * 2,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: COLORS.red,
                                            width: 55,
                                            marginLeft: SIZES.base
                                        }}

                                        onPress={() => {
                                            arrayHelpersRef.current.remove(values.delete - 1);
                                        }}
                                    >
                                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>-</Text>
                                    </TouchableOpacity>
                                </View>

                                {(errors.delete && touched.delete) &&
                                    <Text style={{ ...FONTS.h3_light, color: "red", marginTop: SIZES.base }}>{errors.delete}</Text>
                                }

                                <FieldArray

                                    name="todoDetails"
                                    render={({ push, remove, insert }) => {

                                        arrayHelpersRef.current = { remove };
                                        return (
                                            <View
                                                style={{
                                                    marginVertical: SIZES.padding
                                                }}
                                            >
                                                {
                                                    values.todoDetails && values.todoDetails.length > 0 ? (
                                                        <ScrollView
                                                            style={{
                                                                height: SIZES.height * 0.2
                                                            }}
                                                        >
                                                            {
                                                                values.todoDetails.map((detail, index) => {
                                                                    return (
                                                                        <FastField
                                                                            name={`todoDetails.${index}`}
                                                                        >
                                                                            {(props) => (
                                                                                <InputDetail
                                                                                    key={index}
                                                                                    index={index}
                                                                                    insert={insert}
                                                                                    remove={remove}
                                                                                    {...props}
                                                                                />
                                                                            )}
                                                                        </FastField>
                                                                    )
                                                                })
                                                            }
                                                        </ScrollView>
                                                    ) :
                                                        (
                                                            <TouchableOpacity
                                                                style={{
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    backgroundColor: COLORS.blue,
                                                                    borderRadius: SIZES.radius,
                                                                    padding: SIZES.base * 2,
                                                                }}

                                                                onPress={() => push('')}
                                                            >
                                                                <Text style={{ ...FONTS.h3, color: COLORS.white }}>Add todo details</Text>
                                                            </TouchableOpacity>
                                                        )

                                                }
                                            </View>
                                        )

                                    }
                                    }
                                />

                                {/* Select colors */}

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginBottom: SIZES.padding
                                    }}
                                >
                                    <Text style={{ ...FONTS.h3 }}>Color :</Text>
                                    <SelectList
                                        data={colors}
                                        boxStyles={{
                                            marginLeft: SIZES.base,
                                            backgroundColor: COLORS[values.priority],
                                            width: 200
                                        }}
                                        search={false}
                                        placeholder={values.priority}
                                        dropdownTextStyles={{
                                            ...FONTS.h3_light,
                                            color: COLORS.black
                                        }}
                                        inputStyles={{
                                            ...FONTS.h3,
                                            color: COLORS.white
                                        }}
                                        save="value"
                                        setSelected={(val) => setFieldValue("priority", val)}
                                    />
                                </View>


                                {/* Date */}

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginBottom: SIZES.padding
                                    }}
                                >
                                    <Text style={{ ...FONTS.h3 }}>Date :</Text>

                                    <View
                                        style={{
                                            backgroundColor: COLORS.orange,
                                            borderColor: COLORS.white,
                                            marginLeft: SIZES.base,
                                            flex: 1,
                                            borderWidth: 1,
                                            borderRadius: SIZES.radius,
                                            padding: SIZES.base * 2,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between"
                                        }}
                                    >
                                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>{formatDate(date)}</Text>

                                        <TouchableOpacity
                                            style={{
                                                height: 32,
                                                width: 32,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginLeft: SIZES.base,
                                            }}

                                            onPress={() => setShow(true)}
                                        >
                                            <Fontisto name="date" size={25} color={COLORS.white} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Switch */}
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginBottom: SIZES.padding
                                    }}
                                >
                                    <Text style={{ ...FONTS.h3, marginRight: SIZES.base }}>Complete :</Text>
                                    <Switch
                                        trackColor={{ false: COLORS.white, true: COLORS.complete }}
                                        thumbColor={COLORS.pink}
                                        ios_backgroundColor={COLORS.white}
                                        onValueChange={() => setFieldValue('complete', !values.complete)}
                                        value={values?.complete}
                                        disabled={checkEnable()}
                                    />
                                </View>

                                <View
                                    style={{
                                        alignItems: "center",
                                        marginTop: SIZES.padding
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            width: "90%",
                                            height: 60,
                                            backgroundColor: COLORS.pink,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: SIZES.radius
                                        }}

                                        onPress={handleSubmit}
                                    >
                                        {
                                            loading ?
                                                <ActivityIndicator size="large" color={COLORS.white} />
                                                :
                                                <Text style={{ ...FONTS.h3, color: COLORS.white }}>Update</Text>
                                        }
                                    </TouchableOpacity>
                                </View>
                            </>
                        )
                    }}
                </Formik>

            </View>
        )
    }

    return (
        <Pressable
            style={{ flex: 1, backgroundColor: COLORS.white }}
            onPress={() => Keyboard.dismiss()}
        >
            <KeyboardAwareScrollView>
                <ScrollView >
                    <DatePicker show={show} setShow={setShow} setChooseDate={setDate} check={false} />
                    {renderHeader()}
                    {renderContent()}
                </ScrollView>
            </KeyboardAwareScrollView>
        </Pressable>
    )
}

export default Detail;
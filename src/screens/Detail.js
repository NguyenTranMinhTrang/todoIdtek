import React from "react";
import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import debounce from "lodash.debounce";
import { Formik, FastField } from "formik";
import * as yup from "yup";
import { AntDesign } from "@expo/vector-icons";
import { LogBox, View, Text, Alert, ScrollView, TouchableOpacity, ActivityIndicator, Pressable, Keyboard } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants";
import { DatePicker, InputField, TodoDetails, ComboboxColor, ChooseDateDetails, SwitchDetails } from "../components";
/* redux */
import actions from "../redux/actions";

LogBox.ignoreLogs(["Non-serializable"]);
LogBox.ignoreLogs(["Warning: Each child"]);

const Detail = ({ navigation, route }) => {
    const state = useSelector((state) => state.todo.state);
    const loading = useSelector((state) => state.todo.loading);
    const [show, setShow] = React.useState(false);
    const [showDetails, setShowDetails] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const formik = React.useRef();

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
        delete: yup.number().min(1, "The minimum is 1"),

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

    const renderHeader = () => (
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
    );

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
                    {({ setFieldValue, values, handleSubmit, errors, touched, isSubmitting }) => {

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

                                {/* Todo details */}

                                <View
                                    style={{
                                        marginVertical: SIZES.padding,
                                        flexDirection: "row",
                                        alignItems: "center"
                                    }}
                                >
                                    <Text style={{ ...FONTS.h3 }}>Todo Details:</Text>
                                    <TouchableOpacity
                                        onPress={() => setShowDetails(!showDetails)}
                                        style={{
                                            backgroundColor: COLORS.green,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: SIZES.radius,
                                            padding: SIZES.base * 2,
                                            marginLeft: SIZES.base
                                        }}
                                    >
                                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>{showDetails ? "Close Detail" : "Open Details"}</Text>
                                    </TouchableOpacity>
                                </View>
                                {
                                    showDetails && <TodoDetails />
                                }

                                {/* Select colors */}

                                <ComboboxColor priority={values.priority} setFieldValue={setFieldValue} />

                                {/* Date */}

                                <ChooseDateDetails setShow={setShow} date={date} />

                                {/* Switch */}

                                <SwitchDetails date={date} complete={values.complete} setFieldValue={setFieldValue} />


                                {/* Button Update */}
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
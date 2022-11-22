import React from "react";
import { LogBox, View, Text, Alert, TextInput, TouchableOpacity, Switch, ActivityIndicator, Pressable, Keyboard } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants";
import { AntDesign, Fontisto } from '@expo/vector-icons';
import DatePicker from "../components/DatePicker";
import * as yup from 'yup';
import { Formik } from "formik";
/* redux */
import { useSelector } from "react-redux";
import actions from "../redux/actions";
import { formatDate } from "../helpers";

const today = new Date();
LogBox.ignoreLogs(['Non-serializable']);

const Detail = ({ navigation, route }) => {

    const state = useSelector((state) => state.todo.state);
    const loading = useSelector((state) => state.todo.loading);
    const [show, setShow] = React.useState(false);
    const [date, setDate] = React.useState(new Date());


    console.log("Details render");

    console.log(date);

    React.useEffect(() => {
        setDate(route.params.item.date);
    }, []);

    const validate = yup.object().shape({
        job: yup.string().required("Name job is required !")
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
                    enableReinitialize={true}
                    validationSchema={validate}
                    initialValues={{
                        ...route.params.item
                    }}
                    onSubmit={(values) => {
                        validate
                            .then((valid) => {
                                console.log(valid);
                                if (valid) {
                                    updateTodo(values);
                                }
                                else {
                                    Alert.alert("There is an error in your form !");
                                }
                            })

                    }}
                >
                    {({ handleChange, touched, handleSubmit, values, setFieldValue, errors, handleBlur }) => {
                        console.log(touched);
                        return (
                            <>
                                {/* Name job */}
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginBottom: SIZES.base
                                    }}
                                >
                                    <Text style={{ ...FONTS.h3 }}>To do :</Text>
                                    <TextInput
                                        value={values?.job}
                                        style={{
                                            borderColor: COLORS.white,
                                            marginLeft: SIZES.base,
                                            flex: 1,
                                            borderWidth: 1,
                                            borderRadius: SIZES.radius,
                                            padding: SIZES.base * 2,
                                            backgroundColor: COLORS.blue,
                                            color: COLORS.white,
                                            ...FONTS.h3
                                        }}
                                        onChangeText={handleChange('job')}
                                        onBlur={handleBlur('job')}
                                    />
                                </View>
                                {(errors.job && touched.job) &&
                                    <Text style={{ ...FONTS.h3_light, color: "red" }}>{errors.job}</Text>
                                }

                                {/* Date */}

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginVertical: SIZES.padding
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
            <DatePicker show={show} setShow={setShow} setChooseDate={setDate} check={false} />
            {renderHeader()}
            {renderContent()}
        </Pressable>
    )
}

export default Detail;
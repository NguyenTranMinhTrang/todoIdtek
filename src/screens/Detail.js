import React from "react";
import { View, Text, Alert, TextInput, TouchableOpacity, Switch, Modal, Pressable, Keyboard } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants";
import { AntDesign, Fontisto, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
/* redux */
import actions from "../redux/actions";
import { formatDate } from "../helpers";


const Detail = ({ navigation, route }) => {

    const [todo, setTodo] = React.useState(null);
    const [show, setShow] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const now = new Date();

    React.useEffect(() => {
        setTodo(route.params.item);
        const stringDate = route.params.item.date;
        var dateParts = stringDate.split("/");
        setDate(new Date(dateParts[2], dateParts[1] - 1, dateParts[0]))
    }, []);

    const updateState = (key, value) => {
        const temp = { ...todo };
        temp[key] = value;
        setTodo({
            ...temp
        });
    }

    const updateTodo = () => {
        if (todo.job !== "") {
            actions.updateTodo(todo);
            actions.checkChangeDate(formatDate(route.params.initialDate));
        }
        else {
            Alert.alert("Job is empty !");
        }
    }

    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios');
        const currentDate = selectedDate || date;
        setDate(currentDate);
        updateState("date", formatDate(currentDate));

    }

    const toggleSwitch = () => updateState("complete", !todo.complete);

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
                {/* Name job */}

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: SIZES.padding
                    }}
                >
                    <Text style={{ ...FONTS.h3 }}>To do :</Text>
                    <TextInput
                        defaultValue={todo?.job}
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
                        onChangeText={(job) => updateState("job", job)}
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
                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>{todo?.date}</Text>

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

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={show}
                    onRequestClose={() => setShow(false)}
                >
                    <Pressable
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: SIZES.padding
                        }}
                        onPress={() => setShow(false)}
                    >
                        {
                            show && <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode='date'
                                display="spinner"
                                is24Hour={true}
                                onChange={onChange}
                                themeVariant="light"
                                style={{ width: '100%', backgroundColor: COLORS.white, height: 500 }}
                            />
                        }
                    </Pressable>
                </Modal>

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
                        onValueChange={toggleSwitch}
                        value={todo?.complete}
                        disabled={route.params.initialDate < now ? true : false}
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

                        onPress={() => updateTodo()}
                    >
                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <Pressable
            style={{ flex: 1, backgroundColor: COLORS.white }}
            onPress={() => Keyboard.dismiss()}
        >
            {renderHeader()}
            {renderContent()}
        </Pressable>
    )
}

export default Detail;
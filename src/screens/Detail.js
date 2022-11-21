import React from "react";
import { View, Text, Alert, TextInput, TouchableOpacity, Switch, Modal, Pressable, Keyboard } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants";
import { AntDesign, Fontisto } from '@expo/vector-icons';
import DatePicker from "../components/DatePicker";
/* redux */
import { useSelector } from "react-redux";
import actions from "../redux/actions";
import { formatDate } from "../helpers";

const today = new Date();

const Detail = ({ navigation, route }) => {

    const state = useSelector((state) => state.todo.state);

    const [todo, setTodo] = React.useState(null);
    const [show, setShow] = React.useState(false);
    const [date, setDate] = React.useState(new Date());

    React.useEffect(() => {
        setTodo(route.params.item);
        setDate(route.params.item.date);
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
            if (state.single) {
                actions.checkChangeDate(state.date);
            }
            else {
                actions.getListFilter(state.date.start, state.date.end);
            }
        }
        else {
            Alert.alert("Job is empty !");
        }
    }

    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios');
        const currentDate = selectedDate || date;
        setDate(currentDate);
        updateState("date", currentDate);

    }

    const toggleSwitch = () => updateState("complete", !todo.complete);

    const checkEnable = () => {
        console.log("Today : ", formatDate(today));
        console.log("To do day: ", formatDate(todo?.date));
        if (todo?.date.getFullYear() <= today.getFullYear() && todo?.date.getMonth() <= today.getMonth()
            && todo?.date.getDate() < today.getDate()
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
                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>{formatDate(todo?.date)}</Text>

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
                        onValueChange={toggleSwitch}
                        value={todo?.complete}
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
            <DatePicker show={show} setShow={setShow} setChooseDate={(date) => updateState("date", date)} check={false} />
            {renderHeader()}
            {renderContent()}
        </Pressable>
    )
}

export default Detail;
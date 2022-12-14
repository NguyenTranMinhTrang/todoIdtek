import React from "react";
import { Modal, Pressable, TouchableOpacity, View, Text, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { SIZES, COLORS, FONTS } from "../constants";
import { BlurView } from 'expo-blur';
import actions from "../redux/actions";
import { formatDate } from "../helpers";


const DatePicker = ({ show, setShow, setChooseDate, check }) => {

    const [date, setDate] = React.useState(new Date());

    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios');
        const currentDate = selectedDate || date;
        if (Platform.OS === "ios") {
            setDate(currentDate);
        }
        else {
            setShow(false);
            setChooseDate(currentDate);
            if (check) {
                actions.checkChangeDate(currentDate);
            }
        }

    }

    return (

        <Modal
            animationType="slide"
            transparent
            visible={show}
            onRequestClose={() => setShow(false)}
        >
            {
                Platform.OS === "ios" ?
                    <BlurView
                        style={{ flex: 1 }}
                        intensity={80}
                        tint="dark"
                    >
                        <Pressable
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingHorizontal: SIZES.padding,

                            }}
                            onPress={() => setShow(false)}
                        >
                            {
                                show &&
                                <>

                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode='date'
                                        display="spinner"
                                        is24Hour={true}
                                        onChange={onChange}
                                        themeVariant="light"
                                        style={{ width: '100%', backgroundColor: COLORS.white, height: 300, borderRadius: SIZES.radius }}
                                    />

                                    <View
                                        style={{
                                            alignItems: "flex-end",
                                            width: "100%"
                                        }}
                                    >
                                        <TouchableOpacity
                                            style={{
                                                height: 60,
                                                width: 150,
                                                backgroundColor: COLORS.white,
                                                marginTop: SIZES.padding,
                                                borderRadius: SIZES.radius,
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}

                                            onPress={() => {
                                                setShow(false);
                                                setChooseDate(date);
                                                if (check) {
                                                    actions.checkChangeDate(date);
                                                }
                                            }}
                                        >
                                            <Text style={{ ...FONTS.h3 }}>Ok</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            }
                        </Pressable>
                    </BlurView>
                    :
                    <>
                        {
                            show &&
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode='date'
                                display='default'
                                is24Hour={true}
                                onChange={onChange}
                                themeVariant="light"
                            />
                        }
                    </>
            }

        </Modal>



    )
}


export default DatePicker;
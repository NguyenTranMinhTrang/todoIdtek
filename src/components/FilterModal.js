import React from "react";
import { View, Modal, Pressable, Text, TouchableOpacity, Alert } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants";
import { BlurView } from 'expo-blur';
import { AntDesign, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { formatDate } from "../helpers";
import DatePicker from "./DatePicker";
import actions from "../redux/actions";


const FilterModal = ({ setModalFilter, modalFilter }) => {

    const [start, setStart] = React.useState(new Date());
    const [end, setEnd] = React.useState(new Date());
    const [show, setShow] = React.useState(false);
    const [startOrEnd, setStartOrEnd] = React.useState(false);

    return (
        <Modal
            animationType="slide"
            transparent
            visible={modalFilter}
            onRequestClose={() => setModalFilter(false)}
        >
            <DatePicker check={false} show={show} setShow={setShow} setChooseDate={startOrEnd ? setStart : setEnd} />
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
                    onPress={() => setModalFilter(false)}
                >
                    {
                        modalFilter &&
                        <View
                            style={{
                                width: "100%",
                                backgroundColor: "white",
                                padding: SIZES.padding,
                                borderRadius: SIZES.radius
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: SIZES.padding
                                }}
                            >
                                <Text style={{ ...FONTS.h3 }}>Từ ngày: </Text>
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
                                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>{formatDate(start)}</Text>

                                    <TouchableOpacity
                                        style={{
                                            height: 32,
                                            width: 32,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginLeft: SIZES.base,
                                        }}

                                        onPress={() => {
                                            setShow(true);
                                            setStartOrEnd(true);
                                        }}
                                    >
                                        <Fontisto name="date" size={25} color={COLORS.white} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >
                                <Text style={{ ...FONTS.h3 }}>Đến ngày: </Text>
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
                                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>{formatDate(end)}</Text>

                                    <TouchableOpacity
                                        style={{
                                            height: 32,
                                            width: 32,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginLeft: SIZES.base,
                                        }}

                                        onPress={() => {
                                            setShow(true);
                                            setStartOrEnd(false);
                                        }}
                                    >
                                        <Fontisto name="date" size={25} color={COLORS.white} />
                                    </TouchableOpacity>
                                </View>
                            </View>

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
                                        backgroundColor: COLORS.orange,
                                        marginTop: SIZES.padding,
                                        borderRadius: SIZES.radius,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}

                                    onPress={() => {
                                        if (start > end) {
                                            Alert.alert("Ngày bắt đầu phải lớn hơn ngày kết thúc !");
                                        }
                                        else {
                                            setModalFilter(false);
                                            actions.getListFilter(start, end);
                                        }
                                    }}
                                >
                                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>Lọc</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </Pressable>
            </BlurView>
        </Modal>
    )
}

export default FilterModal;
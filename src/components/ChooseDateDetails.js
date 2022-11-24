import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants";
import { Fontisto } from '@expo/vector-icons';
import { formatDate } from "../helpers";


const ChooseDateDetails = ({ setShow, date }) => {
    return (
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
    )
}

export default ChooseDateDetails;
import React from "react";
import { View, Text, TextInput } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants";


const InputField = ({ field, title, style }) => {


    return (
        <View
            style={style}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Text style={{ ...FONTS.h3 }}>{title}</Text>
                <TextInput
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
                    value={`${field.value}`}
                    onChangeText={(text) => field.onChange(field.name)(text)}
                    onBlur={field.onBlur(field.name)}
                />
            </View>
        </View>
    )
}

export default InputField;
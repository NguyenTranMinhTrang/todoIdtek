import React from "react";
import { LogBox, View, Text, Alert, TextInput, TouchableOpacity, Switch, ActivityIndicator, Pressable, Keyboard } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants";

const InputDetail = ({ field, meta, index, remove, insert }) => {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <Text style={{ ...FONTS.h3 }}>{index + 1}.</Text>
            <TextInput
                style={{
                    borderColor: COLORS.white,
                    marginLeft: SIZES.base,
                    flex: 0.9,
                    borderWidth: 1,
                    borderRadius: SIZES.radius,
                    padding: SIZES.base * 2,
                    backgroundColor: COLORS.blue,
                    color: COLORS.white,
                    ...FONTS.h3
                }}
                value={field.value}
                onChangeText={(text) => field.onChange(field.name)(text)}
                onBlur={field.onBlur(field.name)}
            />

            <TouchableOpacity
                style={{
                    borderRadius: SIZES.radius,
                    padding: SIZES.base * 2,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: COLORS.blue,
                    marginHorizontal: SIZES.base,
                    width: 55
                }}
                onPress={() => insert(index + 1, '')}
            >
                <Text style={{ ...FONTS.h3, color: COLORS.white }}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    borderRadius: SIZES.radius,
                    padding: SIZES.base * 2,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: COLORS.red,
                    width: 55
                }}
                onPress={() => remove(index)}
            >
                <Text style={{ ...FONTS.h3, color: COLORS.white }}>-</Text>
            </TouchableOpacity>


        </View>
    )
}

export default InputDetail;
import React from "react";
import { LogBox, View, Text, Alert, TextInput, TouchableOpacity, Switch, ActivityIndicator, Pressable, Keyboard } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants";


const InputField = ({ field, meta, title }) => {

    console.log('render item con');
    return (
        <View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: SIZES.base
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
                    value={field.value}
                    onChangeText={(text) => field.onChange(field.name)(text)}
                    onBlur={field.onBlur(field.name)}
                />
            </View>
            {(meta.error && meta.touched) &&
                <Text style={{ ...FONTS.h3_light, color: "red" }}>{meta.error}</Text>
            }
        </View>
    )
}

export default InputField;
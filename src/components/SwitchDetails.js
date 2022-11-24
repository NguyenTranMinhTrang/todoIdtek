import React from "react";
import { View, Text, Switch } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants";

const SwitchDetails = ({ complete, setFieldValue, date }) => {

    const today = new Date();

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

    return (
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
                onValueChange={() => setFieldValue('complete', !complete)}
                value={complete}
                disabled={checkEnable()}
            />
        </View>
    )
}

export default SwitchDetails;

import React from "react";
import { View, Text } from "react-native";
import { SIZES, COLORS, FONTS, dummys } from "../constants";
import { SelectList } from "react-native-dropdown-select-list";

const ComboboxColor = ({ priority, setFieldValue }) => {

    const colors = dummys.colors;

    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: SIZES.padding
            }}
        >
            <Text style={{ ...FONTS.h3 }}>Color :</Text>
            <SelectList
                data={colors}
                boxStyles={{
                    marginLeft: SIZES.base,
                    backgroundColor: COLORS[priority],
                    width: 200
                }}
                search={false}
                placeholder={priority}
                dropdownTextStyles={{
                    ...FONTS.h3_light,
                    color: COLORS.black
                }}
                inputStyles={{
                    ...FONTS.h3,
                    color: COLORS.white
                }}
                save="value"
                setSelected={(val) => setFieldValue("priority", val)}
            />
        </View>
    )
}

export default ComboboxColor;
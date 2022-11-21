import React, { memo } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { Animated, TouchableOpacity, Text } from "react-native";
import { FONTS, SIZES, COLORS } from "../constants";
import { Ionicons } from '@expo/vector-icons';



const Animation = ({ item, deleteTodo, onSelectItem }) => {

    const rightAction = (dragX, item) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0.9],
            extrapolate: "clamp"
        });

        const opacity = dragX.interpolate({
            inputRange: [-100, -20, 0],
            outputRange: [1, 0.9, 0],
            extrapolate: "clamp"
        })
        return (
            <TouchableOpacity
                onPress={() => deleteTodo(item.id)}
            >
                <Animated.View
                    style={[{
                        backgroundColor: COLORS.red,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 80,
                        height: 63,
                        borderRadius: SIZES.radius
                    }, { opacity: opacity }]}
                >
                    <Animated.Text style={{ ...FONTS.h3, color: COLORS.white, transform: [{ scale }] }}>
                        Delete
                    </Animated.Text>
                </Animated.View>
            </TouchableOpacity>
        )
    }

    return (
        <Swipeable renderRightActions={(_, dragX) => rightAction(dragX, item)}>
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    backgroundColor: COLORS[item.priority],
                    marginBottom: SIZES.base * 2,
                    padding: SIZES.base * 2,
                    borderRadius: SIZES.radius,
                    alignItems: 'center'
                }}

                onPress={() => { onSelectItem(item) }}
            >
                <Text style={{ ...FONTS.body3, flex: 1, color: COLORS.white }}>{item.job}</Text>

                <Ionicons name="checkmark-done" size={30} color={item.complete ? COLORS.complete : COLORS.white} />
            </TouchableOpacity>
        </Swipeable>
    )
}

export default memo(Animation);



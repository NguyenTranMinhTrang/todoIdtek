import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants";
import { FastField, FieldArray, useFormikContext } from "formik";
import InputDetail from "./InputDetail";
import InputField from "./InputField";

const TodoDetails = () => {

    const { errors, setErrors, values, touched } = useFormikContext();
    const arrayHelpersRef = React.useRef(null);

    return (
        <View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <FastField
                    name="delete"
                >
                    {(props) => (
                        <InputField
                            style={{
                                flex: 1,
                            }}
                            title="Remove :"
                            {...props}
                        />
                    )}
                </FastField>

                <TouchableOpacity
                    style={{
                        borderRadius: SIZES.radius,
                        padding: SIZES.base * 2,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: COLORS.red,
                        width: 55,
                        marginLeft: SIZES.base
                    }}

                    onPress={() => {
                        if (values.delete > values.todoDetails.length) {
                            setErrors({
                                ...errors,
                                delete: "Number is invalid!"
                            });
                        }
                        else {
                            arrayHelpersRef.current.remove(values.delete - 1);
                        }
                    }}
                >
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>-</Text>
                </TouchableOpacity>
            </View>

            {(errors.delete && touched.delete) &&
                <Text style={{ ...FONTS.h3_light, color: "red", marginTop: SIZES.base }}>{errors.delete}</Text>
            }

            <FieldArray
                name="todoDetails"
                render={({ push, remove, insert }) => {

                    arrayHelpersRef.current = { remove };
                    return (
                        <View
                            style={{
                                marginVertical: SIZES.padding
                            }}
                        >
                            {
                                values.todoDetails && values.todoDetails.length > 0 ? (
                                    <ScrollView
                                        style={{
                                            height: SIZES.height * 0.2
                                        }}
                                    >
                                        {
                                            values.todoDetails.map((details, index) => {
                                                return (
                                                    <FastField
                                                        name={`todoDetails.${index}`}
                                                    >
                                                        {(props) => (
                                                            <InputDetail
                                                                key={index}
                                                                index={index}
                                                                insert={insert}
                                                                remove={remove}
                                                                {...props}
                                                            />
                                                        )}
                                                    </FastField>
                                                )
                                            })
                                        }
                                    </ScrollView>
                                ) :
                                    (
                                        <TouchableOpacity
                                            style={{
                                                justifyContent: "center",
                                                alignItems: "center",
                                                backgroundColor: COLORS.blue,
                                                borderRadius: SIZES.radius,
                                                padding: SIZES.base * 2,
                                            }}

                                            onPress={() => push('')}
                                        >
                                            <Text style={{ ...FONTS.h3, color: COLORS.white }}>Add todo details</Text>
                                        </TouchableOpacity>
                                    )

                            }
                        </View>
                    )

                }
                }
            />
        </View>
    )
}

export default TodoDetails;

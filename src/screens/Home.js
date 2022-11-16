import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList,
    Modal,
    Animated,
    Image,
    Pressable,
    Keyboard
} from "react-native";
import { FONTS, images, SIZES, COLORS, dummys } from "../constants";
import { Fontisto, Ionicons } from '@expo/vector-icons';
import { Swipeable } from "react-native-gesture-handler";
import DateTimePicker from '@react-native-community/datetimepicker';
/* redux */
import actions from "../redux/actions";
import { useSelector } from "react-redux";


const Home = ({ navigation }) => {

    const TodoList = useSelector((state) => state.todo.todoList);

    const [newTodo, setNewTodo] = React.useState('');
    const [color, setColor] = React.useState(COLORS.blue);
    const [show, setShow] = React.useState(false);
    const [date, setDate] = React.useState(new Date());

    const colors = [COLORS.bubble, COLORS.blue, COLORS.green, COLORS.orange, COLORS.pink];

    console.log(TodoList);

    const formatDate = (date) => {
        let tempDate = new Date(date);
        return tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();
    }

    const addNewTodo = () => {
        Keyboard.dismiss();
        if (newTodo !== "") {
            actions.addTodo({
                job: newTodo,
                date: formatDate(new Date())
            });
            setNewTodo("");
        }
    }

    const deleteTodo = (id) => {
        actions.deleteTodo(id);
    }

    const onSelectItem = (item) => {
        navigation.navigate("Detail", {
            item
        });
    }

    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios');
        const currentDate = selectedDate || date;
        setDate(currentDate);
    }

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
                onPress={() => {
                    deleteTodo(item.id);
                }}
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

    function renderItem({ item }) {
        if (item.date == formatDate(date)) {
            return (
                <Swipeable renderRightActions={(_, dragX) => rightAction(dragX, item)}>
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            backgroundColor: color,
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
        else {
            return null;
        }

    }



    const renderHeader = () => {
        return (
            <View
                style={{
                    height: SIZES.height * 0.3,
                    paddingHorizontal: SIZES.padding
                }}
            >
                <Image
                    source={images.home}
                    resizeMode="cover"
                    style={{
                        height: '100%',
                        width: '100%'
                    }}
                />

            </View>
        )
    }


    const renderContent = () => {
        return (
            <View
                style={{
                    padding: SIZES.padding,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}

                >
                    <Text style={{ ...FONTS.h2 }}>List Task</Text>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                    >
                        <Text style={{ ...FONTS.h3_light }}>{formatDate(date)}</Text>
                        <TouchableOpacity
                            style={{
                                height: 50,
                                width: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: SIZES.radius,
                                borderWidth: 1,
                                marginLeft: SIZES.base
                            }}

                            onPress={() => setShow(true)}
                        >
                            <Fontisto name="date" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: SIZES.padding
                    }}
                >
                    <TextInput
                        placeholder="Your new task"
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            marginRight: SIZES.base,
                            padding: SIZES.base * 2,
                            fontSize: 16,
                            borderRadius: 60,
                            backgroundColor: COLORS.white,
                            borderColor: '#C0C0C0'
                        }}

                        value={newTodo}
                        onChangeText={(todo) => setNewTodo(todo)}
                    />
                    <TouchableOpacity
                        style={{
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.blue,
                            height: 60,
                            width: 60,
                            borderRadius: 60,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}

                        onPress={() => addNewTodo()}
                    >
                        <Ionicons name="add-sharp" size={50} color={COLORS.white} />
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    {
                        colors.map((value, index) => {
                            return (
                                <TouchableOpacity
                                    key={`${index} - ${value}`}
                                    style={{
                                        height: value === color ? 60 : 50,
                                        width: value === color ? 60 : 50,
                                        backgroundColor: value,
                                        borderRadius: SIZES.radius
                                    }}
                                    onPress={() => setColor(value)}
                                >

                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

                <FlatList
                    data={TodoList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingTop: SIZES.padding }}
                />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={show}
                    onRequestClose={() => setShow(false)}
                >
                    <Pressable
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: SIZES.padding
                        }}
                        onPress={() => setShow(false)}
                    >
                        {
                            show && <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode='date'
                                display="spinner"
                                is24Hour={true}
                                onChange={onChange}
                                themeVariant="light"
                                style={{ width: '100%', backgroundColor: COLORS.white, height: 500 }}
                            />
                        }
                    </Pressable>
                </Modal>
            </View>
        )
    }


    return (
        <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
            {renderHeader()}
            {renderContent()}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
});

export default Home;
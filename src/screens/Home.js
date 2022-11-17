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
    Keyboard,
    StatusBar
} from "react-native";
import { FONTS, images, SIZES, COLORS, dummys } from "../constants";
import { Fontisto, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Animation from "../components/Animation";
import DatePicker from "../components/DatePicker";
/* redux */
import actions from "../redux/actions";
import { useSelector } from "react-redux";
import { formatDate } from "../helpers";


const Home = ({ navigation }) => {

    const TodoList = useSelector((state) => state.todo.todoList);
    const Filter = useSelector((state) => state.todo.filter);

    const [newTodo, setNewTodo] = React.useState('');
    const [color, setColor] = React.useState("pink");
    const [show, setShow] = React.useState(false);
    const [chooseDate, setChooseDate] = React.useState(new Date());

    const colors = ["pink", "orange", "bubble", "blue", "green"];


    React.useEffect(() => {
        actions.checkChangeDate(formatDate(chooseDate));
    }, []);

    const addNewTodo = () => {
        Keyboard.dismiss();
        if (newTodo !== "") {
            actions.addTodo({
                job: newTodo,
                date: formatDate(chooseDate),
                priority: color
            });
            actions.checkChangeDate(formatDate(chooseDate));
            setNewTodo("");
        }
    }

    const deleteTodo = (id) => {
        actions.deleteTodo(id);
        actions.checkChangeDate(formatDate(chooseDate));
    }

    const onSelectItem = (item) => {
        navigation.navigate("Detail", {
            item,
            initialDate: chooseDate
        });
    }




    function renderItem({ item }) {
        if (item.date == formatDate(chooseDate)) {
            return (
                <Animation key={`${item.id}`} item={item} onSelectItem={onSelectItem} deleteTodo={deleteTodo} />
            )
        }
        else {
            return <></>
        }
    }



    const renderHeader = () => {
        return (
            <View
                style={{
                    flex: 0.4,
                    paddingHorizontal: SIZES.padding
                }}
            >
                <Image
                    source={images.home}
                    resizeMode="cover"
                    style={{
                        height: '100%',
                        width: '100%',
                        opacity: 0.5
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
                    flex: 0.6,
                    marginTop: -SIZES.height * 0.35
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
                        <Text style={{ ...FONTS.h3 }}>{formatDate(chooseDate)}</Text>
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
                            borderColor: COLORS.black
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
                                        backgroundColor: COLORS[value],
                                        borderRadius: SIZES.radius,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                    onPress={() => setColor(value)}
                                >
                                    <MaterialIcons name="priority-high" size={35 - (index * 4)} color={COLORS.white} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

                <FlatList
                    data={Filter}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingTop: SIZES.padding }}
                    initialNumToRender={10}
                    windowSize={2}
                />

            </View>
        )
    }

    return (
        <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
            <StatusBar
                barStyle="dark-content"
            />
            {renderHeader()}
            {renderContent()}
            <DatePicker show={show} setShow={setShow} setChooseDate={setChooseDate} />
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
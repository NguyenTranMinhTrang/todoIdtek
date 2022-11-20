import types from "../types";
import dummys from "../../constants/dummys";
import { formatDate } from "../../helpers";

const initialState = {
    todoList: dummys.TODO,
    filter: [],
    state: { single: true, date: "" }
}

export default function (state = initialState, action) {
    const newTodoList = [...state.todoList];

    switch (action.type) {
        case types.ADD_TODO:
            const newTodo = action.payload;
            console.log("list : ", newTodoList);

            newTodoList.push({
                id: Date.now(),
                job: newTodo.job,
                date: newTodo.date,
                complete: false,
                priority: newTodo.priority
            });
            return {
                todoList: [...newTodoList],
                filter: [...state.filter]
            }

        case types.UPDATE_TODO:
            const newUpdateTodo = action.payload;
            const index = newTodoList.findIndex((todo => todo.id == newUpdateTodo.id));
            newTodoList[index].job = newUpdateTodo.job;
            newTodoList[index].date = newUpdateTodo.date;
            newTodoList[index].complete = newUpdateTodo.complete;
            return {
                todoList: [...newTodoList],
                filter: [...state.filter]
            }

        case types.REMOVE_TODO:
            const id = action.payload;
            const indexDelete = newTodoList.findIndex((todo => todo.id == id));
            if (indexDelete > -1) {
                newTodoList.splice(indexDelete, 1);
            }
            return {
                todoList: [...newTodoList],
                filter: [...state.filter]
            }

        case types.CHECK_CHANGE:
            const date = action.payload;
            const newFilter = state.todoList.filter((todo) => {
                if (todo.date.getDate() == date.getDate() && todo.date.getMonth() == date.getMonth() && todo.date.getFullYear() == date.getFullYear()) {
                    return true;
                }
                else {
                    return false;
                }
            });

            return {
                filter: [...newFilter],
                todoList: [...state.todoList],
                state: { single: true, date: formatDate(date) }
            }

        case types.FILTER_LIST:
            const { start, end } = action.payload;
            const filterList = state.todoList.filter((todo) => {
                const date = todo.date.getDate();
                const month = todo.date.getMonth();
                const year = todo.date.getFullYear();
                if (year >= start.getFullYear() && year <= end.getFullYear()
                    && month >= start.getMonth() && month <= end.getMonth()
                    && date >= start.getDate() && date <= end.getDate()
                ) {
                    return true;
                }
                else {
                    return false;
                }
            });

            return {
                filter: [...filterList],
                todoList: [...state.todoList],
                state: { single: false, date: `${formatDate(start)} - ${formatDate(end)}` }
            }

        default:
            return state;
    }
}
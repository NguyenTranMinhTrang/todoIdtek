import types from "../types";
import dummys from "../../constants/dummys";

const initialState = {
    todoList: dummys.TODO,
    filter: [],
    state: { single: true, date: "" },
    loading: false
}

export default function (state = initialState, action) {
    const newTodoList = [...state.todoList];

    switch (action.type) {
        case types.ADD_TODO:
            const newTodo = action.payload;

            newTodoList.push({
                id: Date.now(),
                job: newTodo.job,
                date: newTodo.date,
                complete: false,
                priority: newTodo.priority
            });
            return {
                ...state,
                todoList: [...newTodoList],
                filter: [...state.filter]
            }

        /* case types.UPDATE_TODO:
            const newUpdateTodo = action.payload;
            const index = newTodoList.findIndex((todo => todo.id == newUpdateTodo.id));
            newTodoList[index].job = newUpdateTodo.job;
            newTodoList[index].date = newUpdateTodo.date;
            newTodoList[index].complete = newUpdateTodo.complete;
            return {
                todoList: [...newTodoList],
                filter: [...state.filter]
            } */

        case types.UPDATE_TODO_BEGIN:
            console.log("update begin");
            return {
                ...state,
                loading: true
            }

        case types.UPDATE_TODO_SUCCESS:
            console.log("update success");
            console.log("Reducer : ", state.loading);
            return {
                ...state,
                loading: false,
                todoList: action.payload
            }

        case types.REMOVE_TODO:
            const id = action.payload;
            const indexDelete = newTodoList.findIndex((todo => todo.id == id));
            if (indexDelete > -1) {
                newTodoList.splice(indexDelete, 1);
            }
            return {
                ...state,
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
                ...state,
                filter: [...newFilter],
                todoList: [...state.todoList],
                state: { single: true, date: date }
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
                ...state,
                filter: [...filterList],
                todoList: [...state.todoList],
                state: { single: false, date: { start, end } }
            }

        default:
            return state;
    }
}
import types from "../types";
import dummys from "../../constants/dummys";

const initialState = {
    todoList: dummys.TODO,
    filter: []
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
            const newFilter = state.todoList.filter(todo => todo.date == date);

            return {
                filter: [...newFilter],
                todoList: [...state.todoList]
            }

        default:
            return state;
    }
}
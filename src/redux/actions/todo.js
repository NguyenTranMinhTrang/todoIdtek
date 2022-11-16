import store from "../store";
import types from "../types";

const { dispatch } = store;

export const addTodo = (todo) => {
    dispatch({
        type: types.ADD_TODO,
        payload: todo
    })
}

export const updateTodo = (todo) => {
    dispatch({
        type: types.UPDATE_TODO,
        payload: todo
    })
}

export const deleteTodo = (id) => {
    dispatch({
        type: types.REMOVE_TODO,
        payload: id
    })
}
import store from "../store";
import types from "../types";

const { dispatch, getState } = store;

export const addTodo = (todo) => {
    dispatch({
        type: types.ADD_TODO,
        payload: todo
    })
}

export const updateTodoBegin = () => ({
    type: types.UPDATE_TODO_BEGIN
});


export const updateTodoSucess = (updateListTodo) => ({
    type: types.UPDATE_TODO_SUCCESS,
    payload: updateListTodo
});

export const updateTodoFailure = (error) => ({
    type: types.UPDATE_TODO_FAILURE,
    payload: error
})

export const updateTodo = (newUpdateTodo) => {
    dispatch(updateTodoBegin());
    const todoList = [...getState().todo.todoList];
    const index = todoList.findIndex((todo => todo.id == newUpdateTodo.id));
    todoList[index].job = newUpdateTodo.job;
    todoList[index].date = newUpdateTodo.date;
    todoList[index].complete = newUpdateTodo.complete;
    dispatch(updateTodoSucess([...todoList]));


}

export const deleteTodo = (id) => {
    dispatch({
        type: types.REMOVE_TODO,
        payload: id
    })
}

export const checkChangeDate = (date) => {
    dispatch({
        type: types.CHECK_CHANGE,
        payload: date
    })
}

export const getListFilter = (start, end) => {
    dispatch({
        type: types.FILTER_LIST,
        payload: { start, end }
    })
}
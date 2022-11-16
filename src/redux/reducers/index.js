import { combineReducers } from "redux";
import todo from "./todo";

import types from "../types";

const appReducer = combineReducers({
    todo
});

const rootReducer = (state, action) => {
    if (action.type == types.CLEAR_REDUX_STATE) {
        state.todoList = undefined;
    }

    return appReducer(state, action);
}


export default rootReducer;

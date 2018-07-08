import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
    openModal: modalReducer,
    auth: authReducer,
    errors: errorReducer
});

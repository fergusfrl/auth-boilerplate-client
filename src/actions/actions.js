import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { OPEN_MODAL, CLOSE_MODAL, GET_ERRORS, SET_CURRENT_USER } from "./types";

const serverLocation = "http://localhost:3031";

// Toggle Modals
export const toggleModal = modal => dispatch => {
    if (modal) {
        dispatch({
            type: OPEN_MODAL,
            payload: modal
        });
    } else {
        dispatch({
            type: CLOSE_MODAL
        });
    }
};

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post(serverLocation + "/users/register", userData)
        .then(res => {
            dispatch({
                type: CLOSE_MODAL,
                payload: "registerModal"
            });
            dispatch({
                type: OPEN_MODAL,
                payload: "welcomeModal"
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            });
            dispatch({
                type: OPEN_MODAL,
                payload: "registerModal"
            });
        });
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
    axios
        .post(serverLocation + "/users/login", userData)
        .then(res => {
            // Save to localStorage
            const { token } = res.data;
            // Set token to ls
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
            dispatch({
                type: CLOSE_MODAL,
                payload: "loginModal"
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            });
            dispatch({
                type: OPEN_MODAL,
                payload: "loginModal"
            });
        });
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// Change user password
export const changePassword = userData => dispatch => {
    axios
        .put(serverLocation + "/users/login", userData)
        .then(res => {
            dispatch({
                type: CLOSE_MODAL,
                payload: "changePasswordModal"
            });
            alert("Password successfully changed");
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            });
            dispatch({
                type: OPEN_MODAL,
                payload: "changePasswordModal"
            });
        });
};

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localstorage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} & isAuthenticated false
    dispatch(setCurrentUser({}));
};

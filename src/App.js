import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/actions";
import { Provider } from "react-redux";
import store from "./store";

import NavBar from "./components/layout/NavBar";

// Check for token
if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // TODO: Clear current profile state
        // Redirect to login
        window.location.href = "/";
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <NavBar />
                </div>
            </Provider>
        );
    }
}

export default App;

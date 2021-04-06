import React, { Component } from 'react';
import Register from './Register';
import Login from './Login';
import Style from './Style';
import store from '../../store';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from '../../actions/userAuthActions'
import setAuthToken from '../../util/setAuthToken'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

if (localStorage.jwtToken) {
    try {
        const token = localStorage.jwtToken;
        const decoded = jwt_decode(token);
        setAuthToken(token);
        store.dispatch(setCurrentUser(decoded));
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          store.dispatch(logoutUser()); //  window.location.href = './login';
        }
        else 
            console.log("Logged in as ", decoded)
    } catch (err) {
        console.log("Ran into an error grabbing JWT token from local storage", err)
        store.dispatch(logoutUser());
    }
}

class App extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <Provider store={store} >
                <Router>
                    <div>
                        <nav>
                            <ul>
                                {/*  <li>
                        <Link to="/">Home</Link>
                        </li>
                        <li>
                        <Link to="/about">About</Link>
                        </li>
                        <li>
                        <Link to="/users">Users</Link>
                      </li>*/}
                            </ul>
                        </nav>

                        {/* A <Switch> looks through its children <Route>s and
                        renders the first one that matches the current URL. */}
                        <Switch>
                            <Route path="/style" >
                                <Style />
                            </Route>
                            <Route path="/register" >
                                <Register />
                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/">
                                <Register /> { /* Landing Page, for now i put register */}
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from '../../actions/userAuthActions'
import setAuthToken from '../../util/setAuthToken'

import store from '../../store';
import Register from './Register';
import Login from './Login';

import PrivateRoute from './PrivateRoute';
import Dashboard from './Dashboard';

import Landing from './Landing';

import "bootstrap/dist/css/bootstrap.min.css"

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
                        {/* A <Switch> looks through its children <Route>s and
                        renders the first one that matches the current URL. */}
                        <Switch>
                            <Route path="/register" component={Register}/>
                            <Route path="/login" component={Login}/>
                            <PrivateRoute path="/dashboard" component={Dashboard}/>
                            <Route path="/" component={Register}/> { /* Landing Page */}
                        </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
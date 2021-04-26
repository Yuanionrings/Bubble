import axios from 'axios';
import setAuthToken from '../util/setAuthToken';
import jwt_decode from 'jwt-decode';

import { SET_AUTH_ERRORS , SET_CURRENT_USER } from './types';

/**
 * Register User then Redirect to Login or Send Errors to Component
 * @param {Object} userData 
 * @param {React Router History} history 
 */
export const registerUser = (userData, history) => (dispatch) => {    
  axios.post("http://localhost:4000/auth/register", userData)
    .then(res => {
        console.log(`userAuthActions:registerUser: received`, res);
        history.push({
            pathname: '/login',
        });
    })
    .catch(err => {
        dispatch({
            type: SET_AUTH_ERRORS,
            payload: err.response.data
        })
    })
}

/**
 * Login User and set JWT token or Send Errors to Component
 * @param {Object} userData 
 */
export const loginUser = (userData, history) => (dispatch) => {
  axios.post("http://localhost:4000/auth/login", userData)
    .then(res => {
      const { token } = res.data;
      // Set token to localStorage
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      const decoded = jwt_decode(token);
      // Set current user
      console.log("RECEIVED JWT TOKEN: ", decoded);
      dispatch(setCurrentUser(decoded));
      console.log("Login success, auth token set in local storage")
      history.push("/dashboard")
    })
    .catch(err => {
        console.log(`Client received an error at userAuthActions:loginUser`, err.response);
        dispatch({
            type: SET_AUTH_ERRORS,
            payload: err.response.data
        })
    })
}

// Set logged in user
export const setCurrentUser = (decoded_data) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded_data
  };
};

// Logout user
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
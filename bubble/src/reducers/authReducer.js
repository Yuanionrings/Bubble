import { SET_CURRENT_USER } from '../actions/types';
const isEmpty = require('is-empty');

// In index.js this reducer is combined with the other(s). This one specifically is used
// for the 'auth' property of the store's state
// so we have store -> state = { auth: { isAuthenticated: true/false, user: { user obj } , } }

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload), // If action.payload isEmpty, isAuthenticated is false
        user: action.payload
      };
    default:
      return state;
  }
}
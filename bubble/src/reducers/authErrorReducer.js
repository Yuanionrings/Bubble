import { SET_AUTH_ERRORS } from '../actions/types';

// In index.js this reducer is combined with the other(s). This one specifically is used
// for the 'errors' property of the store's state
// so we have store -> state = { errors: { error obj } }

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
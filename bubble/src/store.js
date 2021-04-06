import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import errorReducer from './reducers/authErrorReducer';

const initialState = {};
const middleware = [thunk];

// Note: this is imported as 'rootReducer' in store.js
const rootReducer = combineReducers({ 
  auth: authReducer,
  errors: errorReducer
});

// DEV
const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware))
);

export default store;
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// 'auth' property is taken from redux store, doesn't need to be included when creating a PrivateRoute in JSX context
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
     {...rest} // ...rest is the other props (besides 'component' and 'auth') passed to PrivateRoute such as 'exact path' in <PrivateRoute exact path="...">
    render={props => auth.isAuthenticated ? (<Component {...props} />) : (<Redirect to='/login' />) }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

// Map state.auth from the redux store to a property of this component called 'auth'
const mapStateToProps = storeState => ({
  auth: storeState.auth // When the 'auth' property of the store's state changes, the 'auth' property of this component will change
});

export default connect(mapStateToProps)(PrivateRoute);
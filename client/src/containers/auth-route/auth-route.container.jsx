import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsAuthenticated } from 'redux/selectors/auth.selector';

import { Route, Redirect } from 'react-router-dom';

/* -------------------------------------------------------------------------- */

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
});

const AuthRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route {...rest} render={props => (isAuthenticated === true ? <Redirect to="/" /> : <Component {...props} />)} />
);

/* -------------------------------------------------------------------------- */

AuthRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(AuthRoute);

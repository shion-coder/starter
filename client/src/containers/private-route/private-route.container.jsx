import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsAuthenticated } from 'redux/selectors/auth.selector';

import { Route, Redirect } from 'react-router-dom';

import useToken from 'utils/hooks/use-token';

/* -------------------------------------------------------------------------- */

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
});

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  // Validate access token
  useToken();

  return (
    <Route
      {...rest}
      render={props => (isAuthenticated === true ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
};

/* -------------------------------------------------------------------------- */

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(PrivateRoute);

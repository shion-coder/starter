import React from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsAuthenticated } from 'redux/selectors/auth.selector';
import { logout } from 'redux/slices/auth.slice';

import { useHistory } from 'react-router-dom';

import HomeIcon from './home-icon/home-icon.component';
import AuthLinks from './auth-links/auth-links.component';
import GuestLinks from './guest-links/guest-links.component';

import { Container } from './header.styles';

/* -------------------------------------------------------------------------- */

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
});

const Header = ({ isAuthenticated, logout }) => {
  const history = useHistory();

  const goHome = () => history.push('/');

  return (
    <Container>
      <HomeIcon color="primary" fontSize="large" onClick={goHome} />

      {!isAuthenticated ? <GuestLinks history={history} /> : <AuthLinks history={history} logout={logout} />}
    </Container>
  );
};

/* -------------------------------------------------------------------------- */

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { logout })(Header);

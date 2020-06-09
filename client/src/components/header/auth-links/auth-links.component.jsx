import React from 'react';
import PropTypes from 'prop-types';

import { Box, Typography, Button } from '@material-ui/core';

/* -------------------------------------------------------------------------- */

const AuthLinks = ({ history, logout }) => {
  const goDashboard = () => history.push('/dashboard');
  const handleLogout = () => logout();

  return (
    <Box>
      <Typography
        variant="button"
        color="primary"
        onClick={goDashboard}
        style={{ marginRight: '10px', cursor: 'pointer' }}
      >
        Dashboard
      </Typography>

      <Button color="primary" variant="outlined" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

/* -------------------------------------------------------------------------- */

AuthLinks.propTypes = {
  history: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default AuthLinks;

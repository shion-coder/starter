import React from 'react';
import PropTypes from 'prop-types';

import { Box, Button } from '@material-ui/core';

/* -------------------------------------------------------------------------- */

const GuestLinks = ({ history }) => {
  const goRegister = () => history.push('/register');
  const goLogin = () => history.push('/login');

  return (
    <Box>
      <Button color="primary" variant="outlined" onClick={goRegister} style={{ marginRight: '10px' }}>
        Register
      </Button>

      <Button color="primary" variant="outlined" onClick={goLogin}>
        Login
      </Button>
    </Box>
  );
};

/* -------------------------------------------------------------------------- */

GuestLinks.propTypes = {
  history: PropTypes.object.isRequired,
};

export default GuestLinks;

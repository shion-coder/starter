import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from 'redux/selectors/auth.selector';

import { Typography } from '@material-ui/core';

/* -------------------------------------------------------------------------- */

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

const Dashboard = ({ user }) =>
  user && (
    <Typography variant="h5" align="center" color="primary">
      {`Welcome ${user.name}`}
    </Typography>
  );

/* -------------------------------------------------------------------------- */

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Dashboard);

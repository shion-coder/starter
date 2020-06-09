import React from 'react';
import PropTypes from 'prop-types';

import SvgIcon from '@material-ui/core/SvgIcon';

import { Path } from './home-icon.styles';

/* -------------------------------------------------------------------------- */

const HomeIcon = props => (
  <SvgIcon {...props}>
    <Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
);

/* -------------------------------------------------------------------------- */

HomeIcon.propTypes = {
  props: PropTypes.any,
};

export default HomeIcon;

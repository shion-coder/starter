const bcrypt = require('bcryptjs');

const User = require('../../../models/User');

const validateLoginInput = require('../../../validation/login');
const generateToken = require('../../../utils/genereate-token');

/* -------------------------------------------------------------------------- */

const login = async (req, res) => {
  // Check Validation
  const { isValid, errors } = validateLoginInput(req.body);

  if (!isValid) {
    return res.json({ errors });
  }

  // Find user by email
  const { email, password } = req.body;
  const user = await User.findOne({ email }).catch((err) => {
    throw new Error(err);
  });

  // Check for user email
  if (!user) {
    errors.email = 'User not found';

    return res.json({ errors });
  }

  // Check for user password
  const isMatch = await bcrypt.compare(password, user.password).catch((err) => {
    throw new Error(err);
  });

  if (!isMatch) {
    errors.password = 'Password incorrect';

    return res.json({ errors });
  }

  generateToken(user, res);
};

module.exports = login;

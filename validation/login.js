const validator = require('validator');
const isEmpty = require('is-empty');

/* -------------------------------------------------------------------------- */

const validateLoginInput = (data) => {
  const errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  const required = ['email', 'password'];

  required.forEach((val) => {
    data[val] = !isEmpty(data[val]) ? data[val] : '';
  });

  // Email checks
  if (validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  // Password checks
  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateLoginInput;

const validator = require('validator');
const isEmpty = require('is-empty');

/* -------------------------------------------------------------------------- */

const validateRegisterInput = (data) => {
  const errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  const required = ['name', 'email', 'password', 'confirmPassword'];

  required.forEach((val) => {
    data[val] = !isEmpty(data[val]) ? data[val] : '';
  });

  // Name checks
  if (validator.isEmpty(data.name)) {
    errors.name = 'Name is required';
  }

  // Email checks
  if (validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  // Password checks
  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  } else if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Confirm password is required';
  }

  if (!validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegisterInput;

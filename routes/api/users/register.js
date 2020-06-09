const bcrypt = require('bcryptjs');

const User = require('../../../models/User');

const validateRegisterInput = require('../../../validation/register');
const generateToken = require('../../../utils/genereate-token');

/* -------------------------------------------------------------------------- */

const register = async (req, res) => {
  // Check Validation
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.json({ errors });
  }

  // Find user by email
  const { name, email, password } = req.body;
  const user = await User.findOne({ email }).catch((err) => {
    throw new Error(err);
  });

  // Check for user email
  if (user) {
    errors.email = 'Email already exists';

    return res.json({ errors });
  }

  const newUser = new User({
    name,
    email,
    password,
  });

  // Hash password before saving in database
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      if (err) {
        throw new Error(err);
      }

      newUser.password = hash;

      const user = await newUser.save().catch((err) => {
        throw new Error(err);
      });

      generateToken(user, res);
    });
  });
};

module.exports = register;

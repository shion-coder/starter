const jwt = require('jsonwebtoken');

const { secretOrKey } = require('../config/keys');

/* -------------------------------------------------------------------------- */

const generateToken = (user, res) =>
  jwt.sign(
    { id: user.id, name: user.name, email: user.email, date: user.date },
    secretOrKey,
    { expiresIn: '1h' },
    (err, token) => {
      res.json({ token: 'Bearer ' + token });
    },
  );

module.exports = generateToken;

const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const { secretOrKey } = require('../config/keys');

// Model
const User = require('../models/User');

/* -------------------------------------------------------------------------- */

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey,
};

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    const existingUser = await User.findById(payload.id).catch((err) => {
      throw new Error(err);
    });

    if (!existingUser) {
      return done(null, false);
    }

    return done(null, existingUser);
  }),
);

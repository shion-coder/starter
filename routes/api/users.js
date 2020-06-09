const express = require('express');
const passport = require('passport');

const register = require('./users/register');
const login = require('./users/login');
const current = require('./users/current');

/* -------------------------------------------------------------------------- */

const router = express.Router();

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => register(req, res));

// @route   POST api/users/login
// @desc    Login user / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => login(req, res));

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => current(req, res));

module.exports = router;

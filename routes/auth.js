const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
// const pairs = require('../seedData');

const { JWT_SECRET, JWT_EXPIRY } = require('../config.js');
const options = {session: false, failWithError: true};
const localAuth = passport.authenticate('local', options);
const Pair = require('../models/pairs');

function createAuthToken (user) {
  return jwt.sign({user}, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY
  });
}

const jwtAuth = passport.authenticate('jwt', options);

router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

router.post('/login', localAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken  });
});

// router.get('/insertdata', (req, res, next) => {
//   Pair.insertMany(pairs)
//   .then(res.sendStatus(201));
// })


module.exports = router;

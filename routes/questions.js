const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();

router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

router.get('/', (req, res, next) => {
  const userId = req.user.id;

  let data = {
    spanish: 'agua',
    english: 'water',
    score: 1,
    guesses: 0,
    correct: 0,
    next: '',
  };

  res.json(data);
});

module.exports = router;
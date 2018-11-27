const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/users');
const passport = require('passport');
const router = express.Router();

router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

router.get('/', (req, res, next) => {
  const userId = req.user.id;
  User.findOne({_id: userId})
    .then(result => {
      let questionObj = result.questions[result.head];
      const {question, guesses, correct} = questionObj;
      res.json({question, guesses, correct});
    })
    .catch(err => next(err));
});

module.exports = router;
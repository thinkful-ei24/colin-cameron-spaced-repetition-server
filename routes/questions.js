const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/users');
const passport = require('passport');
const router = express.Router();

router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

router.get('/', (req, res, next) => {
  const userId = req.user.id;
  User.findOne({ _id: userId })
    .then(result => {
      let questionObj = result.questions[result.head];
      const { question, guesses, correct } = questionObj;
      console.log(question);
      res.json({ question, guesses, correct });
    })
    .catch(err => next(err));
});

router.put('/', (req, res, next) => {
  const { answer } = req.body;
  const userId = req.user.id;
  let index;
  let feedbackResponse;
  User.findOne({ _id: userId })
    .then(result => {
      index = result.head;
      let {user, feedback} = result.spacedRepetition(answer);
      feedbackResponse = feedback;
      return User.findOneAndUpdate({_id: userId}, user, {new: true});
    })
    .then(result => {
      let currentQuestion = result.questions[index];
      const {guesses, correct, answer} = currentQuestion;
      res.json({guesses, correct, answer, feedback: feedbackResponse});
    })
    .catch(err => next(err));
});

module.exports = router;

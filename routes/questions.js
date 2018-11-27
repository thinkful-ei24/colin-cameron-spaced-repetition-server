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
      res.json({ question, guesses, correct });
    })
    .catch(err => next(err));
});

router.put('/', (req, res, next) => {
  const { question, answer } = req.body;
  const userId = req.user.id;
  let feedback;
  let index;
  User.findOne({ _id: userId })
    .then(result => {
      let currentQuestion = result.questions[result.head];
      index = result.head;
      if (currentQuestion.answer.toUpperCase() === answer.toUpperCase()) {
        feedback = 'correct';
        currentQuestion.guesses++;
        currentQuestion.correct++;
        currentQuestion.memoryStrength = Math.min(9, currentQuestion.memoryStrength * 2);
      }else{
        feedback = 'incorrect';
        currentQuestion.guesses++;
        currentQuestion.memoryStrength = 1;
      }
      return {questions: result.questions, head:currentQuestion.next};
    })
    .then(result => {
      return User.findOneAndUpdate({ _id: userId }, result, {new: true});
    })
    .then(result => {
      const {guesses, correct} = result.questions[index];
      res.json({ feedback, guesses, correct});
    })
    .catch(err => next(err));
})

module.exports = router;
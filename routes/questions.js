const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/users');
const passport = require('passport');
const router = express.Router();

router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

/* ================ GET current question ==================== */

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

/* ================ GET overall progress ==================== */

router.get('/progress', (req, res, next) => {
  const userId = req.user.id;
  User.findOne({ _id: userId })
    .then(result => {
      const { questions } = result;
      let response = [];
      for(let i=0; i<questions.length; i++){
        let obj={};
        obj.question = questions[i].question;
        obj.correct = questions[i].correct;
        obj.guesses = questions[i].guesses;
        response.push(obj);
      }
      res.json(response);
    })
    .catch(err => next(err));
});

/* ================ PUT answer ==================== */

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


/* ================= POST new card ================ */
router.post('/', (req, res, next) => {
  const {answer, question} = req.body;

  if (!answer || !question) {
    const err = new Error('wtf you didnt even send anything');
    err.status = 401;
    return next(err);
  }
  const {id} = req.user;
  const newCard = {
    question,
    answer,
    memoryStrength: 1,
    guesses: 0,
    correct: 0
  };
  let oldHead; //oldHead is equal to the head when we find the user thanks to line 74
  User.findOne({_id: id}) //finds the correct user
    .then(user => {
      oldHead = user.head;
      newCard.next = oldHead;
      user.head = user.questions.length; //sets current head to the new card
      user.questions.forEach(question => {
        if(question.next === oldHead) {
          question.next = user.head;
        }
      });
      user.questions.push(newCard); // adds the new question and answer pair to user questions array
      return User.findOneAndUpdate({_id: id}, user, {new: true});
    })
    .then(result => {
      res.json({result}).status(201);
    })
    .catch(err => next(err));
});

module.exports = router;


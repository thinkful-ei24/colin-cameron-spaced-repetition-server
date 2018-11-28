const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  questions: [{
    _id: mongoose.Schema.Types.ObjectId,
    question: String,
    answer: String,
    memoryStrength: Number,
    guesses: Number,
    correct: Number,
    next: Number
  }],
  head: {
    type: Number,
    default: 0
  }
});

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = password => {
  return bcrypt.hash(password, 11);
};

userSchema.methods.spacedRepetition = function (answer) {
  let index = this.head;
  let feedback;
  let currentQuestion = this.questions[index];

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
  let ptr = index;
  this.head = currentQuestion.next;
  for (let i=0; i < currentQuestion.memoryStrength; i++) {
    index = this.questions[index].next;
    //index = 2
    //ptr = 0
  }
  currentQuestion.next = this.questions[index].next; // questionA.next = 3
  this.questions[index].next = ptr; //questionC.next = 0
  console.log(this);
  return {
    answer: currentQuestion.answer,
    feedback,
    guesses: currentQuestion.guesses,
    correct: currentQuestion.correct,
    user: this
  };
};

userSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
    delete result.pasword;
  }
});

module.exports = mongoose.model('User', userSchema);

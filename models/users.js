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

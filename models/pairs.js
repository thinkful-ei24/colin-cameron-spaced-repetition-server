const mongoose = require('mongoose');

const pairSchema = new mongoose.Schema({
  question: String,
  answer: String
});

module.exports = mongoose.model('Pair', pairSchema);
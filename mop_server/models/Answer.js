/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  body: String,
  date: {
    type: Date,
    default: Date.now(),
  },

  onQuestion: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  }],
});

module.exports = mongoose.model('Answer', answerSchema);

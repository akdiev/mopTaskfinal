/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  body: String,

  date: {
    type: Date,
    default: Date.now(),
  },

  onQuestion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  },

  upvotes: Number,
});

module.exports = mongoose.model('Answer', answerSchema);

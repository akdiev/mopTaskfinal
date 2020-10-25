/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  body: String,

  date: {
    type: Date,
    default: Date.now(),
  },

  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer',
  }],

  upvotes: 0,
});

module.exports = mongoose.model('Question', questionSchema);

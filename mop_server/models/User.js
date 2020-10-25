/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
  },

  lastname: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
    min: 8,
  },

  email: {
    type: String,
    required: true,
  },

  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  }],
});

module.exports = mongoose.model('User', userSchema);

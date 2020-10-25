/* eslint-disable linebreak-style */
const Answer = require('../models/Answer');
const Question = require('../models/Question');

const get = async (req, res, next) => {
  try {
    const answer = await Answer.findById(req.params.id).populate('onQuestion');
    res.json(answer);
  } catch (err) {
    next(err);
  }
};

const listByQuestion = async (req, res, next) => {
  try {
    const answers = await Answer.find({ onQuestion: req.query.id });
    res.json({ answers });
  } catch (err) {
    next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const answers = await Answer.find().populate('onQuestion');
    res.json({ answers });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  console.log(req.body);
  try {
    const newAnswer = new Answer(req.body);
    await newAnswer.save().then((result) => {
      Question.findOne({ _id: result.onQuestion }, (error, question) => {
        question.answers.push(newAnswer);
        question.save();
      });
    });

    res.json({ answer: newAnswer });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const answer = await Answer.findById(req.params.id);
    await answer.remove();

    res.send('Answer deleted!');
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const answer = await Answer.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
    );
    res.json(answer);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  get,
  list,
  create,
  remove,
  update,
  listByQuestion,
};

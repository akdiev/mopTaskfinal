const Question = require('../models/Question');

const get = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id).populate('postedBy');

    res.json(question);
  } catch (err) {
    next(err);
  }
};

const listbyUser = async (req, res, next) => {
  try {
    console.log('uslo', req.query.id);
    const questions = await Question.find({ postedBy: req.query.userId });
    res.json({ questions });
  } catch (err) {
    next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const questions = await Question.find().populate('postedBy');
    res.json({ questions });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();

    res.json({ question: newQuestion });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    await question.remove();

    res.send('Question deleted!');
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const question = await Question.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
    );
    res.json(question);
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
  listbyUser,
};

const Question = require('../models/Question');
const User = require('../models/User');

// const get = async (req, res, next) => {
//   try {
//     console.log('to je to11');
//     const question = await Question.findById(req.params.id).populate('postedBy');
//     res.json(question);
//   } catch (err) {
//     next(err);
//   }
// };

const listbyUser = async (req, res, next) => {
  try {
    console.log('to je to');
    const questions = await Question.find({ postedBy: req.params.id }).populate('postedBy').populate('answers');
    res.json({ questions });
  } catch (err) {
    next(err);
  }
};

const list = async (req, res, next) => {
  try {
    console.log('req.query', req.query);
    const questions = await Question.find().populate('answers').populate('postedBy');
    if (req.query.sortBy === 'upvotes') {
      const sortedQuestions = await Question.find().sort({ upvotes: -1 }).populate('answers').populate('postedBy');
      res.json({ sortedQuestions });
    } else {
      res.json({ questions });
    }
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save().then((result) => {
      User.findOne({ _id: result.postedBy }, (error, user) => {
        user.questions.push(newQuestion);
        user.save();
        res.json({ question: newQuestion });
      });
    });
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
  // get,
  list,
  create,
  remove,
  update,
  listbyUser,
};

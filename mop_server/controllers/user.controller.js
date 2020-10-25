const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const User = require('../models/User');

const get = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('questions');

    res.json(user);
  } catch (err) {
    next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const users = await User.find().limit(100);
    res.json({ users });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    console.log(req.body);
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send('Email already exists!');

    const newUser = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    newUser.password = hashPassword;
    await newUser.save();
    res.json({ user: newUser });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    await user.remove();

    res.send('User deleted!');
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  console.log('req', req);
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
    );
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res) => {
  try {
    console.log('login', req.body);
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email or password incorrect!');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Email or password incorrect!');
    // eslint-disable-next-line no-underscore-dangle
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN);
    res.header('auth-token', token).send(token);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  get,
  list,
  create,
  remove,
  update,
  login,
};

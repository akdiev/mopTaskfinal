// DOTENV CONFIG

const dotenv = require('dotenv');

dotenv.config();

// IMPORTS

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const questionsRouter = require('./routes/question.route');
const usersRouter = require('./routes/users.route');
const answerRouter = require('./routes/answer.route');

// CONNECT DO MONGO DATABASE

require('./mongoose');

// SETUP EXPRESS

const app = express();

// parse body params and attach them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/api/questions', questionsRouter);
app.use('/api/users', usersRouter);
app.use('/api/answers', answerRouter);

// NOT FOUND
app.use((req, res) => {
  res.end('NOT FOUND');
});

// ERROR HANDLER
app.use((err, req, res) => {
  res.send(err);
});

app.listen('3001', () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on Port: ${3001}`);
});

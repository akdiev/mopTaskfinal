const mongoose = require('mongoose');

const mongoUri = process.env.DB_URI;

mongoose.connect(mongoUri, {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

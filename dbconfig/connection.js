const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.APP_MONGODB_URI || 'mongodb://127.0.0.1:27017/drafthack', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;

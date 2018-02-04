const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost:27017/TodoApp');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {
  mongoose : mongoose
};


// process.env.NODE_ENV = 'production'
// process.env.NODE_ENV = 'development'
// process.env.NODE_ENV = 'test'

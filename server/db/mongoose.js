var mongoose = require('mongoose');

// there are many promise library to choose from that mongoose can work with.
// Specify which promise library you want to work with.
// we are going to use the built-in promise library as oppose to third party library

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports  = { mongoose };

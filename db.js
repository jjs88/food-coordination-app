//Import the mongoose module
var mongoose = require('mongoose');
const keys = require('./config/keys');

//Set up default mongoose connection
mongoose.connect(keys.mongoURI);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
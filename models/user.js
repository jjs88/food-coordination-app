const mongoose = require('mongoose');
const Schema = mongoose.Schema;

UserSchema = new Schema({
  name: {
    type: String
  },
  googleId: {
    type: String,
    unique: true
  },
  displayName: String
})

const User = mongoose.model('user', UserSchema);

module.exports = User;
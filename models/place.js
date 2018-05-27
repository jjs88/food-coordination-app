const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  city: String,
  image_url: String,
  url: String,
  rating: Number,
  users: [{type: Schema.Types.ObjectId, ref: 'user'}]
})

//virtual field to get users that are going to the place
PlaceSchema.virtual('going').get(function() {
  return this.users.length;
});

const Place = mongoose.model('place', PlaceSchema);

module.exports = Place;
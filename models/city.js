const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  places: [{type: Schema.Types.ObjectId, ref: 'place'}]

})

const City = mongoose.model('city', CitySchema);

module.exports = City;
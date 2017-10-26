//Dependencies
const mongoose = require('mongoose');


// Destructuring
const { Schema } = mongoose;


// Schema
var querySchema = new Schema({
  query: {
    type: String,
    trim: true, // Trims whitespaces
    required: 'Kindly enter a name of a city.'
  },
  date_queried: {
    type: Date,
    default: Date.now
  },
  city_result: {
    type: String
  },
  country_result: {
    type: String
  },
  temp_result: {
    type: Number
  }
});


// Return Model
module.exports = mongoose.model('Queries', querySchema);

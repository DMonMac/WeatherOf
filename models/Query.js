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
  results: {}
});


// Return Model
module.exports = mongoose.model('Queries', querySchema);

//Dependencies
var express = require('express');
var router = express.Router();
var request = require('request');


// Models
var Query = require('../models/Query')


// Routes
router.get('/', function(req, res, next) {
  res.send('This is the "query_db" route');
});




// Return router
module.exports = router;

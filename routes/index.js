// Dependencies
var express = require('express');
var router = express.Router();

// Mongo DB
const mongoose = require('mongoose');
const Query = require('../models/Query');

// Import controller functions
const queryController = require('../controllers/queryController.js')


// Routes
// Homepage
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WeatherOf', weather: null, error: null });
});

router.post('/', queryController.postQuery);


// Queries API
router.get('/api/queries', function(req, res) {
  Query.find()
    .then(queries => {
      res.json(queries)
    })
});

// router.delete('/api/queries/:queryId', queryController.deleteQueryAPI);


//Queries
router.get('/queries', queryController.getQueries);


// Return router
module.exports = router;

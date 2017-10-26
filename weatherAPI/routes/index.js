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
  res.render('index', { title: 'OpenWeather API', weather: null, error: null });
});

router.post('/', queryController.postQuery);

// API
router.get('/api/queries', function(req, res) {
  Query.find()
    .then(queries => {
      res.json(queries)
    })
});

//Queries
router.get('/queries', function(req, res) {
  Query.find()
    .then(queries => {
      res.render('queries', { title: 'Queries',
                              queries: queries
                            })
      })
});


// Return router
module.exports = router;

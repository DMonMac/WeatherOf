// Dependencies
var express = require('express');
var router = express.Router();


// Import controller functions
const queryController = require('../controllers/queryController.js')


// Routes [Clean Up Later]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'OpenWeather API', weather: null, error: null });
});

/* POST home page. */
router.post('/', queryController.postQuery);


// Return router
module.exports = router;

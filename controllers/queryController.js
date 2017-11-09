// Path: controllers/queryController.js

// Dependencies
var request = require('request');

// Mongo DB
const mongoose = require('mongoose');
var Query = mongoose.model('Queries');


// GET:
exports.getQueries = function(req, res) {
  // Sends json format data to queries.ejs
  Query.find()
    .then(queries => {
      res.render('queries', { title: 'Queries',
                              queries: queries
                            })
      })
}

//POST: Save query to database then display weather details to user
exports.postQuery = function(req, res) {
  let query = req.body.query;
  const apiKey = 'f1f7d91ee7de450aa3c6a354aed9abe5'; // API key for OpenWeather
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`

  // Utilizing data from OpenWeatherAPI
  request(url, function (err, response, body) {
    // Error handling first, then response if none
    if(err){
      res.render('index', { title: 'WeatherOf',
                            apiData: null,
                            error: 'Error, please try again' });
    } else {
        // Data from API is 'parsed' into usable data
        let weatherData = JSON.parse(body)
        console.log(query);
        console.log(weatherData);
        if(weatherData == undefined) {
          res.render('index', { title: 'WeatherOf',
                              apiData: null,
                              error: 'Error, please try again' });
        } else {
            let newQuery = new Query({
              query: query,
              results: weatherData
            });
            newQuery.save();
            console.log(newQuery);

            res.render('index', { title: 'WeatherOf',
                                  apiData: true,
                                  error: null,
                                  weather: weatherData
                                });
          }
      }
  });
}

exports.deleteQueryAPI = function(req, res) {
  Query.remove({
    _id: req.params.queryId
  }, (err, query) => {
    if (err) {res.json(err)};
    res.json({query, message: `Query deleted`});
  });
};

// Path: controllers/queryController.js

// Dependencies
var request = require('request');

// Mongo DB
const mongoose = require('mongoose');
const Query = require('../models/Query');


// Homepage POST: Save query to database then display weather details to user
exports.postQuery = function(req, res) {
  let query = req.body.query;
  const apiKey = 'f1f7d91ee7de450aa3c6a354aed9abe5'; // API key for OpenWeather
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`


  // Save query to db
  let newQuery = new Query({
    query: query
  });
  newQuery.save();

  // Utilizing data from OpenWeatherAPI
  request(url, function (err, response, body) {
    // Error handling first, then response if none
    if(err){
      res.render('index', { title: 'OpenWeather API',
                            weather: null,
                            error: 'Error, please try again' });
    } else {
        // Data from API is 'parsed' into usable data
        let weather = JSON.parse(body)
        console.log(weather);
        if(weather.main == undefined) {
          res.render('index', { title: 'OpenWeather API',
                              weather: null,
                              error: 'Error, please try again' });
        } else {
            let weatherLocation = `${weather.name}, ${weather.sys.country}`
                weatherInfo = weather.weather.map(function(weather){
                  return (
                      `Weather: ${weather.main}  Details: ${weather.description}`
                  );
                });
            let weatherTemp = `${weather.main.temp} degress Fahrenheit`;
            res.render('index', { title: 'OpenWeather API',
                                  location: weatherLocation,
                                  weather: weatherInfo,
                                  temperature: weatherTemp,
                                  error: null});
          }



      }
  })


}

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
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`


  // Save query to db
  //let newQuery = new Query({
  //  query: query
  //});
  //newQuery.save();

  // Utilizing data from OpenWeatherAPI
  request(url, function (err, response, body) {
    // Error handling first, then response if none
    if(err){
      res.render('index', { title: 'OpenWeather API',
                            apiData: null,
                            error: 'Error, please try again' });
    } else {
        // Data from API is 'parsed' into usable data
        let weatherData = JSON.parse(body)
        console.log(query);
        console.log(weatherData);
        if(weatherData == undefined) {
          res.render('index', { title: 'OpenWeather API',
                              apiData: null,
                              error: 'Error, please try again' });
        } else {
            let wCity = weatherData.name,
                wCountry = weatherData.sys.country,
                wTemp = weatherData.main.temp.toFixed(2),
                //wTemp = (weatherData.main.temp - 273.15).toFixed(2),
                wWeather = weatherData.weather.map(function(weather){
                  return weather.main
                });
                wWeatherDescription = weatherData.weather.map(function(weather){
                  return weather.description
                });
            // save query and results
            let newQuery = new Query({
              query: query,
              city_result: wCity,
              country_result: wCountry,
              temp_result: wTemp,
              weather_result: wWeather[0],
              weather_description_result: wWeatherDescription[0],
            });
            //newQuery.save();
            console.log(newQuery);

            res.render('index', { title: 'OpenWeather API',
                                  apiData: true,
                                  error: null,
                                  city: wCity,
                                  country: wCountry,
                                  temperature: wTemp,
                                  weather: wWeather[0],
                                  weather_description: wWeatherDescription[0]
                                });
          }



      }
  })


}

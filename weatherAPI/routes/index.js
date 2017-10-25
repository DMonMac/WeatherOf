var express = require('express');
var router = express.Router();
var request = require('request');
const apiKey = 'f1f7d91ee7de450aa3c6a354aed9abe5';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'OpenWeather API', weather: null, error: null });
});

/* POST home page. */
router.post('/', function(req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', { title: 'OpenWeather API',
                            weather: null,
                            error: 'Error, please try again' });
    } else {
        let weather = JSON.parse(body)
        console.log(weather);
        if(weather.main == undefined) {
          res.render('index', { title: 'OpenWeather API',
                              weather: null,
                              error: 'Error, please try again' });
        } else {
            let weatherInfo = weather.weather.map(function(weather){
              return (
                  `Weather: ${weather.main} Description: ${weather.description}`


              );
            }

            )
            let weatherTemp = `It's ${weather.main.temp} degress in ${weather.name}...`;
            res.render('index', { title: 'OpenWeather API',
                                  weather: weatherInfo,
                                  error: null});
          }
      }
  })


});



module.exports = router;

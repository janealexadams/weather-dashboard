// API Links:
// https://openweathermap.org/api/geocoding-api
// https://openweathermap.org/forecast5

// my key = cda71af98eac24bf9a566b8327e94526
// API for coordinates = 
  // https://openweathermap.org/api/geocoding-api
  // 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}'
// API for weather = 
  // https://openweathermap.org/forecast5
  // 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=cda71af98eac24bf9a566b8327e94526'
 

var cityInputEl = $('#search');
var today = $('#today');
var searchForm = $('#searchForm')

var submitForm = function (event) {
  event.preventDefault();

  var userInput = cityInputEl.val().trim();
  console.log(userInput);
  if (userInput) {
    getCoordinates(userInput);
  } else {
    alert('Please enter a city');
  }
};


function getCoordinates (cityName) {
  // console.log(cityName)
  var coordinatesUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=cda71af98eac24bf9a566b8327e94526';
  
  fetch(coordinatesUrl)
  .then(function (response) {
      if (response.ok) {
          response.json().then(function (data) {
              console.log(data[0].lat);
              console.log(data[0].lon);
              var latitude = data[0].lat;
              var longitude = data[0].lon;
              getWeather(latitude, longitude);
          });
      } else {
        alert('Error: ' + response.statusText);
      }
  })
  .catch(function (error) {
    alert('Unable to find weather data');
  });
  
}


var getWeather = function (latitude, longitude) {
  var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=cda71af98eac24bf9a566b8327e94526';

  fetch(weatherUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          // console.log(data);
          // console.log(data.city.name);
          var cityName = data.city.name;
          var fiveDays = []
          for (var i = 0; i < data.list.length; i+=7) {
            fiveDays.push(data.list[i]);
          }
          // var date = data.list[i].dt_txt.split(" ")[0]
          // var temperature = data[i].main.temp;
          // var wind = data[i].wind;
          // var humidity = data[i].main.humidity;
          displaytWeatherResults(fiveDays, cityName)
        });
      } 
    })
};


// Display weather results
function displaytWeatherResults(data, cityName) {
console.log(data)
var currentDate = data[0].dt_txt.split(" ")[0];
var listTodaysWeather = $('#today');
// trying to add the city name next to today's forecast
listTodaysWeather.textContent = " " + cityName;






// var weatherUl = $('#currentWeather');
// var dateLi = $('<h2>');
// dateLi.text(cityName + " " + currentDate);
// weatherUl.append(dateLi);
}
 

searchForm.on('submit', submitForm);
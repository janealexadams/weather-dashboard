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
var startButton = $('startBtn')

var submitForm = function (event) {
  event.preventDefault();

  var userInput = cityInputEl.value.trim();

  if (userInput) {
    getCoordinates;
  } else {
    alert('Please enter a city');
  }
};


function getCoordinates (cityName) {
  var coordinatesUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=cda71af98eac24bf9a566b8327e94526';
  
  fetch(coordinatesUrl)
  .then(function (response) {
      if (response.ok) {
          response.json().then(function (data) {
              console.log(data[i].lat);
              console.log(data[i].lon);
              var lat = data[i].lat;
              var lon = data[i].lon;
          });
      } else {
        alert('Error: ' + response.statusText);
      }
  })
  .catch(function (error) {
    alert('Unable to find weather data');
  });
}


var getWeather = function (lat, lon) {
  var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=cda71af98eac24bf9a566b8327e94526';

  fetch(weatherUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
        });
      } 
    })
};

startButton.addEventListener('click', getCoordinates);
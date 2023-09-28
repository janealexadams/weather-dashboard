// API Links:
// https://openweathermap.org/api/geocoding-api
// https://openweathermap.org/forecast5
// my key = cda71af98eac24bf9a566b8327e94526


var cityInputEl = $('#search');
var today = $('#today');
var searchForm = $('#searchForm')
var weatherResultsEl = $('#weatherResults');

var submitForm = function (event) {
  event.preventDefault();

  var userInput = cityInputEl.val().trim();
  console.log(userInput);
  if (userInput) {
    getCoordinates(userInput);
    startSearch()
  } else {
    alert('Please enter a city');
  }
};

//starts search will dislay the weather results containers 
function startSearch() {
  weatherResultsEl.removeClass('hidden');
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
  var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=cda71af98eac24bf9a566b8327e94526' + '&units=imperial';

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
// TODAY
// adding the city name next to today's forecast
var currentDate = data[0].dt_txt.split(" ")[0];
var listTodaysWeather = $('#today');
listTodaysWeather.text(cityName)
// adding the temperature to today's forecast
var currentTemp = data[0].main.temp;
var listTodaysTemp = $('#todaysTemp');
listTodaysTemp.text(currentTemp + '°F')
// adding the wind to today's forecast
var currentWind = data[0].wind.speed;
var listTodayswind = $('#todaysWind');
listTodayswind.text(currentWind + ' MPH')
// adding the humidity to today's forecast
var currentHumid = data[0].main.humidity;
var listTodaysHumid = $('#todaysHumid');
listTodaysHumid.text(currentHumid + '%')

// DAY 1
// adding the date 
var firstDate = data[1].dt_txt.split(" ")[0];
var listFirstDate = $('#firstDate');
listFirstDate.text(firstDate)
// adding the temperature 
var firstTemp = data[1].main.temp;
var listfirstTemp = $('#firstTemp');
listfirstTemp.text(firstTemp + '°F')
// adding the wind 
var firstWind = data[1].wind.speed;
var listFirstWind = $('#firstWind');
listFirstWind.text(firstWind + ' MPH')
// adding the humidity 
var firstHumid = data[1].main.humidity;
var listfirstHumid = $('#firstHumid');
listfirstHumid.text(firstHumid + '%')

// DAY 2
// adding the date 
var secondDate = data[2].dt_txt.split(" ")[0];
var listSecondDate = $('#secondDate');
listSecondDate.text(secondDate)
// adding the temperature 
var secondTemp = data[2].main.temp;
var listSecondTemp = $('#secondTemp');
listSecondTemp.text(secondTemp + '°F')
// adding the wind 
var secondWind = data[2].wind.speed;
var listSecondWind = $('#secondWind');
listSecondWind.text(secondWind + ' MPH')
// adding the humidity 
var secondHumid = data[2].main.humidity;
var listSecondHumid = $('#secondHumid');
listSecondHumid.text(secondHumid + '%')

// DAY 3
// adding the date
var thirdDate = data[3].dt_txt.split(" ")[0];
var listThirdDate = $('#thirdDate');
listThirdDate.text(thirdDate)
// adding the temperature 
var thirdTemp = data[3].main.temp;
var listThirdTemp = $('#thirdTemp');
listThirdTemp.text(thirdTemp + '°F')
// adding the wind 
var thirdWind = data[3].wind.speed;
var listThirdWind = $('#thirdWind');
listThirdWind.text(thirdWind + ' MPH')
// adding the humidity 
var thirdHumid = data[3].main.humidity;
var listThirdHumid = $('#thirdHumid');
listThirdHumid.text(thirdHumid + '%')

// DAY 4
// adding the date
var fourthDate = data[4].dt_txt.split(" ")[0];
var listFourthDate = $('#fourthDate');
listFourthDate.text(fourthDate)
// adding the temperature 
var fourthTemp = data[4].main.temp;
var listFourthTemp = $('#fourthTemp');
listFourthTemp.text(fourthTemp + '°F')
// adding the wind 
var fourthWind = data[4].wind.speed;
var listFourthWind = $('#fourthWind');
listFourthWind.text(fourthWind + ' MPH')
// adding the humidity 
var fourthHumid = data[4].main.humidity;
var listFourthHumid = $('#fourthHumid');
listFourthHumid.text(fourthHumid + '%')

// DAY 5
// adding the date
var fifthDate = data[5].dt_txt.split(" ")[0];
var listFifthDate = $('#fifthDate');
listFifthDate.text(fifthDate)
// adding the temperature 
var fifthTemp = data[5].main.temp;
var listFifthTemp = $('#fifthTemp');
listFifthTemp.text(fifthTemp + '°F')
// adding the wind 
var fifthWind = data[5].wind.speed;
var listFifthWind = $('#fifthWind');
listFifthWind.text(fifthWind + ' MPH')
// adding the humidity 
var fifthHumid = data[5].main.humidity;
var listFifthHumid = $('#fifthHumid');
listFifthHumid.text(fifthHumid + '%')
}

searchForm.on('submit', submitForm);
 
// intial load
function initLoad() {
  weatherResultsEl.addClass('hidden')
}
initLoad();



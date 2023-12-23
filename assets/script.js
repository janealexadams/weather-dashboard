var cityInputEl = $('#search');
var today = $('#today');
var searchForm = $('#search-form')
var weatherResultsEl = $('#weather-results');
var searchHistoryEl = $(".list-group");

var submitForm = function (event) {
  event.preventDefault();

  var userInput = cityInputEl.val().trim();
  if (userInput) {
    getCoordinates(userInput);
    startSearch()
     // Weather result is added to local storage
    localStorage.setItem("cityOne", userInput);
  } else {
    alert('Please enter a city');
  }
};

var startBtnEl = $('#search-now');
var startPageEl = $('#start-page-el');
var dashboardEl = $('#dashboard');
// Starts search will hide start screen and get dashboard 
function startWeather() {
  startPageEl.addClass('hidden');
  dashboardEl.removeClass('hidden');
};
// Event Listeners
startBtnEl.on('click', startWeather)


// Starts search will dislay the weather results containers 
function startSearch() {
  weatherResultsEl.removeClass('hidden');
};

function getCoordinates (cityName) {
  var coordinatesUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=cda71af98eac24bf9a566b8327e94526';
  
  fetch(coordinatesUrl)
  .then(function (response) {
      if (response.ok) {
          response.json().then(function (data) {
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
  var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&lang=en&appid=cda71af98eac24bf9a566b8327e94526' + '&units=imperial';

  fetch(weatherUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          var cityName = data.city.name;
          var fiveDays = []
          for (var i = 0; i < data.list.length; i+=7) {
            fiveDays.push(data.list[i]);
          }
          displaytWeatherResults(fiveDays, cityName)
        });
      } 
    })
};

// Display weather results
function displaytWeatherResults(data, cityName) {
// Adding the city name next to today's forecast
var currentDate = data[0].dt_txt.split(" ")[0];
var dateComponents = currentDate.split("-");
var year = dateComponents[0];
var month = dateComponents[1];
var day = dateComponents[2]
var formattedDate = month + "/" + day + "/" + year;
var listTodaysWeather = $('#today');
listTodaysWeather.text(formattedDate + " in " + cityName);
// Adding the emoji to today's forecast
var iconCode = data[0].weather[0].icon;
var iconurl = "https://openweathermap.org/img/w/" + iconCode + ".png";
$('#todayWicon').attr('src', iconurl);
// Adding the temperature to today's forecast
var currentTemp = data[0].main.temp;
var listTodaysTemp = $('#todays-temp');
listTodaysTemp.text(currentTemp + '°F')
// Adding the wind to today's forecast
var currentWind = data[0].wind.speed;
var listTodayswind = $('#todays-wind');
listTodayswind.text(currentWind + ' MPH')
// Adding the humidity to today's forecast
var currentHumid = data[0].main.humidity;
var listTodaysHumid = $('#todays-humid');
listTodaysHumid.text(currentHumid + '%')
// DAY 1
// Adding the date 
var firstDate = data[1].dt_txt.split(" ")[0];
var dateComponents = firstDate.split("-");
var year = dateComponents[0];
var month = dateComponents[1];
var day = dateComponents[2]
var formattedDate = month + "/" + day + "/" + year;
var listFirstDate = $('#first-date');
listFirstDate.text(formattedDate)
// Adding the emoji
var iconCode = data[1].weather[0].icon;
var iconurl = "https://openweathermap.org/img/w/" + iconCode + ".png";
$('#first-icon').attr('src', iconurl);
// Adding the temperature 
var firstTemp = data[1].main.temp;
var listfirstTemp = $('#first-temp');
listfirstTemp.text(firstTemp + '°F')
// Adding the wind 
var firstWind = data[1].wind.speed;
var listFirstWind = $('#first-wind');
listFirstWind.text(firstWind + ' MPH')
// Adding the humidity 
var firstHumid = data[1].main.humidity;
var listfirstHumid = $('#first-humid');
listfirstHumid.text(firstHumid + '%')
// DAY 2
// Adding the date 
var secondDate = data[2].dt_txt.split(" ")[0];
var dateComponents = secondDate.split("-");
var year = dateComponents[0];
var month = dateComponents[1];
var day = dateComponents[2]
var formattedDate = month + "/" + day + "/" + year;
var listSecondDate = $('#second-date');
listSecondDate.text(formattedDate)
// Adding the emoji 
var iconCode = data[2].weather[0].icon;
var iconurl = "https://openweathermap.org/img/w/" + iconCode + ".png";
$('#second-icon').attr('src', iconurl);
// Adding the temperature 
var secondTemp = data[2].main.temp;
var listSecondTemp = $('#second-temp');
listSecondTemp.text(secondTemp + '°F')
// Adding the wind 
var secondWind = data[2].wind.speed;
var listSecondWind = $('#second-wind');
listSecondWind.text(secondWind + ' MPH')
// Adding the humidity 
var secondHumid = data[2].main.humidity;
var listSecondHumid = $('#second-humid');
listSecondHumid.text(secondHumid + '%')
// DAY 3
// Adding the date
var thirdDate = data[3].dt_txt.split(" ")[0];
var dateComponents = thirdDate.split("-");
var year = dateComponents[0];
var month = dateComponents[1];
var day = dateComponents[2]
var formattedDate = month + "/" + day + "/" + year;
var listThirdDate = $('#third-date');
listThirdDate.text(formattedDate)
// Adding the emoji 
var iconCode = data[3].weather[0].icon;
var iconurl = "https://openweathermap.org/img/w/" + iconCode + ".png";
$('#third-icon').attr('src', iconurl);
// Adding the temperature 
var thirdTemp = data[3].main.temp;
var listThirdTemp = $('#third-temp');
listThirdTemp.text(thirdTemp + '°F')
// Adding the wind 
var thirdWind = data[3].wind.speed;
var listThirdWind = $('#third-wind');
listThirdWind.text(thirdWind + ' MPH')
// Adding the humidity 
var thirdHumid = data[3].main.humidity;
var listThirdHumid = $('#third-humid');
listThirdHumid.text(thirdHumid + '%')
// DAY 4
// Adding the date
var fourthDate = data[4].dt_txt.split(" ")[0];
var dateComponents = fourthDate.split("-");
var year = dateComponents[0];
var month = dateComponents[1];
var day = dateComponents[2]
var formattedDate = month + "/" + day + "/" + year;
var listFourthDate = $('#fourth-date');
listFourthDate.text(formattedDate)
// Adding the emoji 
var iconCode = data[4].weather[0].icon;
var iconurl = "https://openweathermap.org/img/w/" + iconCode + ".png";
$('#fourth-icon').attr('src', iconurl);
// Adding the temperature 
var fourthTemp = data[4].main.temp;
var listFourthTemp = $('#fourth-temp');
listFourthTemp.text(fourthTemp + '°F')
// Adding the wind 
var fourthWind = data[4].wind.speed;
var listFourthWind = $('#fourth-wind');
listFourthWind.text(fourthWind + ' MPH')
// Adding the humidity 
var fourthHumid = data[4].main.humidity;
var listFourthHumid = $('#fourth-humid');
listFourthHumid.text(fourthHumid + '%')
// DAY 5
// Adding the date
var fifthDate = data[5].dt_txt.split(" ")[0];
var dateComponents = fifthDate.split("-");
var year = dateComponents[0];
var month = dateComponents[1];
var day = dateComponents[2]
var formattedDate = month + "/" + day + "/" + year;
var listFifthDate = $('#fifth-date');
listFifthDate.text(formattedDate)
// Adding the emoji 
var iconCode = data[5].weather[0].icon;
var iconurl = "https://openweathermap.org/img/w/" + iconCode + ".png";
$('#fifth-icon').attr('src', iconurl);
// Adding the temperature 
var fifthTemp = data[5].main.temp;
var listFifthTemp = $('#fifth-temp');
listFifthTemp.text(fifthTemp + '°F')
// Adding the wind 
var fifthWind = data[5].wind.speed;
var listFifthWind = $('#fifth-wind');
listFifthWind.text(fifthWind + ' MPH')
// Adding the humidity 
var fifthHumid = data[5].main.humidity;
var listFifthHumid = $('#fifth-humid');
listFifthHumid.text(fifthHumid + '%')
}

searchForm.on('submit', submitForm);

// Display local storage when city is clicked on
searchHistoryEl.on('click', function(event) {
  var city = $(this).text();
  getCoordinates(city);
  startSearch();
});

// Intial load
function initLoad() {
  weatherResultsEl.addClass('hidden');
  // Retreive the saved weather data from local storage and display it when the page refreshes
  if (localStorage.getItem("cityOne") === null) {
      return
  }
  else {
      var weatherHistory = searchHistoryEl.text(localStorage.getItem("cityOne"));
      searchHistoryEl.append(weatherHistory);
      searchHistoryEl.removeClass('hidden')
      searchHistoryEl.addClass('list-btn btn btn-primary btn-block')
}
}
initLoad();



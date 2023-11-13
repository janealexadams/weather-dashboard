var cityInputEl = $('#search');
var today = $('#today');
var searchForm = $('#searchForm')
var weatherResultsEl = $('#weatherResults');
var searchHistoryEl = $(".listGroup");

var submitForm = function (event) {
  event.preventDefault();

  var userInput = cityInputEl.val().trim();
  if (userInput) {
    getCoordinates(userInput);
    startSearch()
     // weather result is added to local storage
    localStorage.setItem("cityOne", userInput);
  } else {
    alert('Please enter a city');
  }
};

var startBtnEl = $('#search-now');
var startPageEl = $('#startPageEl');
var dashboardEl = $('#dashboard');
//starts search will hide start screen and get dashboard 
function startWeather() {
  startPageEl.addClass('hidden');
  dashboardEl.removeClass('hidden');
};
// Event Listeners
startBtnEl.on('click', startWeather)


//starts search will dislay the weather results containers 
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
// TODAY
// adding the city name next to today's forecast
var currentDate = data[0].dt_txt.split(" ")[0];
var dateComponents = currentDate.split("-");
var year = dateComponents[0];
var month = dateComponents[1];
var day = dateComponents[2]
var formattedDate = month + "/" + day + "/" + year;
var listTodaysWeather = $('#today');
listTodaysWeather.text(formattedDate + " in " + cityName);
// // adding the emoji to today's forecast
var iconCode = data[0].weather[0].icon;
var iconurl = "https://openweathermap.org/img/w/" + iconCode + ".png";
$('#todayWicon').attr('src', iconurl);
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
var dateComponents = firstDate.split("-");
var year = dateComponents[0];
var month = dateComponents[1];
var day = dateComponents[2]
var formattedDate = month + "/" + day + "/" + year;
var listFirstDate = $('#firstDate');
listFirstDate.text(formattedDate)
// // adding the emoji to today's forecast
var iconCode = data[1].weather[0].icon;
var iconurl = "https://openweathermap.org/img/w/" + iconCode + ".png";
$('#firstWicon').attr('src', iconurl);
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
var dateComponents = secondDate.split("-");
var year = dateComponents[0];
var month = dateComponents[1];
var day = dateComponents[2]
var formattedDate = month + "/" + day + "/" + year;
var listSecondDate = $('#secondDate');
listSecondDate.text(formattedDate)
// // adding the emoji to today's forecast
var iconCode = data[2].weather[0].icon;
var iconurl = "https://openweathermap.org/img/w/" + iconCode + ".png";
$('#secondWicon').attr('src', iconurl);
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
var dateComponents = thirdDate.split("-");
var year = dateComponents[0];
var month = dateComponents[1];
var day = dateComponents[2]
var formattedDate = month + "/" + day + "/" + year;
var listThirdDate = $('#thirdDate');
listThirdDate.text(formattedDate)
// // adding the emoji to today's forecast
var iconCode = data[3].weather[0].icon;
var iconurl = "https://openweathermap.org/img/w/" + iconCode + ".png";
$('#thirdWicon').attr('src', iconurl);
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
var dateComponents = fourthDate.split("-");
var year = dateComponents[0];
var month = dateComponents[1];
var day = dateComponents[2]
var formattedDate = month + "/" + day + "/" + year;
var listFourthDate = $('#fourthDate');
listFourthDate.text(formattedDate)
// // adding the emoji to today's forecast
var iconCode = data[4].weather[0].icon;
var iconurl = "https://openweathermap.org/img/w/" + iconCode + ".png";
$('#fourthWicon').attr('src', iconurl);
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
var dateComponents = fifthDate.split("-");
var year = dateComponents[0];
var month = dateComponents[1];
var day = dateComponents[2]
var formattedDate = month + "/" + day + "/" + year;
var listFifthDate = $('#fifthDate');
listFifthDate.text(formattedDate)
// // adding the emoji to today's forecast
var iconCode = data[5].weather[0].icon;
var iconurl = "https://openweathermap.org/img/w/" + iconCode + ".png";
$('#fifthWicon').attr('src', iconurl);
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

// display local storage when city is clicked on
searchHistoryEl.on('click', function(event) {
  var city = $(this).text();
  getCoordinates(city);
  startSearch();
});

// intial load
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
      searchHistoryEl.addClass('listBtn btn btn-primary btn-block')
}
}
initLoad();



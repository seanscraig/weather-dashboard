var todayEl = document.getElementById("today");
var cityFormEl = document.getElementById("city-form");
var cityEl = document.getElementById("city-search");
var searchBtnEl = document.getElementById("searchBtn");

var todayDate = moment().format("(MM/DD/YYYY)");

// debug data
// var cityName = "Chicago";
// var currentTemp = 74.01;
// var currentWind = 6.67;
// var currentHumidity = 46;
// var currentUV = 0.47;

const APIKey = "17df62e6c611e766e40ad0ad3ee5ec14";

var formSubmitHandler = function(event) {
  event.preventDefault();

  var cityName = cityEl.value.trim();
  if (cityName === null) {
    console.log("error");
    return;
  } else {
    console.log(cityName);
  }
  getWeather(cityName);
};

function getWeather(city){
  var requestURl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+APIKey;
  
  fetch(requestURl)
    .then(function(response){
      if (response.ok){
        response.json().then(function(data){
          // console.log(data);
          var lat = data.coord.lat;
          var lon = data.coord.lon;
          console.log("lat: " + lat + " lon: " + lon);
          var latLogRequestURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&appid="+APIKey;
          fetch(latLogRequestURL)
            .then(function(response){
              if (response.ok) {
                response.json().then(function(data){
                  console.log(data);
                  displayToday(city,data);
                })
              }
              else {
                alert("Error: "+response.statusText);
              }
            })


        });
      } else {
        alert("Error: "+response.statusText);
      }
    })
    .catch(function(error){
      alert("Unable to fetch weather data");
    });
}

function displayToday(city,data){
  var $cityNameEl = document.createElement("h1");
  var $currentTempEl = document.createElement("p");
  var $currentWindEl = document.createElement("p");
  var $currentHumidityEl = document.createElement("p");
  var $currentUVEl = document.createElement("p");
  var $currentWeatherIconEl = document.createElement("img");

  var currentWeatherIcon="https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png";
  $currentWeatherIconEl.src = currentWeatherIcon;
  $currentWeatherIconEl.classList.add("icon");
  

  $cityNameEl.textContent = city+" "+todayDate;
  $currentTempEl.textContent = "Temp: "+data.current.temp;
  $currentWindEl.textContent = "Wind: "+data.current.wind_speed+" MPH";
  $currentHumidityEl.textContent = "Humidity: "+data.current.humidity+" %";
  $currentUVEl.textContent = "UVEl: "+data.current.uvi;

  todayEl.classList.add("card");
  todayEl.appendChild($cityNameEl);
  $cityNameEl.appendChild($currentWeatherIconEl);
  todayEl.appendChild($currentTempEl);
  todayEl.appendChild($currentWindEl);
  todayEl.appendChild($currentHumidityEl);
  todayEl.appendChild($currentUVEl);

}


// displayToday();
cityFormEl.addEventListener("submit", formSubmitHandler);
var $todayEl = document.getElementById("today");
var $fiveDayEl = document.getElementById("five-day");
var $searchHistoryEl = document.getElementById("search-history");

var cityFormEl = document.getElementById("city-form");
var cityEl = document.getElementById("city-search");
// var searchBtnEl = document.getElementById("searchBtn");

const APIKey = "17df62e6c611e766e40ad0ad3ee5ec14";

var searchHistory = [];

var formSubmitHandler = function(event) {
  event.preventDefault();

  // $todayEl.innerHTML = "";
  // $fiveDayEl.innerHTML = "";

  var cityName = cityEl.value.trim();
  if (cityName === "") {
    alert("Please enter a city.");
    return;
  } else {
    cityName = capFirstLetter(cityName);
    searchHistory.push(cityName);
    localStorage.setItem("search-history", JSON.stringify(searchHistory));
    renderHistory();
    getWeather(cityName);
  }
};

var buttonSearchHandler = function(event) {
  event.preventDefault();
  
  var btn = event.target;
  var city = btn.getAttribute("data-search");
  getWeather(city);
}

function renderHistory() {
  $searchHistoryEl.innerHTML = "";

  for (var i = 0; i < searchHistory.length; i++) {
    var history = searchHistory[i];

    var button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("data-search", history);
    button.textContent = history;
    // button.id ="search-button";
    button.classList.add("btn");
    button.classList.add("btn-secondary");

    $searchHistoryEl.appendChild(button);
  }
}

function getWeather(city){
  var cityRequestURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+APIKey;
  
  fetch(cityRequestURL)
    .then(function(response){
      if (response.ok){
        response.json().then(function(data){
          var lat = data.coord.lat;
          var lon = data.coord.lon;
          var latLogRequestURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&appid="+APIKey;
          fetch(latLogRequestURL)
            .then(function(response){
              if (response.ok) {
                response.json().then(function(data){
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
  $todayEl.innerHTML = "";
  $fiveDayEl.innerHTML = "";
  var $cityNameEl = document.createElement("h1");
  var $currentDescriptionEl = document.createElement("h2");
  var $currentTempEl = document.createElement("p");
  var $currentWindEl = document.createElement("p");
  var $currentHumidityEl = document.createElement("p");
  var $currentUVLabel = document.createElement("p");
  var $uvButton = document.createElement("button");
  var $currentWeatherIconEl = document.createElement("img");

  
  
  $cityNameEl.textContent = capFirstLetter(city)+" "+moment().format("(MM/DD/YYYY)");;
  $currentDescriptionEl.textContent = capFirstLetter(data.current.weather[0].description);
  $currentTempEl.textContent = "Temp: "+data.current.temp+" ºF";
  $currentWindEl.textContent = "Wind: "+data.current.wind_speed+" MPH";
  $currentHumidityEl.textContent = "Humidity: "+data.current.humidity+" %";


  $currentUVLabel.textContent = "UV Index: ";
  $uvButton.textContent = data.current.uvi;

  if (data.current.uvi < 3){
    $uvButton.classList.add("btn-success");
  } else if (data.current.uvi > 3 && data.current.uvi < 6) {
    $uvButton.classList.add("btn-warning");
  } else {
    $uvButton.classList.add("btn-danger");
  }

  $currentWeatherIconEl.src = "https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png";
  $currentWeatherIconEl.classList.add("icon");

  $todayEl.classList.add("card");
  $todayEl.appendChild($cityNameEl);
  $cityNameEl.appendChild($currentWeatherIconEl);
  $todayEl.appendChild($currentDescriptionEl);
  $todayEl.appendChild($currentTempEl);
  $todayEl.appendChild($currentWindEl);
  $todayEl.appendChild($currentHumidityEl);
  $todayEl.appendChild($currentUVLabel);
  $currentUVLabel.appendChild($uvButton);

  displayFiveDay(data);
}

function displayFiveDay(data){
  var fiveDayLabel = document.createElement("h2");
  fiveDayLabel.textContent = "5-Day Forecast:";
  $fiveDayEl.appendChild(fiveDayLabel);

  //Create Cards
  for (var i = 1; i < 6; i++){
    var containerDiv = document.createElement("div");
    var cardDiv = document.createElement("div");
    var cardBody = document.createElement("div");
    var $dateEl = document.createElement("h5");
    var $dailyEl = document.createElement("img");
    var $tempEl = document.createElement("p");
    var $windEl = document.createElement("p");
    var $humidityEl = document.createElement("p");

    $dailyEl.src = "https://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png";
    $dailyEl.classList.add("icon");
  
    $dateEl.textContent = moment.unix(data.daily[i].dt).format("MM/DD/YYYY");
    $tempEl.textContent = "Temp: "+data.daily[i].temp.max+" ºF";
    $windEl.textContent = "Wind: "+data.daily[i].wind_speed+" MPH";
    $humidityEl.textContent = "Humidity: "+data.daily[i].humidity+" %";
  
    containerDiv.classList.add("col-md-2");
    cardDiv.classList.add("card");
    cardBody.classList.add("card-body");
    $dateEl.classList.add("card-title");
    $dailyEl.classList.add("card-subtitle");
    $tempEl.classList.add("card-text");
  
    $fiveDayEl.appendChild(containerDiv);
    containerDiv.appendChild(cardDiv);
    cardDiv.appendChild(cardBody);
    cardBody.appendChild($dateEl);
    cardBody.appendChild($dailyEl);
    cardBody.appendChild($tempEl);
    cardBody.appendChild($windEl);
    cardBody.appendChild($humidityEl);
  }
}

function init() {
  var storedHistory = JSON.parse(localStorage.getItem("search-history"));

  if (storedHistory !== null) {
    searchHistory = storedHistory;
  }

  renderHistory();
}

// Helper function to capitalize the first letter of each word
function capFirstLetter(str){
  var words = str.split(" ");
    for (var i = 0; i < words.length; i++)
    {
        var j = words[i].charAt(0).toUpperCase();
        words[i] = j + words[i].substr(1);
    }
    return words.join(" ");
}

init();

cityFormEl.addEventListener("submit", formSubmitHandler);

$searchHistoryEl.addEventListener("click", buttonSearchHandler);
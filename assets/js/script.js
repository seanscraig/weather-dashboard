var $todayEl = document.getElementById("today");
var $fiveDayEl = document.getElementById("five-day");

var cityFormEl = document.getElementById("city-form");
var cityEl = document.getElementById("city-search");
var searchBtnEl = document.getElementById("searchBtn");

const APIKey = "17df62e6c611e766e40ad0ad3ee5ec14";

var formSubmitHandler = function(event) {
  event.preventDefault();

  $todayEl.innerHTML = "";

  var cityName = cityEl.value.trim();
  if (cityName === "") {
    console.log("error");
    return;
  } else {
    getWeather(cityName);
  }
  
};

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
                  console.log(latLogRequestURL);
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

function capFirstLetter(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// function fetchAPI(requestURL){
//   fetch(requestURL)
//     .then(function(response){
//       if (response.ok) {
//         response.json().then(function(data){
//           // console.log(data);
//           return data;
//         })
//       }
//     })
// }

function displayToday(city,data){
  var $cityNameEl = document.createElement("h1");
  var $currentDescriptionEl = document.createElement("h2");
  var $currentTempEl = document.createElement("p");
  var $currentWindEl = document.createElement("p");
  var $currentHumidityEl = document.createElement("p");
  var $currentUVEl = document.createElement("p");
  var $currentWeatherIconEl = document.createElement("img");
  
  $cityNameEl.textContent = capFirstLetter(city)+" "+moment().format("(MM/DD/YYYY)");;
  $currentDescriptionEl.textContent = capFirstLetter(data.current.weather[0].description);
  $currentTempEl.textContent = "Temp: "+data.current.temp+ " ºF";
  $currentWindEl.textContent = "Wind: "+data.current.wind_speed+" MPH";
  $currentHumidityEl.textContent = "Humidity: "+data.current.humidity+" %";
  $currentUVEl.textContent = "UVEl: "+data.current.uvi;

  $currentWeatherIconEl.src = "https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png";
  $currentWeatherIconEl.classList.add("icon");

  $todayEl.classList.add("card");
  $todayEl.appendChild($cityNameEl);
  $cityNameEl.appendChild($currentWeatherIconEl);
  $todayEl.appendChild($currentDescriptionEl);
  $todayEl.appendChild($currentTempEl);
  $todayEl.appendChild($currentWindEl);
  $todayEl.appendChild($currentHumidityEl);
  $todayEl.appendChild($currentUVEl);

  displayFiveDay(data);
}

function displayFiveDay(data){
  console.log(data);
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
    $tempEl.textContent = "Temp: "+data.daily[i].temp.max;
    $windEl.textContent = "Temp: "+data.daily[i].wind_speed;
    $humidityEl.textContent = "Temp: "+data.daily[i].humidity;
  
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
  

// displayFiveDay()

cityFormEl.addEventListener("submit", formSubmitHandler);
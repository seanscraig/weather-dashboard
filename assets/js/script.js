var todayEl = document.getElementById("today");
var cityFormEl = document.getElementById("city-form");
var cityEl = document.getElementById("city");
var searchBtnEl = document.getElementById("searchBtn");

var todayDate = moment().format("(MM/DD/YYYY)");

// debug data
var cityName = "Chicago";
var currentTemp = 74.01;
var currentWind = 6.67;
var currentHumidity = 46;
var currentUV = 0.47;

const APIKey = "17df62e6c611e766e40ad0ad3ee5ec14";

function formSubmitHandler(event) {
  event.preventDefault();

  // var cityName = cityEl.value.trim();
  // if (cityName === null) {
  //   console.log("error");
  //   return;
  // } else {
  //   console.log(cityName);
  // }
};

function displayToday(){
  var $cityNameEl = document.createElement("h1");
  var $currentTempEl = document.createElement("p");
  var $currentWindEl = document.createElement("p");
  var $currentHumidityEl = document.createElement("p");
  var $currentUVEl = document.createElement("p");


  $cityNameEl.textContent = cityName+" "+todayDate;
  $currentTempEl.textContent = "Temp: "+currentTemp;
  $currentWindEl.textContent = "Wind: "+currentWind;
  $currentHumidityEl.textContent = "Humidity: "+currentHumidity;
  $currentUVEl.textContent = "UVEl: "+currentUV;

  todayEl.classList.add("card");
  todayEl.appendChild($cityNameEl);
  todayEl.appendChild($currentTempEl);
  todayEl.appendChild($currentWindEl);
  todayEl.appendChild($currentHumidityEl);
  todayEl.appendChild($currentUVEl);

}

displayToday();
// cityFormEl.addEventListener('submit', formSubmitHandler());
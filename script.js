function formatDate(timestamp){
  let date = new Date (timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Frijday", "Saturday"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;


}

function displayTemperature(response){
let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let dateElement = document.querySelector("#date");
let iconElement = document.querySelector("#icon");

celsiusTemperature=response.data.main.temp;

temperatureElement.innerHTML = Math.round(celsiusTemperature);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed);
dateElement.innerHTML = formatDate(response.data.dt * 1000);
iconElement = setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);
}

function getForecast(coordinates) {
  let urlBase = "https://api.openweathermap.org/data/2.5/onecall?";
  let apiKey = "c73239399918e583c389935335c11e48";
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiUrl = `${urlBase}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}


function search (city) {
  let apiKey = "c73239399918e583c389935335c11e48";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
event.preventDefault();
let cityInputElement = document.querySelector("#city-input");
search(cityInputElement.value);
}
let celsiusTemperature=null;
let fahrenheitTemperature=(celsiusTemperature * 9)/5+32;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayFahrenheitTemperature(event){
  event.preventDefault();
  let temperatureElement=document.querySelector("temperature");
  temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML=Math.round(celsiusTemperature);
}
function showCity(response) {
  let respondedCity = response.data.city;
  let city = document.querySelector("#city");
  city.innerHTML = respondedCity;
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c73239399918e583c389935335c11e48";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherConditions);
  let reverseApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
  axios.get(reverseApiUrl).then(showCity);
}

function getCurrentPosition() {
  if (navigator.geolocation){
  navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    "Sorry, we couldn't find your current position. Please type your city, instead.";
  }
  }


let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);


let fahrenheitLink=document.querySelector("#fahrenheit-link")
fahrenheitLink.addEventListener("click",displayFahrenheitTemperature);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);


search("New York");
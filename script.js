function displayTemperature(response){
let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let dateElement = document.querySelector("#date");
let iconElement = document.querySelector("#icon");

temperatureElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed);
dateElement.innerHTML = formatDate(response.data.dt * 1000);
iconElement = setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");
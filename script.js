function displayTemperature(response){
  console.log(response.data.main.temp);
}






let apiKey = "d17fa40e825be2790f261dab24f52143";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric";
  axios.get(apiUrl).then(displayTemperature);
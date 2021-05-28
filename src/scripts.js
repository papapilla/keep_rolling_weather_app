function displaydata(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#todayTemp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp) + "°C";
  let cityElement = document.querySelector("#cityName");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#precip");
  let windElement = document.querySelector("#windspeed");
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
}

let cityname = "New York";
let APIkey = "e42384a736f7f13e78e748112d077d46";
let APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}&units=metric`;

console.log(APIurl);

axios.get(APIurl).then(displaydata);

function formatDate(timestamp) {
  //calculate the date and return something like: Friday 5:00pm
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hour}:${minutes}`;
}

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
  let dateElement = document.querySelector("#today");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  let icon = response.data.weather[0].icon;
  console.log(icon);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].descriptio);
}

let cityname = "New York";
let APIkey = "e42384a736f7f13e78e748112d077d46";
let APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}&units=metric`;

console.log(APIurl);

axios.get(APIurl).then(displaydata);

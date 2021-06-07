search("Paris"); //aqui tengo que ver como integrar la geolocalizacion
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

// this time this will not change the current but the forecast days
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecastWeather");
  let forecastHMTL = ` <div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHMTL =
        forecastHMTL +
        `              
                <div class="col">
                  <div class="day1">${formatDay(forecastDay.dt)}</div>
                  <div><img src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="50"></img></div>
                  <span class="day1-temp" id="temp">${Math.round(
                    forecastDay.temp.max
                  )}°</span>/
                  <span class="day1-temp" id="tempMax">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>`;
    }
  });
  forecastHMTL += `</div>`;
  forecastElement.innerHTML = forecastHMTL;
  //console.log(forecastHMTL);
}
function getLocation(response) {
  let coordinates = response.coord;
  let time = response.dt;
  let APIkey = "e42384a736f7f13e78e748112d077d46";
  let APIurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${APIkey}&units=metric`;
  console.log(APIurl);
  axios.get(APIurl).then(displayForecast);
}
function displaydata(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#todayTemp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp) + "°C";
  let cityElement = document.querySelector("#cityName");
  celciusTemperature = response.data.main.temp;

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

  //displayForecast();
  getLocation(response.data);
}

function search(city) {
  let APIkey = "e42384a736f7f13e78e748112d077d46";
  let APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;
  axios.get(APIurl).then(displaydata);
}
function handlesubmit(event) {
  event.preventDefault(); //prevents the page to reload
  let cityInputElement = document.querySelector("#searchInput");
  search(cityInputElement.value);
  console.log(cityInputElement);
}

let celciusTemperature = null;

let form = document.querySelector("#search-Form");
form.addEventListener("submit", handlesubmit);

function updateWeather(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = response.data.main.temp;
  let currentCityElement = document.querySelector("#current-city");
  let currentWeatherElement = document.querySelector("#current-weather-type");
  let currentHumidityElement = document.querySelector("#current-humidity");
  let currentWindElement = document.querySelector("#current-wind");
  let currentTimeElement = document.querySelector("#current-time");
  let date = new Date(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");

  currentCityElement.innerHTML = `${response.data.name}`;
  temperatureElement.innerHTML = Math.round(temperature);
  currentWeatherElement.innerHTML = response.data.weather[0].main;
  currentHumidityElement.innerHTML = response.data.main.humidity;
  currentWindElement.innerHTML = response.data.wind.speed;
  currentTimeElement.innerHTML = formatDate(date);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "62231151ce343c4d68652e1617efc22f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function controlSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", controlSearchSubmit);

searchCity("London");
///forecast///

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "62231151ce343c4d68652e1617efc22f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forecastHtml = "";

  forecast.forEach(function (day, index) {
    console.log(day);
    if (index < 7) {
      forecastHtml =
        forecastHtml +
        `
  <div class="row">
    <div class="col-2 column">
      <div class="weather-forecast-date">${formatDay(day.dt)}</div>
     <img
        src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png""
        width="70px"
      />
      <div class="weather-forecast-temperature">
        <span class="weather-forecast-temperature-max">${Math.round(
          day.temp.max
        )}°</span>
        <div class="weather-forecast-temperature-min">${Math.round(
          day.temp.min
        )}°</div>
      </div>
    </div>
  </div>
`;
    }
  });
  forecastElement.innerHTML = forecastHtml;
  console.log(response.data.list);
}

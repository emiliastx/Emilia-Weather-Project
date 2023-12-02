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

  console.log(response.data);

  currentCityElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  temperatureElement.innerHTML = Math.round(temperature);
  currentWeatherElement.innerHTML = response.data.weather[0].main;
  currentHumidityElement.innerHTML = response.data.main.humidity;
  currentWindElement.innerHTML = response.data.wind.speed;
  currentTimeElement.innerHTML = formatDate(date);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurday",
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

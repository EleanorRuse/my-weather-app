//API Key & unit 
let apiKey = "99249e6036b7cd3ba4446e3f8c097e60";
let units = "metric";

//Search Bar 
function search(city){
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}
 
function handleSubmit(event){
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-text-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


//date and time
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

//Temperature Display 
function displayTemperature(response) {
  responseTemperature = response
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let feelsLikeElement = document.querySelector("#feel");
  let visibilityElement = document.querySelector("#visibility");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let maxElement = document.querySelector("#maxTemp");
  let minElement = document.querySelector("#minTemp");

//Celsius and Fahrenhet for current weather
  let celsiusTemperature = response.data.main.temp;
  let feelsLike = response.data.main.feels_like;

  if (selectedUnit == "C") {
      temperatureElement.innerHTML = Math.round(celsiusTemperature);
      feelsLikeElement.innerHTML = `${Math.round(feelsLike)}°`;
  } else {
      temperatureElement.innerHTML = Math.round((celsiusTemperature * 9)/5 +32);
      feelsLikeElement.innerHTML = `${Math.round((feelsLike * 9)/5 +32)}°`;
  }

  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  visibilityElement.innerHTML = response.data.visibility/100;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  maxElement.innerHTML = Math.round(response.data.main.temp_max);
  minElement.innerHTML = Math.round(response.data.main.temp_min);

  currentEmoji.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  currentEmoji.setAttribute ("alt",response.data.weather[0].description);
}

//Current Location Data API

function showcurrentLocation(position) {
  let cityInputElement = document.querySelector("#search-text-input");
  cityInputElement.value = "";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showcurrentLocation);
}

let currentButton = document.querySelector("#location-search");
currentButton.addEventListener("click", getCurrentPosition);

search("London");

//Fahrenheit and Celsius Display 
function displayFahrenheitTemperature(event){
  event.preventDefault();
  selectedUnit = "F";
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  displayTemperature(responseTemperature);
  displayForecast(responseForecast);
}

function displayCelsiusTemperature(event){
  event.preventDefault();
  selectedUnit = "C";
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  displayTemperature(responseTemperature);
  displayForecast(responseForecast);
}

let fahrenheitLink = document.querySelector("#fahrenhiet-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let selectedUnit = "C";

//Forecast weather
function displayForecast(response) {
  responseForecast = response;
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    let temp_max = null;
    let temp_min = null;
    if (selectedUnit == "C") {
      temp_max = Math.round(forecast.main.temp_max);
      temp_min = Math.round(forecast.main.temp_min);
    } else {
      temp_max = Math.round((forecast.main.temp_max * 9) / 5 + 32);
      temp_min = Math.round((forecast.main.temp_min * 9) / 5 + 32);
    }
    forecastElement.innerHTML += `
      <div class="col-12 col-sm-2">
        <h3>
          ${formatHours(forecast.dt * 1000)}
        </h3>
        <img src="https://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png" />
        <div class="weather-forecast-temperature">
          <strong>${temp_max}°</strong> <small>${temp_min}°</small>
        </div>
      </div>
`;
  }
}
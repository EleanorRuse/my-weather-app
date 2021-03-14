//Set up to automatically update page with current location

//search engine
let apiKey = "99249e6036b7cd3ba4446e3f8c097e60";

function defineCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-text-input").value;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric
   `
    )
    .then(updateWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", defineCity);

//Both Weather Update API

function updateWeather(response) {
  let cityName = document.querySelector("h1");
  let conditionBox = document.querySelector("#description");
  let tempResult = document.querySelector("#temperature");
  let windResult = document.querySelector("#wind");
  let humidityResult = document.querySelector("#humid");
  let maxTempResult = document.querySelector("#max");
  let minTempResult = document.querySelector("#min");
  let feelResult = document.querySelector("#feel");
  let currentEmoji = document.querySelector ("#currentEmoji");

  let temperatureRounded = Math.round(response.data.main.temp);

  cityName.innerHTML = response.data.name;
  conditionBox.innerHTML = response.data.weather[0].description;
  tempResult.innerHTML = `${temperatureRounded}`;
  humidityResult.innerHTML = ` ${response.data.main.humidity}%`;
  maxTempResult.innerHTML = Math.round(response.data.main.temp_max);
  minTempResult.innerHTML = Math.round(response.data.main.temp_min);
  windResult.innerHTML = Math.round(response.data.wind.speed);
  feelResult.innerHTML = Math.round(response.data.main.feels_like);
  currentEmoji.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  currentEmoji.setAttribute ("alt", response.data.weather[0].description);
}

//days of the week


function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(updateWeather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

//Display Date & Last Update
function formatDate(fullDate) {

let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
if (hour < 10) {
  hour = `0 ${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0 ${minute}`;
}

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[now.getMonth()];

  let h4 = document.querySelector("h4");
  let h5 = document.querySelector("h5");

  h4.innerHTML = `${day} ${date} ${month} ${year}`;
  h5.innerHTML = `Last Updated: ${hour}:${minute}`;
}
formatDate();

//Celsius to Fahrenheit

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = (temperature * 9) / 5 + 32;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

//Expanding weekday
const panels = document.querySelectorAll(".panel");

panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    removeActiveClasses();
    panel.classList.add("active");
  });
});

function removeActiveClasses() {
  panels.forEach((panel) => {
    panel.classList.remove("active");
  });
}

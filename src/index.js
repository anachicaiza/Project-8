function change(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-img" />`;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  getForecast(response.data.city);
}

function search(event) {
  event.preventDefault();
  let searchElement = document.querySelector("#search-input");
  let city = searchElement.value;

  let apiKey = "b739b64actfb7710ab2aa8f6044o4c38";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(change);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${formattedDay} ${hours}:${minutes}`;
}
let currentDateInput = document.querySelector("#current-date");
let currentDate = new Date();
currentDateInput.innerHTML = formatDate(currentDate);

function getForecast(city) {
  let apiKey = "b739b64actfb7710ab2aa8f6044o4c38";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml += ` 
    <div class="weather-forecast-day">
      <div class="forecast-date">${day}</div>
      <div class="image">
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          width="36"
        />
      </div>
      <div class="forecast-temperatures">
        <span class="temperature-max">18°</span>
        <span class="temperature-min">12°</span>
      </div>
  </div>
`;
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

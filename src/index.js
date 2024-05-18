function refreshWeather(response) {
  console.log(response.data.temperature.current);
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let windSpeedElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img  src="${response.data.condition.icon_url}"  class="weather-app-icon" ></img>`;

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);

  getForecast(response.data.city);

  // console.log(response.data);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hour = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesdday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes},`;
}

function searchCity(city) {
  //make api call adn update interface
  //Separation of concern
  let apiKey = "f3t8e4a1a6ba9e7f04b3064e10efo014";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function getForecast(city){

  let apiKey = "f3t8e4a1a6ba9e7f04b3064e10efo014";
  apiUrl =
    `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    // console.log(apiUrl);
    axios(apiUrl).then(displayForecast);

}

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response.data);

  // let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {

    if(index < 5)
      {
        forecastHtml =
          forecastHtml +
          `   
 <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <div >
          <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        </div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}</div>
        </div>
      </div>
 `;
  }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");


// displayForecast();

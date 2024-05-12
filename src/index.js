function refreshWeather(response) {
  console.log(response.data.temperature.current);
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let windSpeedElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000) ;

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);

}

function formatDate(date)
{
  let minutes = date.getMinutes();
  let hour = date.getHours();
  let days = ["Sunday", "Monday", "Tuesdday", "Wednesday", "Thursday", "Friday", "Saturday"];


  let day = days[date.getDay()];
  if(minutes < 10)
    {
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");

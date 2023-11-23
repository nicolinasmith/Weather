import { getWeather, getCity } from './api.js';

const currentWeather = document.getElementById('current');
const date = document.getElementById('current-date');
const time = document.getElementById('current-time');
const weatherIcon = document.getElementById('weather-icon');
const weatherCondition = document.getElementById('weather-condition');
const temperature = document.getElementById('temperature');
const temperatureFeelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity-value');
const wind = document.getElementById('wind-value');
const cloud = document.getElementById('cloud-value');

const setLocation = document.getElementById('location');
const chosenLocation = document.getElementById('chosen-location');
const choseLocation = document.getElementById('chose-location');
const locationInput = document.getElementById('location-input');
const locationSuggestions = document.getElementById('location-suggestions');
const locationInputClose = document.querySelector('#header-chose-location button');

const forecastTemp1 = document.getElementById('temp-1');
const forecastTemp2 = document.getElementById('temp-2');
const forecastTemp3 = document.getElementById('temp-3');
const forecastTemp4 = document.getElementById('temp-4');
const forecastTemp5 = document.getElementById('temp-5');

const forecastCondition1 = document.getElementById('condition-1');
const forecastCondition2 = document.getElementById('condition-2');
const forecastCondition3 = document.getElementById('condition-3');
const forecastCondition4 = document.getElementById('condition-4');
const forecastCondition5 = document.getElementById('condition-5');

let city = {
  name: 'Stockholm',
  longitude: 18.0686,
  latitude: 59.3293
};

chosenLocation.textContent = city.name;

getCurrentDate();
getCurrentTime();
getCurrentWeather(city);

function getCurrentDate() {

    const now = new Date();
    const month = now.getMonth();
    const months = [
        'januari', 'februari', 'mars', 'april', 'maj', 'juni',
        'juli', 'augusti', 'september', 'oktober', 'november', 'december'
      ];

    date.textContent = 'Idag' + ' ' + now.getDate() + ' ' + months[month];
}

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const correctMinutes = (minutes < 10) ? '0' + minutes : minutes;
    time.textContent = hours + ':' + correctMinutes;
}

async function getCurrentWeather(city) {

  const weatherData = await getWeather(city);
  displayForecastWeather(weatherData.forecast);

  weatherIcon.src = weatherData.current.condition.icon;
  weatherCondition.textContent = weatherData.current.condition.text;
  temperature.textContent = weatherData.current.temp_c + '°';
  temperatureFeelsLike.textContent = 'Känns som ' + weatherData.current.feelslike_c + '°';

  humidity.textContent = weatherData.current.humidity + '%';
  wind.textContent = Math.round(weatherData.current.wind_kph) + ' km/h';
  cloud.textContent = weatherData.current.cloud + '%';
}

function displayForecastWeather(forecastData) {

  forecastTemp1.textContent = forecastData.forecastday[1].day.avgtemp_c + '°';
  forecastTemp2.textContent = forecastData.forecastday[2].day.avgtemp_c + '°';
  forecastTemp3.textContent = forecastData.forecastday[3].day.avgtemp_c + '°';
  forecastTemp4.textContent = forecastData.forecastday[4].day.avgtemp_c + '°';
  forecastTemp5.textContent = forecastData.forecastday[5].day.avgtemp_c + '°';

  forecastCondition1.textContent = forecastData.forecastday[1].day.condition.text;
  forecastCondition2.textContent = forecastData.forecastday[2].day.condition.text;
  forecastCondition3.textContent = forecastData.forecastday[3].day.condition.text;
  forecastCondition4.textContent = forecastData.forecastday[4].day.condition.text;
  forecastCondition5.textContent = forecastData.forecastday[5].day.condition.text;

}

setInterval(getCurrentTime, 1000);

setLocation.addEventListener('click', () => {
    choseLocation.style.display = 'block';
    locationInput.focus();
    locationInput.value = chosenLocation.textContent;
 });

locationInput.addEventListener('input', async () => {
    const searchLocation = locationInput.value;
    const searchSuggestions = await getCity(searchLocation);

    locationSuggestions.innerHTML = '';
    searchSuggestions.forEach(city => {
      const suggestionElement = document.createElement('p');
      suggestionElement.textContent = `${city.name} (${city.adminName1})`;
      suggestionElement.classList.add('suggestion-style');
      locationSuggestions.appendChild(suggestionElement);

      suggestionElement.addEventListener('click', () => {
        chosenLocation.textContent = city.name;
        choseLocation.style.display = 'none';
        locationInput.value = '';
        getCurrentWeather(city);
      });
    });
 });

locationInputClose.addEventListener('click', () => {
    choseLocation.style.display = 'none';
 });

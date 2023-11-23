import { getWeather, getCity } from './api.js';

const currentWeather = document.getElementById('current');
const date = document.getElementById('current-date');
const time = document.getElementById('current-time');
const weatherIcon = document.getElementById('weather-icon');
const weatherCondition = document.getElementById('weather-condition');
const temperature = document.getElementById('temperature');
const temperatureFeelsLike = document.getElementById('feels-like');

const setLocation = document.getElementById('location');
const chosenLocation = document.getElementById('chosen-location');
const choseLocation = document.getElementById('chose-location');
const locationInput = document.getElementById('location-input');
const locationSuggestions = document.getElementById('location-suggestions');
const locationInputClose = document.querySelector('#header-chose-location button');

let city = 'Stockholm';
chosenLocation.textContent = city;

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

  weatherIcon.src = weatherData.current.condition.icon;
  weatherCondition.textContent = weatherData.current.condition.text;
  temperature.textContent = weatherData.current.temp_c + '°';
  temperatureFeelsLike.textContent = 'Känns som ' + weatherData.current.feelslike_c + '°';
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
    searchSuggestions.forEach(suggestion => {
      const suggestionElement = document.createElement('p');
      suggestionElement.textContent = `${suggestion.name} (${suggestion.adminName1})`;
      suggestionElement.classList.add('suggestion-style');
      locationSuggestions.appendChild(suggestionElement);

      suggestionElement.addEventListener('click', () => {
        chosenLocation.textContent = suggestion.name;
        choseLocation.style.display = 'none';
        locationInput.value = '';
        getCurrentWeather(suggestion.name);
      });
    });
 });

locationInputClose.addEventListener('click', () => {
    choseLocation.style.display = 'none';
 });

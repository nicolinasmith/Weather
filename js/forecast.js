import { getWeather, getCity } from './api.js';

const selectedDate = localStorage.getItem('selectedDate');
let chosenCity = {
  name: localStorage.getItem('chosenCityName') || 'Stockholm',
  longitude: localStorage.getItem('chosenCityLongitude') || 18.0686,
  latitude: localStorage.getItem('chosenCityLatitude') || 59.3293
};

const backButton = document.querySelector('.fa-chevron-left');
const forecastMenu = document.querySelectorAll('#forecast-days div:not(.separator-small)');

const setLocation = document.getElementById('location');
const chosenLocation = document.getElementById('chosen-location');
const choseLocation = document.getElementById('chose-location');
const locationText = document.querySelector('#chose-location i');
const locationInput = document.getElementById('location-input');
const locationSuggestions = document.getElementById('location-suggestions');
const locationInputClose = document.querySelector('#header-chose-location button');
const forecastContainer = document.getElementById('forecast-container');
const forecastDate = document.getElementById('forecast-date');

chosenLocation.textContent = chosenCity.name;
getForecast(chosenCity);

setLocation.addEventListener('click', () => {
    choseLocation.style.display = 'block';
    locationInput.focus();
    locationInput.value = chosenLocation.textContent;
 });

locationInput.addEventListener('input', async () => {
    locationText.style.display = 'block';
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
        localStorage.setItem('chosenCityName', city.name);
        localStorage.setItem('chosenCityLongitude', city.longitude);
        localStorage.setItem('chosenCityLatitude', city.latitude);
        getForecast(city);
      });
    });
 });

locationInputClose.addEventListener('click', () => {
    choseLocation.style.display = 'none';
 });

 async function getForecast(city) {
    const weatherData = await getWeather(city);
    console.log(weatherData.forecast.forecastday);
    displayDayMeny(weatherData.forecast.forecastday);
    const forecastData = weatherData.forecast.forecastday[selectedDate];
    displayForecast(forecastData);
}

function displayDayMeny(forecastDays) {
    
  forecastMenu.forEach((day, index) => {
      const dayText = forecastDays[index].date.slice(8, 10);
      day.querySelector('p').textContent = dayText;

      if(index == selectedDate) {
        day.classList.add('selected-day');
      }
    });
}

function createCorrectDate(dateString) {

    const date = new Date(dateString);
    const dayIndex = date.getDay();

    const months = [
      'januari', 'februari', 'mars', 'april', 'maj', 'juni',
      'juli', 'augusti', 'september', 'oktober', 'november', 'december'
    ];

    const days = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];

    const weekday = days[dayIndex];
    const day = dateString.slice(8, 10);
    const month = dateString.slice(5, 7);

    const correctDate = weekday + ' ' + day + ' ' + months[month-1];
    return correctDate;

}

function displayForecast(forecastData) {

    forecastContainer.innerHTML = '';
    
    forecastDate.textContent = createCorrectDate(forecastData.date);

    const currentTime = new Date().getHours();

    if (selectedDate == 0) {
      forecastData.hour.forEach(hour => {
          const forecastHour = parseInt(hour.time.slice(11, 13));
          if (forecastHour >= currentTime) {
              const hourElement = document.createElement('div');
              const forecastHourText = document.createElement('b');
              const temperature = document.createElement('p');
              const icon = document.createElement('img');
              forecastHourText.textContent = hour.time.slice(11, 16);
              temperature.textContent = hour.temp_c + '°C';
              icon.src = hour.condition.icon;
              hourElement.appendChild(forecastHourText);
              hourElement.appendChild(temperature);
              hourElement.appendChild(icon);
              hourElement.classList.add('forecast-element');
              forecastContainer.appendChild(hourElement);
          }
      });
    } 
    else {
      forecastData.hour.forEach(hour => {
          const hourElement = document.createElement('div');
          const forecastHourText = document.createElement('b');
          const temperature = document.createElement('p');
          const icon = document.createElement('img');
          forecastHourText.textContent = hour.time.slice(11, 16);
          temperature.textContent = hour.temp_c + '°C';
          icon.src = hour.condition.icon;
          hourElement.appendChild(forecastHourText);
          hourElement.appendChild(temperature);
          hourElement.appendChild(icon);
          hourElement.classList.add('forecast-element');
          forecastContainer.appendChild(hourElement);
      });
    }
}

backButton.addEventListener('click', () => {
    window.history.back();
});


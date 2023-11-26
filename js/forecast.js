import { getWeather, getCity } from './api.js';

const backButton = document.querySelector('.fa-chevron-left');

const setLocation = document.getElementById('location');
const chosenLocation = document.getElementById('chosen-location');
const choseLocation = document.getElementById('chose-location');
const locationText = document.querySelector('#chose-location i');
const locationInput = document.getElementById('location-input');
const locationSuggestions = document.getElementById('location-suggestions');
const locationInputClose = document.querySelector('#header-chose-location button');

const forecastContainer = document.getElementById('forecast-container');
const forecastDate = document.getElementById('forecast-date');

forecastDate.textContent = getCurrentDate();

function getCurrentDate() {

    const months = [
        'januari', 'februari', 'mars', 'april', 'maj', 'juni',
        'juli', 'augusti', 'september', 'oktober', 'november', 'december'
      ];
    
    const days = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
      
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDay();

    return days[day] + ' ' + now.getDate() + ' ' + months[month];
}

let city = {
    name: 'Stockholm',
    longitude: 18.0686,
    latitude: 59.3293
  };
  
chosenLocation.textContent = city.name;

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
    /*
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
    });*/
 });

locationInputClose.addEventListener('click', () => {
    choseLocation.style.display = 'none';
 });

 async function getForecast(city) {
    const weatherData = await getWeather(city);
    const forecastData = weatherData.forecast.forecastday[0];
    console.log(forecastData);
    displayForecast(forecastData);
  }

getForecast(city);

function displayForecast(forecastData) {

    const currentTime = new Date().getHours();

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

backButton.addEventListener('click', () => {
    
    window.history.back();
});
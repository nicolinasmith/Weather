import getWeather from './api.js';

const currentWeather = document.getElementById('current');
const date = document.getElementById('current-date');
const time = document.getElementById('current-time');
const weatherIcon = document.getElementById('weather-icon');
const weatherCondition = document.getElementById('weather-condition');
const temperature = document.getElementById('temperature');
const temperatureFeelsLike = document.getElementById('feels-like');

const setLocation = document.getElementById('set-location');
const choseLocation = document.getElementById('chose-location');
const locationInput = document.getElementById('location-input');
const locationInputClose = document.querySelector('#header-chose-location button');
//choseLocation.style.display = 'none';

getCurrentDate();
getCurrentTime();
getCurrentWeather();

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

async function getCurrentWeather() {

  const city = 'Stockholm';
  const thisdata = await getWeather(city);

  weatherIcon.src = thisdata.current.condition.icon;
  weatherCondition.textContent = thisdata.current.condition.text;
  temperature.textContent = thisdata.current.temp_c + '°';
  temperatureFeelsLike.textContent = 'Känns som ' + thisdata.current.feelslike_c + '°';
}

setInterval(getCurrentTime, 1000);

setLocation.addEventListener('click', () => {
    choseLocation.style.display = 'block';
    locationInput.focus();
 });

locationInputClose.addEventListener('click', () => {
    choseLocation.style.display = 'none';
 });



/*

getCity();

function getCity () {

    //http://api.geonames.org/postalCodeSearch?15132=9011&maxRows=10&username=weatherroar
    //http://www.geonames.org/export/web-services.html#search
    const url = 'https://api.geonames.org/searchJSON?q=stockholm&maxRows=10&username=demo&style=full';
    fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log('Error fetching weather data:', error);
    });
}
*/
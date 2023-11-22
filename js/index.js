const currentWeather = document.getElementById('current');
const date = document.getElementById('current-date');
const time = document.getElementById('current-time');

getCurrentDate();
getCurrentTime();

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

setInterval(getCurrentTime, 1000);
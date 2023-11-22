const currentWeather = document.getElementById('current');
const date = document.getElementById('current-date');
const time = document.getElementById('current-time');
const month = new Date().getMonth();

date.textContent = 'Idag' + ' ' + new Date().getDate() + ' ' + currentMonth(month);
time.textContent = new Date().getHours() + ':' + new Date().getMinutes();

function currentMonth(month) {

    const months = [
        'januari', 'februari', 'mars', 'april', 'maj', 'juni',
        'juli', 'augusti', 'september', 'oktober', 'november', 'december'
      ];

    return months[month];

}
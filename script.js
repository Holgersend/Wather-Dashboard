 // Assigning a unique API to a variable
const API_KEY = "daba15fa77e133f3d21659d7e16d88aa";

var apiUrl = 'https://api.openweathermap.org/data/2.5';

// DOM VARIABLES
const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');
const currentWeather = document.querySelector('.current-weather');
const forecastList = document.querySelector('.weather-cards');

// Event listener for the search button
searchBtn.addEventListener('click', function () {
    const cityName = cityInput.value.trim();
    if (cityName !== '') {
        getWeatherData(cityName);
    }
});

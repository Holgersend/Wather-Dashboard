 // Assigning a unique API to a variable
const API_KEY = "daba15fa77e133f3d21659d7e16d88aa";

var apiUrl = 'https://api.openweathermap.org/data/2.5';

// DOM VARIABLES
const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');
const currentWeather = document.querySelector('.current-weather');
const forecastList = document.querySelector('.weather-cards');


// Function to fetch current weather
function getCurrentWeather(city) {
    var currentWeatherUrl = `${apiUrl}/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            var { name, sys, main, weather, wind } = data;
            var country = sys.country;
            var temperature = main.temp;
            var humidity = main.humidity;
            var windSpeed = wind.speed;

            // Update the current weather card
            WeatherCard.innerHTML = `
                <h2>${name}, ${country}</h2>
                <p>Temperature: ${temperature}°C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
        });
}

// Function to fetch forecast weather
function getForecastWeather(city) {
    var forecastWeatherUrl = `${apiUrl}/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(forecastWeatherUrl)
        .then(response => response.json())
        .then(data => {
            var forecastList = data.list;
            forecastContainer.innerHTML = '';

            // Forecast cards
            for (let i = 0; i < forecastList.length; i += 8) {
                var forecast = forecastList[i];
                var { dt, main, weather } = forecast;
                var temperature = main.temp;
                var humidity = main.humidity;

                // Create a forecast card
                var card = document.createElement('li');
                card.classList.add('card');
                card.innerHTML = `
                    <h4>Temperature: ${temperature}°C</h4>
                    <h4>Humidity: ${humidity}%</h4>
                `;
                forecastContainer.appendChild(card);
            }
        })
        .catch(error => {
            console.error('Error fetching forecast weather data:', error);
        });
}

// Function to fetch and display weather data
function getWeather(city) {
    getCurrentWeather(city);
    getForecastWeather(city);
}

// Get the current date
function getCurrentDate() {
    var currentDate = new Date();
    return getFormattedDate(currentDate);
}

// Format a date string
function getFormattedDate(date) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}


// Event listener for form submission
var InputForm = document.getElementById('weather-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const city = cityInput.value;

    forecastContainer.style.display = 'block';

    fetchWeatherContent(city);

});

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
// Function to fetch weather data from the OpenWeatherMap API
function getWeatherData(city) {
    // Use the OpenWeatherMap API to get current weather data
    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    // Use the OpenWeatherMap API to get 5-day forecast data
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

    // Fetch current weather data
    fetch(currentWeatherURL)
        .then(response => response.json())
        .then(data => {
            // Update the current weather section
            updateCurrentWeather(data);
        });

    // Fetch 5-day forecast data
    fetch(forecastURL)
        .then(response => response.json())
        .then(data => {
            // Update the 5-day forecast section
            updateForecast(data);
        });
}

// Function to update the current weather section
function updateCurrentWeather(data) {
    // Extract relevant data from the API response
    const city = data.name;
    const date = new Date(data.dt * 1000).toLocaleDateString();
    const temperature = data.main.temp;
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;

    // Update the HTML content
    currentWeather.innerHTML = `
        <div class="details">
            <h2>${city} (${date})</h2>
            <h4>Temperature: ${temperature} K</h4>
            <h4>Wind: ${windSpeed} m/s</h4>
            <h4>Humidity: ${humidity}%</h4>
        </div>
    `;
}

// Function to update the 5-day forecast section
function updateForecast(data) {
    // Clear existing forecast cards
    forecastList.innerHTML = '';

    // Extract relevant data from the API response
    const forecastData = data.list;

    // Loop through the forecast data for the next 5 days
    for (let i = 0; i < forecastData.length; i += 8) {
        const forecast = forecastData[i];
        const date = new Date(forecast.dt * 1000).toLocaleDateString();
        const temperature = forecast.main.temp;
        const windSpeed = forecast.wind.speed;
        const humidity = forecast.main.humidity;

        // Create a new forecast card and append it to the list
        const forecastCard = document.createElement('li');
        forecastCard.classList.add('card');
        forecastCard.innerHTML = `
            <h4>${date}</h4>
            <h4>Temperature: ${temperature} K</h4>
            <h4>Wind: ${windSpeed} m/s</h4>
            <h4>Humidity: ${humidity}%</h4>
        `;
        forecastList.appendChild(forecastCard);
    }
}






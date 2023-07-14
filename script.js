 // Assigning a unique API to a variable
const API_KEY = "daba15fa77e133f3d21659d7e16d88aa";

const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const currentWeatherDiv = document.querySelector(".current-wather");
const weatherCardsDiv = document.querySelector(".weather-cards");

const createWeatherCard = (cityName, weatherItem, index) => {
    if(index === 0){
        return `<div class="details">
        <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
        <h6>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
        <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
        <h6>Humidity: ${weatherItem.main.humidity}%</h6>
    </div>
    <div class="icon">
        <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
        <h6>${weatherItem.weather[0].description}</h6>
    </div>`;
    
    } else {
        return `<li class="card">
    <h2>(${weatherItem.dt_txt.split(" ")[0]})</h2>
    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
    <h4>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
    <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
    <h4>Humidity: ${weatherItem.main.humidity}%</h4>
</li>`;
    }

}
const getWeatherDetails = (cityName, lat, lon) => {
    const WEATHER_API_URL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY;

    fetch(WEATHER_API_URL).then(res => res.json()).then(data =>{
        console.log(data);

        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if(!uniqueForecastDays.includes(forecastDate)){
                return uniqueForecastDays.push(forecastDate);
            }
        });
        
        cityInput.value = " ";
        currentWeatherDiv.innerHTML = " ";
        weatherCardsDiv.innerHTML = " ";
        
        console.log(fiveDaysForecast);
        fiveDaysForecast.forEach(weatherItem => {
            if(index === 0){
                currentWeatherDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
            }else {
                weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
            }
        });
    }).catch (() => {
        alert("error occurred while fetrching the weather forcast");
    });
}
const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();
    if(!cityName) return;

    console.log(cityName)

    const GEOCODING_API_URL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + API_KEY;

    fetch(GEOCODING_API_URL).then(res => res.json()).then(data =>{
        console.log(data)
        const { name, lat, lon} = data[0];
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("error ocurred while fetching the cordinates");
    });
}

searchButton.addEventListener("click", getCityCoordinates); 
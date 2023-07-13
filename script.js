 // Assigning a unique API to a variable
const API_KEY = "daba15fa77e133f3d21659d7e16d88aa";

const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");

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
        console.log(fiveDaysForecast);
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
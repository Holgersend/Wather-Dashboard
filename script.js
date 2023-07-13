 // Assigning a unique API to a variable
const API_KEY = "daba15fa77e133f3d21659d7e16d88aa";

const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();
    if(!cityName) return;

    console.log(cityName)

    const GEOCODING_API_URL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + API_KEY;

    fetch(GEOCODING_API_URL).then(res => res.json()).then(data =>{
        console.log(data)
    
    }).catch(() => {
        alert("error ocurred while fetching the cordinates");
    });
}

searchButton.addEventListener("click", getCityCoordinates); 
const weather = document.querySelector('.js-weather')

const API_KEY = 'e9bddd582ebeafb67b70af6a1ce5a3c5';
const COORDS = 'coords';

//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

function getWeather(lat,lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();

    }).then(function(json){
        console.log(json);
        const temp = json.main.temp;
        const place = json.name;

        weather.innerText = `${temp} °C @ ${place}`
    })
}


function saveCoords(coordsObj) {
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    console.log(position)
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    }

    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError() {
    console.log('cant access geo location')
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);

    if( loadedCoords === null ) {
        askForCoords();
        // handleGeoSuccess 는 값이 없을때만 실행

    }else {
        //get weather
        const parseCoords = JSON.parse(loadedCoords);
        console.log(parseCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude)
    }
}

function init() {
    loadCoords()
}

init()
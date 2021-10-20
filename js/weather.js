const API_KEY = "1dd8b4fd2e0d4062f8f764c455a2b559"

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;    
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    fetch(url).then(response => response.json()).then(data => {
        const city = document.querySelector("#weather span:first-child");
        const weather = document.querySelector("#weather span:last-child");
        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main} / ${Math.round(data.main.temp)}°C`;
        
        const weatherIcon = data.weather[0].icon;
        const weatherIconUrl = `http://openweathermap.org/img/w/${weatherIcon}.png`
        const iconImg = document.createElement("img")
        iconImg.id = "iconImg"
        iconImg.src = `${weatherIconUrl}`
        document.body.appendChild(iconImg);
    });
}

function onGeoError() {
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
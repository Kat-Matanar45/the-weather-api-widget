const apiKey = 'cafce6e646962bc0185b170529e26802';
const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchInput = document.querySelector('.search__box input');
const searchButton= document.querySelector('.search__box button');

const weather = document.querySelector('.weather');
const weatherIcon = document.querySelector('.weather-image i');
const error = document.querySelector('.error');

async function checkWeather(city) {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    if (response.status === 404) {
        weather.style.display = 'none';
        error.style.display = 'block';
    } else if (response.cod === '400') {
        let errorMessage = document.querySelector('.error p');
        errorMessage.textContent = 'Данные отсутствуют';
        weather.style.display = 'none';
        error.style.display = 'block';
    } else {
        const data = await response.json();
        console.log(data)

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + ' &deg;C';
        document.querySelector('.humidity').innerHTML = data.main.humidity + " %";
        document.querySelector('.wind').innerHTML = Math.round(data.wind.speed) + ' km/h';

        if (data.weather[0].main === 'Clear') {
            weatherIcon.className = 'fa-solid fa-sun';
        };
        if (data.weather[0].main === 'Rain') {
            weatherIcon.className = 'fa-solid fa-cloud-rain';
        };
        if (data.weather[0].main === 'Mist') {
            weatherIcon.className = 'fa-solid fa-cloud-mist';
        };
        if (data.weather[0].main === 'Drizzle') {
            weatherIcon.className = 'fa-solid fa-cloud-drizzle';
        }

        weather.style.display = 'block';
        error.style.display = 'none';
    } 
};

searchButton.addEventListener('click', () => {
    checkWeather(searchInput.value);
    searchInput.value = ''
});

searchInput.addEventListener('keydown', (e) => {
    if(e.keyCode === 13) {
        checkWeather(searchInput.value);
        searchInput.value = ''
    }
});



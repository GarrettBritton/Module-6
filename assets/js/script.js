function searchCity() {
    let cityInput = document.getElementById("city");
    let city = cityInput.value.trim();

    let currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c7a8304448032c1bb1ce4dba5c7a9435&units=imperial`;

    fetch(currentWeatherUrl)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function (currentData) {
            renderTodaysForecast(currentData);

            saveCityToLocalStorage(city);
        })
        .catch(function (error) {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again later.');
        });

    let forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=40&appid=c7a8304448032c1bb1ce4dba5c7a9435&units=imperial`;

    fetch(forecastUrl)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function (forecastData) {
            renderForecast(forecastData);
        })
        .catch(function (error) {
            console.error('Error fetching forecast data:', error);
            alert('Error fetching forecast data. Please try again later.');
        });
}

function displayStoredCities() {
    let citiesContainer = document.getElementById('storedCities');
    citiesContainer.innerHTML = '';


    let cities = JSON.parse(localStorage.getItem('cities')) || [];


    cities.forEach(function (city) {
        let cityButton = document.createElement('button');
        cityButton.textContent = city;
        cityButton.classList.add('stored-city-btn');
        cityButton.addEventListener('click', function () {

            document.getElementById('city').value = city;

            searchCity();
        });
        citiesContainer.appendChild(cityButton);
    });
}

function saveCityToLocalStorage(city) {

    let cities = JSON.parse(localStorage.getItem('cities')) || [];


    if (!cities.includes(city)) {

        cities.push(city);

        localStorage.setItem('cities', JSON.stringify(cities));


        displayStoredCities();
    }
}

function renderTodaysForecast(currentData) {

    let todaysForecastContainer = document.getElementById("today");
    let cityInput = document.getElementById("city");
    let city = cityInput.value.trim();
    todaysForecastContainer.innerHTML = '';

    console.log(currentData);


    let todaysForecastCard = document.createElement('div');
    todaysForecastCard.classList.add('card');


    let date = new Date(currentData.dt * 1000);
    let temperature = currentData.main.temp;
    let wind = currentData.wind.speed;
    let humidity = currentData.main.humidity;
    let weatherDescription = currentData.weather[0].description;
    let iconCode = currentData.weather[0].icon;

    let iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
    let iconImg = `<img src="${iconUrl}" alt="${weatherDescription}" />`;


    let todaysForecastContent = `
        <h2> ${city} (${date.toDateString()}) </h2>
        <div class="weather-icon">${iconImg}</div>
        <p>Temperature: ${temperature} F</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind: ${wind} MPH</p>
    `;


    todaysForecastCard.innerHTML = todaysForecastContent;


    todaysForecastContainer.appendChild(todaysForecastCard);
}

function renderForecast(forecastData) {

    let forecastContainer = document.getElementById("forecast");

    forecastContainer.innerHTML = '';

    console.log(forecastData);


    for (let i = 3; i < forecastData.list.length; i += 8) {
        let forecast = forecastData.list[i];


        let forecastCard = document.createElement('div');
        forecastCard.classList.add('card');


        let date = new Date(forecast.dt * 1000);
        let temperature = forecast.main.temp;
        let wind = forecast.wind.speed;
        let humidity = forecast.main.humidity;
        let weatherDescription = forecast.weather[0].description;
        let iconCode = forecast.weather[0].icon;

        let iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
        let iconImg = `<img src="${iconUrl}" alt="${weatherDescription}" />`;


        let forecastContent = `
            <p>${date.toDateString()}</p>
            <div class="weather-icon">${iconImg}</div>
            <p>Temperature: ${temperature} F</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind: ${wind} MPH</p>
        `;


        forecastCard.innerHTML = forecastContent;


        forecastContainer.appendChild(forecastCard);
    }
}

document.addEventListener('DOMContentLoaded', function () {

    displayStoredCities();


    let submitBtn = document.getElementById("submit");


    submitBtn.addEventListener('click', function (event) {
        event.preventDefault();


        searchCity();
    });
});







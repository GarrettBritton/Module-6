function searchCity() {
    let cityInput = document.getElementById("city");
    let city = cityInput.value.trim(); // Trim any leading/trailing whitespace

    // Construct the API URL for 5-day forecast (daily forecast)
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&appid=c7a8304448032c1bb1ce4dba5c7a9435&units=imperial`;

    fetch(apiUrl)
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
            alert('Error fetching weather data:', error);
        });
}

function renderForecast(forecastData) {
    // Get the forecast container element from the DOM
    let forecastContainer = document.getElementById("forecast");
    // Clear any previous forecast data
    forecastContainer.innerHTML = '';

    // Loop through the forecast data list
    forecastData.list.forEach(function (forecast) {
        // Create a div for each forecast item (card)
        let forecastCard = document.createElement('div');
        forecastCard.classList.add('card'); // Add a class for styling

        // Extract necessary data from the forecast object (example: date, temperature, weather description, etc.)
        let date = new Date(forecast.dt * 1000); // Convert timestamp to date object
        let temperature = forecast.main.temp;
        // let description = forecast.weather[0].description;
        let wind = forecast.wind.speed;
        let humidity = forecast.main.humidity;

        // Create HTML structure for each forecast card
        let forecastContent = `
            <p>Date: ${date.toDateString()}</p>
            <p>Temperature: ${temperature} F</p>
            <p>Humidity: ${humidity}%<p>
            <p>Wind: ${wind} MPH<p>
        `;

        // <p>Description: ${description}</p>

        // Set the HTML content of the forecast card
        forecastCard.innerHTML = forecastContent;

        // Append forecast card to forecast container
        forecastContainer.appendChild(forecastCard);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Get the submit button by ID
    let submitBtn = document.getElementById("submit");

    // Add click event listener to the submit button
    submitBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission

        // Call your searchCity function
        searchCity();
    });
});




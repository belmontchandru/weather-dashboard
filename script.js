document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "13c8537140a918df1aa1b90fc7f2c1d4";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    const searchBox = document.querySelector("#location"); 
    const searchBtn = document.querySelector(".get-location-details button"); 

    async function checkWeather(city) {
        try {
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

            if (!response.ok) {
                throw new Error("City not found");
            }

            const data = await response.json();

            // Dynamically updating UI with weather data
            document.querySelector("#weather-location").innerHTML = data.name;
            document.querySelector("#weather-temperature").innerHTML = Math.round(data.main.temp) + " °C";
            document.querySelector("#condition").innerHTML = data.weather[0].description; 

        } catch (error) {
            alert("Failed to fetch weather data: " + error.message);
        }
    }

    // Fetch weather data when the button is clicked
    searchBtn.addEventListener("click", (e) => {
        e.preventDefault(); 
        checkWeather(searchBox.value);
    });
});

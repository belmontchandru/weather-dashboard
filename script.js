document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "13c8537140a918df1aa1b90fc7f2c1d4";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    const searchBox = document.querySelector("#location");
    const searchBtn = document.querySelector(".get-location-details button");
    const weatherImage = document.querySelector(".weather-image");
    const imageMap = {
        "clear sky": "./images/clear-sky-day.png",
        "few clouds": "./images/few-clouds-day.png",
        "scattered clouds": "./images/scattered-clouds-day.png",
        "broken clouds": "./images/broken-clouds-day.png",
        "shower rain": "./images/shower-rain-day.png",
        "rain": "./images/rainy-day.png",
        "thunderstorm": "./images/thunderstorm-day.png",
        "snow": "./images/snow-day.png",
        "mist": "./images/mist-day.png",
    };

    async function checkWeather(city) {
        try {
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
            if (!response.ok) {
                throw new Error("City not found");
            }

            const data = await response.json();
            document.querySelector("#weather-location").innerHTML = data.name;
            document.querySelector("#weather-temperature").innerHTML = Math.round(data.main.temp) + " °C";
            document.querySelector("#condition").innerHTML = data.weather[0].description;

            const weatherCondition = data.weather[0].description;
            const newImageSrc = imageMap[weatherCondition] || "./images/default.png";

            
            weatherImage.classList.add("fade-out"); // Fade-out current image

            setTimeout(() => {
                weatherImage.src = newImageSrc; // Change the image after the fade-out

                weatherImage.classList.remove("fade-out"); // Fade-in new image 1-second fade-out
            }, 1000);   

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

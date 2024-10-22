document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "13c8537140a918df1aa1b90fc7f2c1d4";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    const searchBox = document.querySelector("#location");
    const searchBtn = document.querySelector(".get-location-details button");
    const weatherIcon = document.querySelector("#weatherIcon");
    const weatherSection = document.querySelector(".weather");  // Select weather section to show later`
    const form = document.getElementById('locationForm');
        const locationInput = document.getElementById('location');
        const errorMessage = document.getElementById('error-message');

        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form from submitting
            if (locationInput.value.trim() === '') {
                errorMessage.style.display = 'block';
            } else {
                errorMessage.style.display = 'none';
                // Perform the search or other logic
                alert('Searching for: ' + locationInput.value);
            }
        });



    async function checkWeather(city) {
        try {
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
            if (!response.ok) {
                throw new Error("City not found");
            }

            const data = await response.json();
            document.querySelector("#weather-location").innerHTML = data.name;
            document.querySelector("#weather-temperature").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector("#condition").innerHTML = data.weather[0].description;

            // Update weather icon based on the weather condition
            switch (data.weather[0].main.toLowerCase()) {
                case "clouds":
                case "overcast clouds":
                case "few clouds":
                case "broken clouds":
                    weatherIcon.src = "images/cloudy.png";
                    break;
                case "clear":
                    weatherIcon.src = "images/clear-sky.png";
                    break;
                case "rain":
                    weatherIcon.src = "images/rain.png";
                    break;
                case "snow":
                    weatherIcon.src = "images/snow.png";
                    break;
                case "haze":
                case "mist":
                case "smoke":
                case "sand/dust whirls":
                case "fog":
                case "sand":
                case "dust":
                case "volcanic ash":
                case "squalls":
                case "tornado":
                    weatherIcon.src = "images/mist.png";
                    break;

                case "shower rain":
                case "light rain":
                case "moderate rain":
                case "heavy intensity rain":
                case "very heavy rain":
                case "extreme rain":
                case "freezing rain":
                case "light intensity shower rain":
                case "heavy intensity shower rain":
                    weatherIcon.src = "images/shower-rain.png";
                    break;
                case "scattered clouds":
                    weatherIcon.src = "images/scattered-clouds.png";
                    break;
                case "thunderstorms":
                    weatherIcon.src = "images/thunderstorms.png";
                    break;
                default:
                    weatherIcon.src = "images/default.png";
                    break;
            }


            // Show the weather section after successful data fetch
            weatherSection.style.display = "block";

        } catch (error) {
            alert("couldn't find city,please enter correct city" + error.message);
        }
    }

    // Fetch weather data when the button is clicked
    searchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        checkWeather(searchBox.value);
    });
});

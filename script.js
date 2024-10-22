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

            // const newImageSrc = imageMap[weatherCondition] || "./images/default.png";
            weatherIcon.classList.add("fade-out"); // Fade-out current image
            setTimeout(() => {
                // weatherImage.src = newImageSrc; // Change the image after the fade-out
                weatherIcon.classList.remove("fade-out"); // Fade-in new image 1-second fade-out
            }, 1000);   

            weatherIcon.src = `images/${data.weather[0]["icon"]}@2x.png`;
            // weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png`;


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

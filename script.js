document.addEventListener("DOMContentLoaded", function () { 
    const apiKey = "13c8537140a918df1aa1b90fc7f2c1d4";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    const searchBox = document.querySelector("#location");
    const searchBtn = document.querySelector(".get-location-details button");
    const weatherIcon = document.querySelector("#weatherIcon");
    const weatherSection = document.querySelector(".weather");
    const form = document.getElementById('locationForm');
    const errorMessage = document.getElementById('error-message');
    const favoriteContainer = document.querySelector('.favorite-container');
    let refreshIntervalId;

    let favoriteCities = JSON.parse(localStorage.getItem('favoriteCities')) || [];
    displayFavoriteCities();

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (searchBox.value.trim() === '') {
            errorMessage.textContent = 'Please enter a city name.';
            errorMessage.style.display = 'block';
            searchBox.style.border = '2px solid red';
        } else {
            errorMessage.style.display = 'none';
            searchBox.style.border = '';
            checkWeather(searchBox.value);
            startAutoRefresh(searchBox.value);
        }
    });

    searchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (searchBox.value.trim() === '') {
            errorMessage.textContent = 'Please enter a city name.';
            errorMessage.style.display = 'block';
            searchBox.style.border = '2px solid red';
        } else {
            errorMessage.style.display = 'none';
            searchBox.style.border = '';
            checkWeather(searchBox.value);
            startAutoRefresh(searchBox.value);
        }
    });

    async function checkWeather(city) {
        try {
            const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
            if (!response.ok) {
                throw new Error("City not found");
            }

            const data = await response.json();
            document.querySelector("#weather-location").innerHTML = data.name;
            document.querySelector("#weather-temperature").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector("#condition").innerHTML = data.weather[0].description;
            weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png`;

            weatherSection.style.display = "block";
            searchBox.style.border = '';
        } catch (error) {
            errorMessage.textContent = "Couldn't find your city, please give the correct city name.";
            errorMessage.style.display = 'block';
            searchBox.style.border = '2px solid red';
        }
    }

    function startAutoRefresh(city) {
        if (refreshIntervalId) {
            clearInterval(refreshIntervalId);
        }
        refreshIntervalId = setInterval(() => {
            checkWeather(city);
        }, 60000); // Set interval for 5 minutes
    }

    document.querySelector('.favorite-btn').addEventListener('click', function () {
        const locationName = document.querySelector("#weather-location").innerHTML;
        if (locationName && !favoriteCities.includes(locationName)) {
            if (favoriteCities.length < 4) {
                favoriteCities.push(locationName);
                localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities));
                displayFavoriteCities();
            } else {
                alert("You can only add up to 4 favorite locations.");
            }
        } else {
            alert("Location is already in favorite.");
        }
    });

    function displayFavoriteCities() {
        favoriteContainer.innerHTML = '';
        if (favoriteCities.length > 0) {
            favoriteContainer.style.display = 'flex';
            favoriteCities.forEach((location, index) => {
                const favoriteItem = document.createElement('div');
                favoriteItem.className = 'favorite-item';

                const locationButton = document.createElement('button');
                locationButton.innerText = location;
                locationButton.onclick = () => alert(`Selected favorite: ${location}`);
                
                // Create the "X" mark button
                const removeButton = document.createElement('button');
                removeButton.className = 'remove-btn';
                removeButton.innerHTML = '&times;';  // Using "×" as the icon
                removeButton.onclick = () => removeFavoriteCity(index);

                favoriteItem.appendChild(locationButton);
                favoriteItem.appendChild(removeButton);
                favoriteContainer.appendChild(favoriteItem);
            });
        } else {
            favoriteContainer.style.display = 'none';
        }
    }

    function removeFavoriteCity(index) {
        favoriteCities.splice(index, 1);
        localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities));
        displayFavoriteCities();
    }
});
``
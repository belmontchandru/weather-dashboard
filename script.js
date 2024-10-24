document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "13c8537140a918df1aa1b90fc7f2c1d4";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    const searchBox = document.querySelector("#location");
    // const searchBtn = document.querySelector(".get-location-details button");
    const weatherIcon = document.querySelector("#weatherIcon");
    const weatherSection = document.querySelector(".weather");
    const form = document.getElementById('locationForm');
    const errorMessage = document.getElementById('error-message');
    const favoriteContainer = document.querySelector('.favorite-container');

    
    let favoriteCities = JSON.parse(localStorage.getItem('favoriteCities')) || [];    // Load favoriteCities from local storage
    displayFavoriteCities();

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (searchBox.value.trim() === '') {
            errorMessage.style.display = 'block';
        } else {
            errorMessage.style.display = 'none';
            checkWeather(searchBox.value);
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
            
            weatherIcon.src = `images/${data.weather[0]["icon"]}@2x.png`;

            weatherSection.style.display = "block";          //  Show weather-section after API Responce
        } catch (error) {
            alert("Couldn't find city: " + error.message);
        }
    }

        //      onclicking favorite button
    document.querySelector('.favorite-btn').addEventListener('click', function() {
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

            //      Display favorite locations
    function displayFavoriteCities() {
        favoriteContainer.innerHTML = '';               //  Clear existing favoriteCities
        if (favoriteCities.length > 0) {
            favoriteContainer.style.display = 'flex'; 
            favoriteCities.forEach(location => {
                const favoriteButton = document.createElement('button');
                favoriteButton.className = 'favorite-item';
                favoriteButton.innerText = location;
                favoriteButton.onclick = () => alert(`Selected favorite: ${location}`);
                favoriteContainer.appendChild(favoriteButton);
            });
        } else {
            favoriteContainer.style.display = 'none';               // Hide if no favoriteCities
        }
    }
});

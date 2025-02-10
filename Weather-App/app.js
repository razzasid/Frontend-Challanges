const loadingSpinner = document.getElementById("loading-spinner");
const apiKey = "62db7542e4af01f00fc416a5b6a54f00";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

async function checkWhether(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      loadingSpinner.style.display = "none";
    } else {
      let data = await response.json();
      const dataObject = {
        name: data.name,
        temp: data.main.temp,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        sky: data.weather[0].main,
      };
      loadingSpinner.style.display = "none";
      // console.log(dataObject);
      displayWeatherData(dataObject);
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

function displayWeatherData(data) {
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.temp) + "°c";
  document.querySelector(".humidity").innerHTML = data.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind_speed + "km/h";

  if (data.sky == "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if (data.sky == "Clear") {
    weatherIcon.src = "images/clear.png";
  } else if (data.sky == "Rain") {
    weatherIcon.src = "images/rain.png";
  } else if (data.sky == "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (data.sky == "Mist") {
    weatherIcon.src = "images/mist.png";
  } else if (data.sky == "Snow") {
    weatherIcon.src = "images/snow.png";
  }

  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
  searchBox.value = "";
}

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

searchBtn.addEventListener("click", () => {
  if (!checkWhether(searchBox.value)) {
    loadingSpinner.style.display = "none";
  } else {
    loadingSpinner.style.display = "block";
  }
  checkWhether(searchBox.value);
});

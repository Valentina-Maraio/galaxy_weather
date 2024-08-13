<template>
  <div class="weather-card">
    <div class="input-container">
      <input
        type="text"
        v-model="city"
        placeholder="Enter city name"
        @keyup.enter="getWeather"
        class="search-input"
      />
      <button v-if="city" @click="clearInput" class="clear-button">✖</button>
    </div>
    <button @click="getWeather" class="search-button">Get Weather</button>
    <div v-if="weatherData && city.trim() !== ''">
      <h2>{{ weatherData.name }}</h2>
      <p>Temperature: {{ weatherData.main.temp }} °C</p>
      <p>Weather: {{ weatherData.weather[0].description }}</p>
      <p>Feels Like: {{ weatherData.main.feels_like}} °C</p>
      <p>Temperature MAX: {{ weatherData.main.temp_max }} °C</p>
      <p>Temperature MIN: {{ weatherData.main.temp_min }} °C</p>
      <p>Pressure: {{ weatherData.main.pressure }}</p>
      <p>Humidity: {{ weatherData.main.humidity }}</p>
      <p>Sea Level: {{ weatherData.main.sea_level }} m</p>
      <p>Ground Level: {{ weatherData.main.grnd_level }}</p>
      <p>Visibility: {{ weatherData.visibility }}</p>
      <p>Wind: {{ weatherData.wind.speed }}</p>
    </div>
  </div>
</template>
  
  <script>
import { fetchWeather } from "../services/weather";

export default {
  data() {
    return {
      city: "",
      weatherData: null,
    };
  },
  watch: {
    city(newCity) {
      if (newCity.trim() === "") {
        this.weatherData = null; // Clear weather data when input is empty
      }
    },
  },
  methods: {
    async getWeather() {
      if (this.city.trim() !== "") {
        try {
          this.weatherData = await fetchWeather(this.city);
          this.saveCity(this.city);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    },
    clearInput() {
      this.city = ""; // Clear the input field
      this.weatherData = null; // Clear the weather data
    },
    saveCity(city) {
      let cities = JSON.parse(localStorage.getItem("searchedCities")) || [];
      if (!cities.includes(city)) {
        cities.push(city);
        localStorage.setItem("searchedCities", JSON.stringify(cities));
      }
    },
  },
};
</script>
  
  <style scoped>
.weather-card {
  padding: 20px;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.input-container {
  position: relative; /* To position the clear button */
  width: 200px; /* Set the width of the container */
}

.search-input {
  padding: 10px;
  width: 100%; /* Make input take full width of the container */
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.clear-button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 18px;
}

.clear-button:hover {
  color: #333; /* Change color on hover */
}

.search-button {
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.search-button:hover {
  background-color: #555;
}
</style>
<template>
  <div class="weather-search">
    <div class="input-container">
      <input
        type="text"
        v-model="city"
        placeholder="Enter city name"
        @keyup.enter="getWeather"
        class="search-input"
      />
      <button v-if="city" @click="clearInput" class="clear-button">✖</button>
      <button @click="getWeather" class="search-button">Get Weather</button>
    </div>
    <Card :weatherData="weatherData" :forecastData="forecastData" :city="city" />
  </div>
</template>

    
    <script>
  import { fetchWeather, fetchForecast } from "../services/weather"; // Import both functions
import Card from './Card'

export default {
  components: {
    Card,
  },
  data() {
    return {
      city: "",
      weatherData: null,
      forecastData: null, // Add forecastData to the data object
    };
  },
  methods: {
    async getWeather() {
      if (this.city.trim() !== "") {
        try {
          this.weatherData = await fetchWeather(this.city);
          this.forecastData = await fetchForecast(this.city); // Fetch forecast data
          this.saveCity(this.city);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    },
    clearInput() {
      this.city = ""; // Clear the input field
      this.weatherData = null; // Clear the weather data
      this.forecastData = null; // Clear the forecast data
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
.weather-search {
  display: flex; /* Use flexbox for layout */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  padding: 20px;
  border-radius: 5px;
  flex-direction: column;
}

.input-container {
  display: flex; /* Use flexbox for layout */
  align-items: center; /* Vertically center items */
  width: 100%; /* Full width */
  max-width: 500px; /* Limit the maximum width for better appearance */
}

.search-input {
  flex: 1; /* Allow input to grow and take available space */
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
}

.clear-button {
  margin-left: -30px; /* Adjust position to overlap input */
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 18px;
  z-index: 1; /* Ensure it appears above input */
}

.clear-button:hover {
  color: #333; /* Change color on hover */
}

.search-button {
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.search-button:hover {
  background-color: #555;
}
  </style>
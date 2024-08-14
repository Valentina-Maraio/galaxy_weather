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
  </div>
  <Card :weatherData="weatherData" :city="city" />
</template>
  
  <script>
import { fetchWeather } from "../services/weather";
import Card from './Card'

export default {
  components: {
    Card,
  },
  data() {
    return {
      city: "",
      weatherData: null,
    };
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
.weather-search {
  padding: 20px;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.input-container {
  display: flex; /* Use flexbox for layout */
  align-items: center; /* Vertically center items */
  width: 100%; /* Full width */
}

.search-input {
  flex: 1; /* Allow input to grow and take available space */
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
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
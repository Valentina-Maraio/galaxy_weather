<template>
  <div id="app">
    <Menu @city-selected="fetchWeatherData" />
    <Search />
    <WeatherWidget       v-if="showWidget"
      :weatherData="weatherData"
      :city="selectedCity"
      @close-widget="handleCloseWidget" />
  </div>
</template>

<script>
import axios from 'axios';
import Menu from './components/Menu.vue';
import WeatherWidget from './components/WeatherWidget.vue';
import Search from './components/Search.vue';
import { useRuntimeConfig } from '#app';

export default {
  data() {
    return {
      weatherData: null,
      selectedCity: '',
      showWidget: false // Add a state variable to control widget visibility
    };
  },
  methods: {
    async fetchWeatherData(city) {
      // Reset the data
      this.weatherData = null;
      this.selectedCity = '';

      // Set the new city and show the widget
      this.selectedCity = city;
      this.showWidget = true;
      
      const config = useRuntimeConfig();
      const apiKey = config.public.apiKey;
      
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            q: city,
            appid: apiKey,
            units: 'metric'
          }
        });
        this.weatherData = response.data;
      } catch (error) {
        console.error('Error fetching weather data:', error);
        if (error.response) {
          alert(`Failed to fetch weather data: ${error.response.data.message}`);
        } else if (error.request) {
          alert('Failed to fetch weather data. No response received.');
        } else {
          alert('Failed to fetch weather data. Please try again.');
        }
      }
    },
    handleCloseWidget() {
      this.showWidget = false; // Hide the widget when the close button is clicked
    }
  }
};
</script>
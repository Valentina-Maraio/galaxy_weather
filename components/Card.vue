<template>
  <div class="weather-widget" v-if="weatherData && city.trim() !== ''">
    <div class="header">
      <div class="time">{{ currentTime }}</div>
      <div class="location">{{ weatherData.name }}</div>
    </div>
    <div class="main-info">
      <div class="weather-status">{{ weatherData.weather[0].description }}</div>
      <div class="temperature">{{ weatherData.main.temp }}°</div>
      <div class="real-feel">/ Real Feel {{ weatherData.main.feels_like }}°</div>
    </div>
    <div class="details">
      <div class="detail-item">
        <div class="detail-icon">🌬️</div>
        <div class="detail-info">
          <div class="label">Wind</div>
          <div class="value">{{ weatherData.wind.speed }} km/h</div>
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-icon">💧</div>
        <div class="detail-info">
          <div class="label">Humidity</div>
          <div class="value">{{ weatherData.main.humidity }}%</div>
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-icon">🌡️</div>
        <div class="detail-info">
          <div class="label">Pressure</div>
          <div class="value">{{ weatherData.main.pressure }} hPa</div>
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-icon">🌡️</div>
        <div class="detail-info">
          <div class="label">Visibility</div>
          <div class="value">{{ weatherData.visibility }} hPa</div>
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-icon">🌡️</div>
        <div class="detail-info">
          <div class="label">T. MAX</div>
          <div class="value">{{ weatherData.main.temp_max }} hPa</div>
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-icon">🌡️</div>
        <div class="detail-info">
          <div class="label">T MIN</div>
          <div class="value">{{ weatherData.main.temp_min }} hPa</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <button @click="saveCity(city)" class="save-button">Save City</button>
      <p>no graph</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps } from 'vue';


// Define props for the component
const props = defineProps({
  weatherData: Object,
  city: String,
});

// Reactive state to hold the current time
const currentTime = ref('');

// Function to update the current time
const updateTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  currentTime.value = `${hours}:${minutes}`;
};

// Set up an interval to update the time every second
let intervalId;
onMounted(() => {
  updateTime(); // Set initial time
  intervalId = setInterval(updateTime, 1000); // Update time every second
});

// Clear the interval when the component is unmounted
onUnmounted(() => {
  clearInterval(intervalId);
});

// Method to save the city
const saveCity = (city) => {
  let cities = JSON.parse(localStorage.getItem("searchedCities")) || [];
  const citySet = new Set(cities); // Use a Set to handle duplicates
  if (!citySet.has(city)) {
    citySet.add(city);
    localStorage.setItem("searchedCities", JSON.stringify(Array.from(citySet)));
    alert(`${city} has been saved.`);
  } else {
    alert(`${city} is already saved.`);
  }
};
</script>

<style scoped>
.weather-widget {
  background-color: #d3e4f0;
  border-radius: 20px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: #333;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.main-info {
  text-align: center;
  margin: 20px 0;
}

.weather-status {
  font-size: 14px;
  margin-bottom: 10px;
}

.temperature {
  font-size: 48px;
  font-weight: bold;
}

.real-feel {
  font-size: 14px;
  color: #666;
}

.details {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 20px 0;
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  width: 45%;
}

.detail-icon {
  font-size: 24px;
  margin-bottom: 5px;
}

.detail-info {
  text-align: center;
}

.label {
  font-size: 12px;
  color: #666;
}

.value {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.footer {
  text-align: center;
  margin-top: 20px;
}

.save-button {
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;
}

.save-button:hover {
  background-color: #555;
}
</style>
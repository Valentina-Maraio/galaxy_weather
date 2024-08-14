<template>
  <div class="container">
    <div class="weather-widget" v-if="weatherData && city.trim() !== ''">
      <div class="content">
        <div class="header">
          <div class="location">
            <h1>{{ weatherData.name }}</h1>
          </div>
          <div class="time">
            <h2>{{ currentTime }}</h2>
          </div>
        </div>
        <div class="main-info">
          <div class="weather-status">{{ weatherData.weather[0].description }}</div>
          <div class="temperature">{{ weatherData.main.temp }} °C</div>
          <div class="real-feel">/ Real Feel {{ weatherData.main.feels_like }} °C</div>
        </div>
        <div class="details">
          <div class="detail-item">
            <div class="detail-icon">🌬️</div>
            <div class="detail-info">
              <div class="label"><h3>Wind</h3></div>
              <div class="value">{{ weatherData.wind.speed }} km/h</div>
            </div>
          </div>
          <div class="detail-item">
            <div class="detail-icon">💧</div>
            <div class="detail-info">
              <div class="label"><h3>Humidity</h3></div>
              <div class="value">{{ weatherData.main.humidity }}%</div>
            </div>
          </div>
          <div class="detail-item">
            <div class="detail-icon">🌡️</div>
            <div class="detail-info">
              <div class="label"><h3>Pressure</h3></div>
              <div class="value">{{ weatherData.main.pressure }} hPa</div>
            </div>
          </div>
          <div class="detail-item">
            <div class="detail-icon">🌡️</div>
            <div class="detail-info">
              <div class="label"><h3>Visibility</h3></div>
              <div class="value">{{ weatherData.visibility }} hPa</div>
            </div>
          </div>
          <div class="detail-item">
            <div class="detail-icon">🌡️</div>
            <div class="detail-info">
              <div class="label"><h3>Temp. Max</h3></div>
              <div class="value">{{ weatherData.main.temp_max }} hPa</div>
            </div>
          </div>
          <div class="detail-item">
            <div class="detail-icon">🌡️</div>
            <div class="detail-info">
              <div class="label"><h3>Temp. Min</h3></div>
              <div class="value">{{ weatherData.main.temp_min }} hPa</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-panel">
          <div v-if="forecastDays && forecastDays.length > 0">
            <div v-for="(day, index) in forecastDays" :key="index" class="forecast-item">
              <div class="forecast-date">{{ day.date }}</div>
              <div class="forecast-temp">{{ day.temp }} °C</div>
              <div class="forecast-description">{{ day.description }}</div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  weatherData: Object,
  forecastData: Object, // Change to Object to match the API response
  city: String,
});

const currentTime = ref('');
const forecastDays = ref([]);

// Watch for changes in forecastData and process it
watch(() => props.forecastData, (newData) => {
  if (newData && newData.list) {
    forecastDays.value = processForecastData(newData);
  } else {
    forecastDays.value = [];
  }
});

// Function to process forecast data
const processForecastData = (data) => {
  const days = {};
  data.list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!days[date]) {
      days[date] = { temp: 0, description: '', count: 0 };
    }
    days[date].temp += item.main.temp;
    days[date].description = item.weather[0].description;
    days[date].count += 1;
  });

  return Object.keys(days).map((date) => ({
    date,
    temp: (days[date].temp / days[date].count).toFixed(1),
    description: days[date].description,
  }));
};

// Update time logic
const updateTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  currentTime.value = `${hours}:${minutes}`;
};

let intervalId;
onMounted(() => {
  updateTime();
  intervalId = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

</script>

<style scoped>
html, body {
  height: 100%; /* Ensure the body takes the full height */
  margin: 0; /* Remove default margin */
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px; /* Add padding to ensure card is not at the very edge */
  box-sizing: border-box;
}

.weather-widget {
  display: flex; /* Use flexbox to align content and right panel side by side */
  background-color: #d3e4f0;
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  max-width: 900px; /* Increase max width to accommodate the right panel */
  max-height: 90vh; /* Limit the max height to 90% of the viewport */
  overflow-y: auto; /* Allow vertical scrolling if content exceeds max-height */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: #333;
  box-sizing: border-box;
}

.content {
  flex: 3; /* Allow the main content to take more space */
}

.right-panel {
  width: 300px; /* Set a fixed width for the right panel */
  border-left: 1px solid #ccc;
  padding-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.forecast-item {
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forecast-item:last-child {
  border-bottom: none; /* Remove border for the last item */
}

.forecast-date {
  font-size: 1.2em;
  font-weight: bold;
  color: #333; /* Darker color for date */
}

.forecast-temp {
  font-size: 1.5em;
  color: #ff4500; /* Orange color for temperature */
}

.forecast-description {
  font-size: 1em;
  color: #555; /* Grey color for description */
}

.header {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
}

.main-info {
  text-align: center;
  margin: 20px 0;
}

.weather-status {
  font-size: 18px;
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
  font-size: 18px;
  color: #666;
}

.value {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.forecast {
  text-align: center;
}

.forecast-day {
  margin-bottom: 10px;
}

@media (max-width: 767px) {
  .weather-widget {
    flex-direction: column; /* Stack content and right-panel vertically */
  }

  .right-panel {
    border-left: none; /* Remove left border in column layout */
    border-top: 1px solid #e0e0e0; /* Add top border for separation */
  }
}
</style>
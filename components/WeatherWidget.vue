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
                  <button @click="closeWidget" class="close-button">✖</button>
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
                      <div class="label">
                        <h3>Wind</h3>
                      </div>
                      <div class="value">{{ weatherData.wind.speed }} km/h</div>
                    </div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-icon">💧</div>
                    <div class="detail-info">
                      <div class="label">
                        <h3>Humidity</h3>
                      </div>
                      <div class="value">{{ weatherData.main.humidity }}%</div>
                    </div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-icon">🌡️</div>
                    <div class="detail-info">
                      <div class="label">
                        <h3>Pressure</h3>
                      </div>
                      <div class="value">{{ weatherData.main.pressure }} hPa</div>
                    </div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-icon">🌡️</div>
                    <div class="detail-info">
                      <div class="label">
                        <h3>Visibility</h3>
                      </div>
                      <div class="value">{{ weatherData.visibility }} hPa</div>
                    </div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-icon">🌡️</div>
                    <div class="detail-info">
                      <div class="label">
                        <h3>Temp. Max</h3>
                      </div>
                      <div class="value">{{ weatherData.main.temp_max }} hPa</div>
                    </div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-icon">🌡️</div>
                    <div class="detail-info">
                      <div class="label">
                        <h3>Temp. Min</h3>
                      </div>
                      <div class="value">{{ weatherData.main.temp_min }} hPa</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="right-panel">
                <p>no graph</p>
              </div>
            </div>
          </div>
        </template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Define props for the component
const props = defineProps({
  weatherData: Object,
  city: String,
});

// Define the emit function
const emit = defineEmits(['close-widget']);

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

// Method to close the widget
const closeWidget = () => {
  emit('close-widget'); // Emit an event to notify the parent component
};
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
  background-color: #f0f4f8;
  padding: 20px; /* Add padding to ensure card is not at the very edge */
  box-sizing: border-box;
}

.weather-widget {
  display: flex; /* Use flexbox to align content and right panel side by side */
  background-color: #d3e4f0;
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  max-width: 800px; /* Increase max width to accommodate the right panel */
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

.close-button {
  background: none;
  border: none;
  color: #ff0000;
  /* Red color for the close button */
  font-size: 24px;
  cursor: pointer;
}
</style>
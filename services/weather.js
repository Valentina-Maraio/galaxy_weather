import axios from 'axios'
import { useRuntimeConfig } from '#app'

export async function fetchWeather(city) {
  const config = useRuntimeConfig()
  const apiKey = config.public.apiKey

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}

export async function fetchForecast(city) {
  const config = useRuntimeConfig();
  const apiKey = config.public.apiKey;

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  try {
    const response = await axios.get(url);
    if (response.data && response.data.list) {
      return response.data;
    } else {
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
}
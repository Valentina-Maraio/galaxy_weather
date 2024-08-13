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
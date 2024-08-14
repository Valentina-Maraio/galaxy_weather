# Galaxy Weather - Front-End Technical Test

Welcome to the Galaxy Weather project repository. This project is a front-end application designed to provide weather information and forecasts for any location worldwide using the OpenWeatherMap API.

## Objective

The goal of this project is to develop a web application that allows users to obtain weather information, including:

- Current weather status (e.g., sunny, cloudy)
- Current temperature
- Maximum and minimum temperatures
- Atmospheric pressure
- Relative humidity
- Visibility
- Wind information

The weather information should be presented graphically, using appropriate icons for different weather conditions. Additionally, the application should allow users to store a list of previously consulted locations locally and switch between them to view the weather information and forecast for the selected location.

## Technologies Used

- **JavaScript Frameworks**: Preference is given to Vue.js, Nuxt.js
- **OpenWeatherMap API**: For accessing weather data.
- **Responsive Design**: Ensuring the application is accessible on various devices.
- **Git-Flow**: For version control and collaboration.

## Setup Instructions

To run the application locally, please follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/galaxy-weather.git

2. **Navigate to the project directory:
  ```bash
  cd galaxy-weather
  ```

**To use the api service you need an apikey.
- go to the OpenWeatherMap(https://home.openweathermap.org/users/sign_in) website and create an account
- you'll find your apikey in the Api Keys section

4.  **Create an .env file
   ```
   NUXT_PUBLIC_API_KEY=12345678910
   ```

5. **Install the dependencies:
  ```bash
  npm install
  ```

6. **Run the development server:
  ```bash
  npm run dev
  ```

7. **Access the application:

Open your web browser and go to http://localhost:3000.

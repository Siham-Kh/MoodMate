const API_KEY = '35f2c7d5374ea781b0f6ee741697cb68'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

export const fetchForecast = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};
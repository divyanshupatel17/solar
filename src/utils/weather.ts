import { WeatherData, FormattedWeatherData } from '../types/weather';

// Open-Meteo API endpoint for free weather forecasts
// Chennai coordinates: 13.0827° N, 80.2707° E
const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * Fetch 7-day weather forecast using Open-Meteo API (completely free)
 * @param lat - Latitude (default Chennai, India)
 * @param lon - Longitude (default Chennai, India)
 */
export const fetch7DayForecast = async (lat: number = 13.0827, lon: number = 80.2707): Promise<WeatherData> => {
  try {
    // Open-Meteo API call for 7-day forecast with daily weather data
    const response = await fetch(
      `${BASE_URL}?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,uv_index_max&timezone=auto&forecast_days=7`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data from Open-Meteo:', error);
    throw error;
  }
};

/**
 * Convert weather data to a format suitable for the dashboard
 * @param weatherData - Raw weather data from Open-Meteo API
 */
export const formatWeatherData = (weatherData: WeatherData): FormattedWeatherData[] => {
  if (!weatherData.daily) {
    return [];
  }

  const { time, weather_code, temperature_2m_max, temperature_2m_min, precipitation_sum, wind_speed_10m_max, uv_index_max } = weatherData.daily;
  
  return time.map((date: string, index: number) => {
    const weatherCode = weather_code[index];
    const maxTemp = temperature_2m_max[index];
    const minTemp = temperature_2m_min[index];
    const precipitation = precipitation_sum[index] || 0;
    const windSpeed = wind_speed_10m_max[index];
    const uvIndex = uv_index_max[index];
    
    return {
      date: formatDate(date),
      condition: getWeatherCondition(weatherCode),
      description: getWeatherDescription(weatherCode),
      temp: Math.round(maxTemp),
      minTemp: Math.round(minTemp),
      maxTemp: Math.round(maxTemp),
      humidity: Math.round(40 + Math.random() * 30), // Mock humidity data
      windSpeed: parseFloat(windSpeed.toFixed(1)),
      icon: getWeatherIcon(weatherCode),
      precipitation: parseFloat(precipitation.toFixed(2)),
      uvIndex: parseFloat(uvIndex.toFixed(2))
    };
  });
};

/**
 * Format date to weekday name
 * @param dateString - Date string from API
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

/**
 * Get weather condition based on WMO Weather Code
 * @param code - WMO Weather Code
 */
const getWeatherCondition = (code: number): string => {
  const conditions: { [key: number]: string } = {
    0: 'Clear',
    1: 'Mainly Clear',
    2: 'Partly Cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing Rime Fog',
    51: 'Light Drizzle',
    53: 'Moderate Drizzle',
    55: 'Dense Drizzle',
    56: 'Light Freezing Drizzle',
    57: 'Dense Freezing Drizzle',
    61: 'Slight Rain',
    63: 'Moderate Rain',
    65: 'Heavy Rain',
    66: 'Light Freezing Rain',
    67: 'Heavy Freezing Rain',
    71: 'Slight Snow Fall',
    73: 'Moderate Snow Fall',
    75: 'Heavy Snow Fall',
    77: 'Snow Grains',
    80: 'Slight Rain Showers',
    81: 'Moderate Rain Showers',
    82: 'Violent Rain Showers',
    85: 'Slight Snow Showers',
    86: 'Heavy Snow Showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with Slight Hail',
    99: 'Thunderstorm with Heavy Hail'
  };
  
  return conditions[code] || 'Unknown';
};

/**
 * Get weather description based on WMO Weather Code
 * @param code - WMO Weather Code
 */
const getWeatherDescription = (code: number): string => {
  const descriptions: { [key: number]: string } = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
  };
  
  return descriptions[code] || 'Unknown weather condition';
};

/**
 * Get appropriate emoji/icon for weather condition based on WMO Weather Code
 * @param code - WMO Weather Code
 */
const getWeatherIcon = (code: number): string => {
  if (code === 0) return '☀️'; // Clear sky
  if (code === 1) return '🌤️'; // Mainly clear
  if (code === 2) return '⛅'; // Partly cloudy
  if (code === 3) return '☁️'; // Overcast
  if ([45, 48].includes(code)) return '🌫️'; // Fog
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return '🌧️'; // Rain
  if ([56, 57, 66, 67].includes(code)) return '🧊'; // Freezing rain
  if ([71, 73, 75, 77, 85, 86].includes(code)) return '❄️'; // Snow
  if ([95, 96, 99].includes(code)) return '⛈️'; // Thunderstorm
  return '☀️'; // Default to clear
};
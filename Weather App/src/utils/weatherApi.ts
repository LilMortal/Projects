import { CurrentWeather, ForecastResponse } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'demo_key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export class WeatherApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'WeatherApiError';
  }
}

export const fetchCurrentWeather = async (city: string): Promise<CurrentWeather> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new WeatherApiError('City not found. Please check the spelling and try again.', 404);
      } else if (response.status === 401) {
        throw new WeatherApiError('API key is invalid. Please check your configuration.', 401);
      } else {
        throw new WeatherApiError('Failed to fetch weather data. Please try again later.', response.status);
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof WeatherApiError) {
      throw error;
    }
    throw new WeatherApiError('Network error. Please check your internet connection.');
  }
};

export const fetchCurrentWeatherByCoords = async (lat: number, lon: number): Promise<CurrentWeather> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new WeatherApiError('Failed to fetch weather data for your location.', response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof WeatherApiError) {
      throw error;
    }
    throw new WeatherApiError('Network error. Please check your internet connection.');
  }
};

export const fetchForecast = async (city: string): Promise<ForecastResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new WeatherApiError('City not found for forecast data.', 404);
      }
      throw new WeatherApiError('Failed to fetch forecast data.', response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof WeatherApiError) {
      throw error;
    }
    throw new WeatherApiError('Network error while fetching forecast.');
  }
};

export const fetchForecastByCoords = async (lat: number, lon: number): Promise<ForecastResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new WeatherApiError('Failed to fetch forecast data for your location.', response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof WeatherApiError) {
      throw error;
    }
    throw new WeatherApiError('Network error while fetching forecast.');
  }
};
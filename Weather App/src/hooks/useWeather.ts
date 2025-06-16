import { useState, useEffect, useCallback } from 'react';
import { 
  WeatherState, 
  CurrentWeather, 
  HourlyWeather, 
  DailyWeather, 
  TemperatureUnit 
} from '../types/weather';
import { 
  fetchCurrentWeather, 
  fetchCurrentWeatherByCoords, 
  fetchForecast, 
  fetchForecastByCoords,
  WeatherApiError
} from '../utils/weatherApi';
import { 
  processDailyForecast, 
  saveToLocalStorage, 
  getFromLocalStorage 
} from '../utils/helpers';

export const useWeather = () => {
  const [state, setState] = useState<WeatherState>({
    current: null,
    hourly: [],
    daily: [],
    loading: false,
    error: null,
  });

  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>(() => {
    const saved = localStorage.getItem('temperatureUnit');
    return (saved as TemperatureUnit) || 'celsius';
  });

  const [lastSearchedCity, setLastSearchedCity] = useState<string>(() => {
    return localStorage.getItem('lastSearchedCity') || '';
  });

  useEffect(() => {
    localStorage.setItem('temperatureUnit', temperatureUnit);
  }, [temperatureUnit]);

  useEffect(() => {
    if (lastSearchedCity) {
      localStorage.setItem('lastSearchedCity', lastSearchedCity);
    }
  }, [lastSearchedCity]);

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  };

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error }));
  };

  const loadCachedData = useCallback((city: string) => {
    const cachedCurrent = getFromLocalStorage(`weather_current_${city}`);
    const cachedForecast = getFromLocalStorage(`weather_forecast_${city}`);
    
    if (cachedCurrent && cachedForecast) {
      setState({
        current: cachedCurrent,
        hourly: cachedForecast.slice(0, 24),
        daily: processDailyForecast(cachedForecast),
        loading: false,
        error: null,
      });
      return true;
    }
    return false;
  }, []);

  const fetchWeatherByCity = useCallback(async (city: string, useCache: boolean = true) => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }

    // Try to load cached data first
    if (useCache && loadCachedData(city)) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [currentData, forecastData] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city)
      ]);

      // Cache the data
      saveToLocalStorage(`weather_current_${city}`, currentData);
      saveToLocalStorage(`weather_forecast_${city}`, forecastData.list);

      setState({
        current: currentData,
        hourly: forecastData.list.slice(0, 24),
        daily: processDailyForecast(forecastData.list),
        loading: false,
        error: null,
      });

      setLastSearchedCity(city);
    } catch (error) {
      const errorMessage = error instanceof WeatherApiError 
        ? error.message 
        : 'An unexpected error occurred. Please try again.';
      
      setError(errorMessage);
      setLoading(false);
    }
  }, [loadCachedData]);

  const fetchWeatherByCoords = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);

    try {
      const [currentData, forecastData] = await Promise.all([
        fetchCurrentWeatherByCoords(lat, lon),
        fetchForecastByCoords(lat, lon)
      ]);

      // Cache the data using city name
      const city = currentData.name;
      saveToLocalStorage(`weather_current_${city}`, currentData);
      saveToLocalStorage(`weather_forecast_${city}`, forecastData.list);

      setState({
        current: currentData,
        hourly: forecastData.list.slice(0, 24),
        daily: processDailyForecast(forecastData.list),
        loading: false,
        error: null,
      });

      setLastSearchedCity(city);
    } catch (error) {
      const errorMessage = error instanceof WeatherApiError 
        ? error.message 
        : 'Failed to fetch weather for your location.';
      
      setError(errorMessage);
      setLoading(false);
    }
  }, []);

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  const refreshWeather = useCallback(() => {
    if (lastSearchedCity) {
      fetchWeatherByCity(lastSearchedCity, false);
    }
  }, [lastSearchedCity, fetchWeatherByCity]);

  // Load last searched city on mount
  useEffect(() => {
    if (lastSearchedCity) {
      loadCachedData(lastSearchedCity);
    }
  }, [lastSearchedCity, loadCachedData]);

  return {
    ...state,
    temperatureUnit,
    lastSearchedCity,
    fetchWeatherByCity,
    fetchWeatherByCoords,
    toggleTemperatureUnit,
    refreshWeather,
  };
};
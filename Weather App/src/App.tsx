import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { Theme } from './types/weather';
import { useWeather } from './hooks/useWeather';
import { useGeolocation } from './hooks/useGeolocation';
import { getWeatherBackground, isDay } from './utils/helpers';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import HourlyForecast from './components/HourlyForecast';
import WeeklyForecast from './components/WeeklyForecast';
import TemperatureToggle from './components/TemperatureToggle';
import ThemeToggle from './components/ThemeToggle';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const {
    current,
    hourly,
    daily,
    loading,
    error,
    temperatureUnit,
    lastSearchedCity,
    fetchWeatherByCity,
    fetchWeatherByCoords,
    toggleTemperatureUnit,
    refreshWeather,
  } = useWeather();

  const {
    coordinates,
    loading: locationLoading,
    error: locationError,
    getCurrentPosition,
  } = useGeolocation();

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (coordinates) {
      fetchWeatherByCoords(coordinates.latitude, coordinates.longitude);
    }
  }, [coordinates, fetchWeatherByCoords]);

  const handleSearch = (city: string) => {
    fetchWeatherByCity(city);
  };

  const handleLocationRequest = () => {
    getCurrentPosition();
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Determine background gradient
  const backgroundGradient = current
    ? getWeatherBackground(
        current.weather[0],
        isDay(Date.now() / 1000, current.sys.sunrise, current.sys.sunset)
      )
    : 'from-blue-400 via-blue-500 to-blue-600';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} transition-all duration-1000`}>
      <div className="min-h-screen backdrop-blur-sm bg-black/10">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-white">Weather App</h1>
            
            <div className="flex items-center space-x-3">
              <TemperatureToggle
                unit={temperatureUnit}
                onToggle={toggleTemperatureUnit}
              />
              
              <ThemeToggle
                theme={theme}
                onToggle={toggleTheme}
              />
              
              {current && (
                <button
                  onClick={refreshWeather}
                  disabled={loading}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 text-white disabled:opacity-50"
                  title="Refresh weather data"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar
            onSearch={handleSearch}
            onLocationRequest={handleLocationRequest}
            loading={loading || locationLoading}
            className="mb-8"
          />

          {/* Location Error */}
          {locationError && (
            <div className="mb-6">
              <ErrorMessage
                message={locationError}
                onRetry={getCurrentPosition}
              />
            </div>
          )}

          {/* Main Content */}
          <div className="space-y-6">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <LoadingSpinner size="lg" className="mb-4" />
                  <p className="text-white/80">
                    {locationLoading ? 'Getting your location...' : 'Loading weather data...'}
                  </p>
                </div>
              </div>
            ) : error ? (
              <ErrorMessage
                message={error}
                onRetry={refreshWeather}
                className="py-20"
              />
            ) : current ? (
              <>
                {/* Current Weather */}
                <WeatherCard
                  weather={current}
                  temperatureUnit={temperatureUnit}
                />

                {/* Hourly Forecast */}
                {hourly.length > 0 && (
                  <HourlyForecast
                    forecast={hourly}
                    temperatureUnit={temperatureUnit}
                  />
                )}

                {/* Weekly Forecast */}
                {daily.length > 0 && (
                  <WeeklyForecast
                    forecast={daily}
                    temperatureUnit={temperatureUnit}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-white/80 text-lg mb-4">
                  Welcome to Weather App
                </p>
                <p className="text-white/60">
                  Search for a city or use your current location to get started
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-12 pt-8 border-t border-white/10">
            <p className="text-white/60 text-sm">
              Weather data provided by OpenWeatherMap
            </p>
            {lastSearchedCity && (
              <p className="text-white/40 text-xs mt-1">
                Last searched: {lastSearchedCity}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
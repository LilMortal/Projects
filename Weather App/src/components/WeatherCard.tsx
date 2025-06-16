import React from 'react';
import { Wind, Droplets, Gauge, Eye, Sunrise, Sunset } from 'lucide-react';
import { CurrentWeather, TemperatureUnit } from '../types/weather';
import { 
  convertTemperature, 
  getTemperatureUnit, 
  getWeatherIcon, 
  getWindDirection, 
  formatTime 
} from '../utils/helpers';

interface WeatherCardProps {
  weather: CurrentWeather;
  temperatureUnit: TemperatureUnit;
  className?: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ 
  weather, 
  temperatureUnit,
  className = '' 
}) => {
  const temperature = convertTemperature(weather.main.temp, temperatureUnit);
  const feels_like = convertTemperature(weather.main.feels_like, temperatureUnit);
  const temp_min = convertTemperature(weather.main.temp_min, temperatureUnit);
  const temp_max = convertTemperature(weather.main.temp_max, temperatureUnit);
  const unit = getTemperatureUnit(temperatureUnit);
  
  const windDirection = getWindDirection(weather.wind.deg);
  const windSpeed = Math.round(weather.wind.speed * 3.6); // Convert m/s to km/h
  
  const visibility = Math.round(weather.visibility / 1000); // Convert to km
  
  const sunrise = formatTime(weather.sys.sunrise, weather.timezone);
  const sunset = formatTime(weather.sys.sunset, weather.timezone);

  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 ${className}`}>
      {/* Location and Weather Icon */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {weather.name}
          </h2>
          <p className="text-white/70 text-sm">
            {weather.sys.country}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <img 
            src={getWeatherIcon(weather.weather[0].icon)} 
            alt={weather.weather[0].description}
            className="w-16 h-16"
          />
        </div>
      </div>

      {/* Main Temperature */}
      <div className="text-center mb-6">
        <div className="text-6xl font-light text-white mb-2">
          {temperature}{unit}
        </div>
        <p className="text-white/80 text-lg capitalize mb-1">
          {weather.weather[0].description}
        </p>
        <p className="text-white/60 text-sm">
          Feels like {feels_like}{unit}
        </p>
      </div>

      {/* High/Low Temperatures */}
      <div className="flex justify-center space-x-6 mb-6">
        <div className="text-center">
          <p className="text-white/60 text-xs uppercase tracking-wide">High</p>
          <p className="text-white font-semibold">{temp_max}{unit}</p>
        </div>
        <div className="text-center">
          <p className="text-white/60 text-xs uppercase tracking-wide">Low</p>
          <p className="text-white font-semibold">{temp_min}{unit}</p>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Wind className="w-4 h-4 text-white/60" />
            <span className="text-white/60 text-xs uppercase tracking-wide">Wind</span>
          </div>
          <p className="text-white font-semibold">
            {windSpeed} km/h {windDirection}
          </p>
        </div>

        <div className="bg-white/5 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Droplets className="w-4 h-4 text-white/60" />
            <span className="text-white/60 text-xs uppercase tracking-wide">Humidity</span>
          </div>
          <p className="text-white font-semibold">{weather.main.humidity}%</p>
        </div>

        <div className="bg-white/5 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Gauge className="w-4 h-4 text-white/60" />
            <span className="text-white/60 text-xs uppercase tracking-wide">Pressure</span>
          </div>
          <p className="text-white font-semibold">{weather.main.pressure} hPa</p>
        </div>

        <div className="bg-white/5 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Eye className="w-4 h-4 text-white/60" />
            <span className="text-white/60 text-xs uppercase tracking-wide">Visibility</span>
          </div>
          <p className="text-white font-semibold">{visibility} km</p>
        </div>

        <div className="bg-white/5 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Sunrise className="w-4 h-4 text-white/60" />
            <span className="text-white/60 text-xs uppercase tracking-wide">Sunrise</span>
          </div>
          <p className="text-white font-semibold">{sunrise}</p>
        </div>

        <div className="bg-white/5 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Sunset className="w-4 h-4 text-white/60" />
            <span className="text-white/60 text-xs uppercase tracking-wide">Sunset</span>
          </div>
          <p className="text-white font-semibold">{sunset}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
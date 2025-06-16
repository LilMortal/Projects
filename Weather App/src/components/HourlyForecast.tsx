import React from 'react';
import { HourlyWeather, TemperatureUnit } from '../types/weather';
import { 
  convertTemperature, 
  getTemperatureUnit, 
  getWeatherIcon, 
  formatTime 
} from '../utils/helpers';

interface HourlyForecastProps {
  forecast: HourlyWeather[];
  temperatureUnit: TemperatureUnit;
  className?: string;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ 
  forecast, 
  temperatureUnit,
  className = '' 
}) => {
  const unit = getTemperatureUnit(temperatureUnit);

  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4">24-Hour Forecast</h3>
      
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
        {forecast.map((hour, index) => {
          const temp = convertTemperature(hour.main.temp, temperatureUnit);
          const time = index === 0 ? 'Now' : formatTime(hour.dt);
          
          return (
            <div 
              key={hour.dt}
              className="flex-shrink-0 text-center bg-white/5 rounded-lg p-3 min-w-[80px]"
            >
              <p className="text-white/70 text-xs mb-2">
                {time}
              </p>
              
              <img 
                src={getWeatherIcon(hour.weather[0].icon)} 
                alt={hour.weather[0].description}
                className="w-8 h-8 mx-auto mb-2"
              />
              
              <p className="text-white font-semibold text-sm">
                {temp}{unit}
              </p>
              
              {hour.pop > 0.1 && (
                <p className="text-blue-300 text-xs mt-1">
                  {Math.round(hour.pop * 100)}%
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
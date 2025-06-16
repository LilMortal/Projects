import React from 'react';
import { DailyWeather, TemperatureUnit } from '../types/weather';
import { 
  convertTemperature, 
  getTemperatureUnit, 
  getWeatherIcon, 
  formatDate 
} from '../utils/helpers';

interface WeeklyForecastProps {
  forecast: DailyWeather[];
  temperatureUnit: TemperatureUnit;
  className?: string;
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ 
  forecast, 
  temperatureUnit,
  className = '' 
}) => {
  const unit = getTemperatureUnit(temperatureUnit);

  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4">7-Day Forecast</h3>
      
      <div className="space-y-3">
        {forecast.map((day, index) => {
          const tempMin = convertTemperature(day.temp_min, temperatureUnit);
          const tempMax = convertTemperature(day.temp_max, temperatureUnit);
          const date = index === 0 ? 'Today' : formatDate(new Date(day.date).getTime() / 1000);
          
          return (
            <div 
              key={day.date}
              className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0"
            >
              <div className="flex items-center space-x-3 flex-1">
                <img 
                  src={getWeatherIcon(day.weather.icon)} 
                  alt={day.weather.description}
                  className="w-10 h-10"
                />
                <div>
                  <p className="text-white font-medium">{date}</p>
                  <p className="text-white/60 text-sm capitalize">
                    {day.weather.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {day.pop > 0.1 && (
                  <div className="text-center">
                    <p className="text-blue-300 text-xs">Rain</p>
                    <p className="text-blue-300 text-sm font-medium">
                      {Math.round(day.pop * 100)}%
                    </p>
                  </div>
                )}
                
                <div className="text-right">
                  <p className="text-white font-semibold">
                    {tempMax}{unit}
                  </p>
                  <p className="text-white/60 text-sm">
                    {tempMin}{unit}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyForecast;
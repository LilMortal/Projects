import { TemperatureUnit, WeatherCondition, HourlyWeather, DailyWeather } from '../types/weather';

export const convertTemperature = (temp: number, unit: TemperatureUnit): number => {
  if (unit === 'fahrenheit') {
    return Math.round((temp * 9/5) + 32);
  }
  return Math.round(temp);
};

export const getTemperatureUnit = (unit: TemperatureUnit): string => {
  return unit === 'celsius' ? '°C' : '°F';
};

export const formatTime = (timestamp: number, timezone?: number): string => {
  const date = new Date(timestamp * 1000);
  if (timezone) {
    date.setSeconds(date.getSeconds() + timezone);
  }
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    hour12: true 
  });
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
};

export const getWeatherIcon = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

export const getWeatherBackground = (weather: WeatherCondition, isDay: boolean): string => {
  const main = weather.main.toLowerCase();
  
  if (main.includes('clear')) {
    return isDay 
      ? 'from-blue-400 via-blue-500 to-blue-600' 
      : 'from-indigo-900 via-purple-900 to-gray-900';
  } else if (main.includes('cloud')) {
    return isDay 
      ? 'from-gray-400 via-gray-500 to-gray-600' 
      : 'from-gray-700 via-gray-800 to-gray-900';
  } else if (main.includes('rain') || main.includes('drizzle')) {
    return isDay 
      ? 'from-slate-400 via-slate-500 to-slate-600' 
      : 'from-slate-600 via-slate-700 to-slate-800';
  } else if (main.includes('thunder')) {
    return 'from-gray-800 via-gray-700 to-gray-900';
  } else if (main.includes('snow')) {
    return isDay 
      ? 'from-blue-200 via-blue-300 to-blue-400' 
      : 'from-blue-900 via-indigo-900 to-gray-900';
  } else if (main.includes('mist') || main.includes('fog')) {
    return isDay 
      ? 'from-gray-300 via-gray-400 to-gray-500' 
      : 'from-gray-600 via-gray-700 to-gray-800';
  }
  
  return isDay 
    ? 'from-blue-400 via-blue-500 to-blue-600' 
    : 'from-indigo-900 via-purple-900 to-gray-900';
};

export const isDay = (current: number, sunrise: number, sunset: number): boolean => {
  return current >= sunrise && current <= sunset;
};

export const processDailyForecast = (hourlyData: HourlyWeather[]): DailyWeather[] => {
  const dailyMap = new Map<string, {
    temps: number[];
    weather: WeatherCondition;
    humidity: number[];
    wind_speed: number[];
    pop: number[];
  }>();

  hourlyData.forEach(hour => {
    const date = new Date(hour.dt * 1000).toDateString();
    
    if (!dailyMap.has(date)) {
      dailyMap.set(date, {
        temps: [],
        weather: hour.weather[0],
        humidity: [],
        wind_speed: [],
        pop: []
      });
    }
    
    const dayData = dailyMap.get(date)!;
    dayData.temps.push(hour.main.temp);
    dayData.humidity.push(hour.main.humidity);
    dayData.wind_speed.push(hour.wind.speed);
    dayData.pop.push(hour.pop);
  });

  return Array.from(dailyMap.entries()).map(([date, data]) => ({
    date,
    temp_min: Math.min(...data.temps),
    temp_max: Math.max(...data.temps),
    weather: data.weather,
    humidity: Math.round(data.humidity.reduce((a, b) => a + b, 0) / data.humidity.length),
    wind_speed: Math.round(data.wind_speed.reduce((a, b) => a + b, 0) / data.wind_speed.length),
    pop: Math.max(...data.pop)
  })).slice(0, 7);
};

export const saveToLocalStorage = (key: string, data: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
};

export const getFromLocalStorage = (key: string, maxAge: number = 10 * 60 * 1000): any => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const { data, timestamp } = JSON.parse(stored);
      if (Date.now() - timestamp < maxAge) {
        return data;
      }
    }
  } catch (error) {
    console.warn('Failed to read from localStorage:', error);
  }
  return null;
};
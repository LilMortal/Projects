import React from 'react';
import { TemperatureUnit } from '../types/weather';

interface TemperatureToggleProps {
  unit: TemperatureUnit;
  onToggle: () => void;
  className?: string;
}

const TemperatureToggle: React.FC<TemperatureToggleProps> = ({ 
  unit, 
  onToggle,
  className = '' 
}) => {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center space-x-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 text-white text-sm font-medium ${className}`}
    >
      <span className={unit === 'celsius' ? 'text-white' : 'text-white/60'}>°C</span>
      <div className="w-px h-4 bg-white/30"></div>
      <span className={unit === 'fahrenheit' ? 'text-white' : 'text-white/60'}>°F</span>
    </button>
  );
};

export default TemperatureToggle;
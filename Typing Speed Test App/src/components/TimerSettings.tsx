import React from 'react';
import { TimerDuration } from '../types';

interface TimerSettingsProps {
  duration: TimerDuration;
  onDurationChange: (duration: TimerDuration) => void;
  disabled: boolean;
}

export const TimerSettings: React.FC<TimerSettingsProps> = ({
  duration,
  onDurationChange,
  disabled,
}) => {
  const durations: TimerDuration[] = [15, 30, 60, 120];

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {durations.map((d) => (
        <button
          key={d}
          onClick={() => onDurationChange(d)}
          disabled={disabled}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            duration === d
              ? 'bg-gradient-to-r from-orange-400 to-pink-400 text-white shadow-lg shadow-orange-200'
              : 'bg-white/70 text-gray-700 hover:bg-white/90 border border-orange-200/50 shadow-sm'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
        >
          {d}s
        </button>
      ))}
    </div>
  );
};
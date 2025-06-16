import React from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeRemaining: number;
  label: string;
  isWarning?: boolean;
}

export function Timer({ timeRemaining, label, isWarning = false }: TimerProps) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
      isWarning ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
    }`}>
      <Clock className="w-4 h-4" />
      <span className="text-sm font-medium">{label}:</span>
      <span className="text-sm font-mono font-bold">
        {formatTime(minutes)}:{formatTime(seconds)}
      </span>
    </div>
  );
}
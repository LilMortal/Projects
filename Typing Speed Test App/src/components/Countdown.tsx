import React from 'react';

interface CountdownProps {
  value: number;
}

export const Countdown: React.FC<CountdownProps> = ({ value }) => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 rounded-3xl p-16 border border-orange-200/50 shadow-2xl shadow-orange-200/50">
        <div className="text-center">
          <div className="text-8xl font-bold text-gray-800 mb-4 animate-pulse">
            {value || 'GO!'}
          </div>
          <div className="text-xl text-gray-600">
            {value ? 'Get ready...' : 'Start typing!'}
          </div>
        </div>
      </div>
    </div>
  );
};
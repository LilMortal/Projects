import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-dark-600"></div>
        <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-transparent border-t-neon-cyan animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
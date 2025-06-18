import React from 'react';
import { PinCard } from './PinCard';
import type { Pin } from '../../types';

interface MasonryGridProps {
  pins: Pin[];
  onPinClick: (pin: Pin) => void;
  loading?: boolean;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({ 
  pins, 
  onPinClick, 
  loading = false 
}) => {
  if (loading && pins.length === 0) {
    return (
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 px-4 mx-auto max-w-7xl">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="break-inside-avoid mb-4">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse">
              <div 
                className="w-full bg-gray-300 dark:bg-gray-600 rounded-t-2xl"
                style={{ height: `${Math.random() * 200 + 200}px` }}
              />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 px-4 mx-auto max-w-7xl">
      {pins.map((pin) => (
        <PinCard
          key={pin.id}
          pin={pin}
          onPinClick={onPinClick}
        />
      ))}
      
      {loading && (
        <>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={`loading-${index}`} className="break-inside-avoid mb-4">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse">
                <div 
                  className="w-full bg-gray-300 dark:bg-gray-600 rounded-t-2xl"
                  style={{ height: `${Math.random() * 200 + 200}px` }}
                />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
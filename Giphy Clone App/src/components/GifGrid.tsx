import React from 'react';
import { GifData } from '../types';
import GifCard from './GifCard';

interface GifGridProps {
  gifs: GifData[];
  loading?: boolean;
}

const GifGrid: React.FC<GifGridProps> = ({ gifs, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <div 
            key={index}
            className="aspect-square bg-dark-800 rounded-2xl animate-pulse border border-dark-700"
          />
        ))}
      </div>
    );
  }

  if (gifs.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-dark-800 flex items-center justify-center">
          <span className="text-4xl">🔍</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No GIFs found</h3>
        <p className="text-gray-400">Try searching for something else</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {gifs.map((gif) => (
        <div key={gif.id} className="animate-fade-in">
          <GifCard gif={gif} />
        </div>
      ))}
    </div>
  );
};

export default GifGrid;
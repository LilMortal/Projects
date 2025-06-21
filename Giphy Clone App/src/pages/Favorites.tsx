import React from 'react';
import { Heart } from 'lucide-react';
import GifGrid from '../components/GifGrid';
import { useAppContext } from '../context/AppContext';

const Favorites: React.FC = () => {
  const { favorites } = useAppContext();

  return (
    <div className="min-h-screen bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-neon-pink/20 rounded-full mb-4">
            <Heart className="w-8 h-8 text-neon-pink fill-current" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Your Favorites</h1>
          <p className="text-gray-400 text-lg">
            {favorites.length > 0 
              ? `You have ${favorites.length} favorite GIF${favorites.length !== 1 ? 's' : ''}`
              : 'Start favoriting GIFs to see them here'
            }
          </p>
        </div>

        {/* Favorites Grid */}
        {favorites.length > 0 ? (
          <GifGrid gifs={favorites} />
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-dark-800 flex items-center justify-center">
              <Heart className="w-12 h-12 text-gray-600" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">No favorites yet</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Explore trending GIFs and click the heart icon to add them to your favorites collection.
            </p>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-neon-pink/20 hover:bg-neon-pink/30 text-neon-pink rounded-lg transition-all duration-200 font-medium"
            >
              Explore GIFs
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
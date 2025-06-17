import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ArrowLeft } from 'lucide-react';
import { useMovieContext } from '../context/MovieContext';
import MovieGrid from '../components/MovieGrid';

const Watchlist: React.FC = () => {
  const { watchlist } = useMovieContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-coral-600 hover:text-coral-700 font-medium mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-lavender-500 to-mint-500 p-3 rounded-xl">
              <Bookmark className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Watchlist</h1>
              <p className="text-gray-600">
                {watchlist.length === 0
                  ? 'No movies in your watchlist yet'
                  : `${watchlist.length} movie${watchlist.length !== 1 ? 's' : ''} saved to watch later`
                }
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        {watchlist.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Bookmark className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your watchlist is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start exploring movies and add them to your watchlist to keep track of what you want to watch.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center space-x-2 bg-coral-500 hover:bg-coral-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
            >
              <span>Discover Movies</span>
            </Link>
          </div>
        ) : (
          <MovieGrid movies={watchlist} />
        )}
      </div>
    </div>
  );
};

export default Watchlist;
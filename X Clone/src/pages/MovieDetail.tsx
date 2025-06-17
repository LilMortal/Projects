import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, Clock, Heart, Play, Users, Globe } from 'lucide-react';
import { useMovieContext } from '../context/MovieContext';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = id ? parseInt(id, 10) : 0;
  
  const {
    getMovieById,
    getGenreNames,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  } = useMovieContext();

  const movie = getMovieById(movieId);
  
  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Movie Not Found</h1>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-coral-600 hover:text-coral-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  const genreNames = getGenreNames(movie.genre_ids);
  const inWatchlist = isInWatchlist(movie.id);

  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${movie.backdrop_path})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-8 left-8 z-10">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="w-full max-w-sm mx-auto lg:max-w-none rounded-xl shadow-large"
              />
            </div>
          </div>

          {/* Movie Info */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-large p-8">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {movie.title}
              </h1>
              
              {movie.original_title !== movie.title && (
                <p className="text-lg text-gray-600 mb-4">
                  Original Title: <span className="font-medium">{movie.original_title}</span>
                </p>
              )}

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <Star className="h-5 w-5 text-yellow-600 fill-current" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{movie.vote_average.toFixed(1)}/10</div>
                    <div className="text-sm text-gray-500">Rating</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="bg-mint-100 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-mint-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{movie.vote_count.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Votes</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="bg-lavender-100 p-2 rounded-lg">
                    <Calendar className="h-5 w-5 text-lavender-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{formatDate(movie.release_date)}</div>
                    <div className="text-sm text-gray-500">Release Date</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="bg-peach-100 p-2 rounded-lg">
                    <Globe className="h-5 w-5 text-peach-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 uppercase">{movie.original_language}</div>
                    <div className="text-sm text-gray-500">Language</div>
                  </div>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {genreNames.map((genre, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-coral-100 to-peach-100 text-coral-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="flex items-center justify-center space-x-2 bg-coral-500 hover:bg-coral-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105">
                  <Play className="h-5 w-5 fill-current" />
                  <span>Watch Trailer</span>
                </button>
                
                <button
                  onClick={handleWatchlistToggle}
                  className={`flex items-center justify-center space-x-2 px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                    inWatchlist
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${inWatchlist ? 'fill-current' : ''}`} />
                  <span>{inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}</span>
                </button>
              </div>
            </div>

            {/* Overview */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Overview</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {movie.overview}
              </p>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Movie Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="font-medium text-gray-700">Popularity Score:</span>
                  <span className="ml-2 text-gray-600">{movie.popularity.toFixed(1)}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Adult Content:</span>
                  <span className="ml-2 text-gray-600">{movie.adult ? 'Yes' : 'No'}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Video Available:</span>
                  <span className="ml-2 text-gray-600">{movie.video ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Calendar, Eye } from 'lucide-react';
import { Movie } from '../types/movie';
import { useMovieContext } from '../context/MovieContext';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist, getGenreNames } = useMovieContext();
  const inWatchlist = isInWatchlist(movie.id);
  const genreNames = getGenreNames(movie.genre_ids);

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden animate-fade-in">
      <Link to={`/movie/${movie.id}`} className="block">
        {/* Poster Image */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-200">
              <Eye className="h-6 w-6 text-coral-600" />
            </div>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg flex items-center space-x-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{movie.vote_average.toFixed(1)}</span>
          </div>

          {/* Watchlist Button */}
          <button
            onClick={handleWatchlistToggle}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
              inWatchlist
                ? 'bg-coral-500 text-white'
                : 'bg-white/80 text-gray-600 hover:bg-coral-500 hover:text-white'
            }`}
          >
            <Heart className={`h-4 w-4 ${inWatchlist ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Movie Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 text-sm md:text-base line-clamp-2 mb-2 group-hover:text-coral-600 transition-colors duration-200">
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(movie.release_date)}</span>
            </div>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {movie.vote_count} votes
            </span>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-1 mb-3">
            {genreNames.slice(0, 2).map((genre, index) => (
              <span
                key={index}
                className="text-xs bg-gradient-to-r from-lavender-100 to-mint-100 text-lavender-700 px-2 py-1 rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Overview */}
          <p className="text-xs text-gray-600 line-clamp-3">
            {movie.overview}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
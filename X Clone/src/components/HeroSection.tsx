import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Info, Star, Calendar } from 'lucide-react';
import { Movie } from '../types/movie';
import { useMovieContext } from '../context/MovieContext';

interface HeroSectionProps {
  movie: Movie;
}

const HeroSection: React.FC<HeroSectionProps> = ({ movie }) => {
  const { getGenreNames } = useMovieContext();
  const genreNames = getGenreNames(movie.genre_ids);

  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  return (
    <div className="relative h-[60vh] md:h-[70vh] overflow-hidden rounded-2xl mb-12">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${movie.backdrop_path})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      
      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {movie.title}
            </h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1 text-yellow-400">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-white font-medium">{movie.vote_average.toFixed(1)}</span>
              </div>
              
              <div className="flex items-center space-x-1 text-white">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(movie.release_date)}</span>
              </div>
              
              <div className="text-white">
                {movie.vote_count} votes
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {genreNames.slice(0, 3).map((genre, index) => (
                <span
                  key={index}
                  className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
            
            <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-xl">
              {movie.overview}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={`/movie/${movie.id}`}
                className="inline-flex items-center justify-center space-x-2 bg-coral-500 hover:bg-coral-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
              >
                <Play className="h-5 w-5 fill-current" />
                <span>Watch Now</span>
              </Link>
              
              <Link
                to={`/movie/${movie.id}`}
                className="inline-flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 border border-white/30"
              >
                <Info className="h-5 w-5" />
                <span>More Info</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
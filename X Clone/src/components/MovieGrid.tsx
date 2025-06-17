import React from 'react';
import { Movie } from '../types/movie';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, title }) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">No movies found</div>
        <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      {title && (
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="bg-gradient-to-r from-coral-600 to-peach-600 bg-clip-text text-transparent">
            {title}
          </span>
          <span className="ml-3 text-sm font-normal text-gray-500">
            ({movies.length} movies)
          </span>
        </h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
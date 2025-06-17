import React from 'react';
import { useMovieContext } from '../context/MovieContext';

const GenreFilter: React.FC = () => {
  const { genres, selectedGenre, setSelectedGenre } = useMovieContext();

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Genre</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedGenre(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedGenre === null
              ? 'bg-coral-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Genres
        </button>
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => setSelectedGenre(genre.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedGenre === genre.id
                ? 'bg-coral-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
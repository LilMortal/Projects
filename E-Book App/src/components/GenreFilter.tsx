import React from 'react';
import { useApp } from '../context/AppContext';
import { genres } from '../data/mockBooks';

export default function GenreFilter() {
  const { state, dispatch } = useApp();

  const handleGenreChange = (genre: string) => {
    dispatch({ type: 'SET_SELECTED_GENRE', payload: genre });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => handleGenreChange(genre)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            state.selectedGenre === genre
              ? 'bg-gradient-to-r from-emerald-500 to-indigo-600 text-white shadow-md'
              : state.theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
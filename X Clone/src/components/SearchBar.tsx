import React from 'react';
import { Search, X } from 'lucide-react';
import { useMovieContext } from '../context/MovieContext';

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useMovieContext();

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-all duration-200 placeholder-gray-400"
      />
      {searchQuery && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
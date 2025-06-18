import React from 'react';
import { Search, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SearchBar() {
  const { state, dispatch } = useApp();

  const handleSearch = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const clearSearch = () => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={state.searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search books, authors, or genres..."
        className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
          state.theme === 'dark'
            ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
        }`}
      />
      {state.searchQuery && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  );
}
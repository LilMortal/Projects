import React, { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { searchTerm, setSearchTerm } = useAppContext();
  const [localTerm, setLocalTerm] = useState(searchTerm);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTerm = localTerm.trim();
    setSearchTerm(trimmedTerm);
    onSearch(trimmedTerm);
  }, [localTerm, onSearch, setSearchTerm]);

  const handleClear = useCallback(() => {
    setLocalTerm('');
    setSearchTerm('');
    onSearch('');
  }, [onSearch, setSearchTerm]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={localTerm}
            onChange={(e) => setLocalTerm(e.target.value)}
            placeholder="Search for GIFs..."
            className="w-full pl-12 pr-12 py-4 bg-dark-800 border border-dark-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent transition-all duration-200"
          />
          {localTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 p-1 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
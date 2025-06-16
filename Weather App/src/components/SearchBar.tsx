import React, { useState, KeyboardEvent } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationRequest: () => void;
  loading: boolean;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onLocationRequest, 
  loading,
  className = '' 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() && !loading) {
      onSearch(searchTerm.trim());
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim() && !loading) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for a city..."
            disabled={loading}
            className="w-full pl-10 pr-16 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200 disabled:opacity-50"
          />
          
          <Search className="absolute left-3 w-4 h-4 text-white/60" />
          
          <button
            type="button"
            onClick={onLocationRequest}
            disabled={loading}
            className="absolute right-2 p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-200 disabled:opacity-50"
            title="Use current location"
          >
            <MapPin className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
import React from 'react';
import { Search, X } from 'lucide-react';
import { useMenuStore } from '../../store/menuStore';

export const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useMenuStore();

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
        <Search size={20} />
      </div>
      
      <input
        type="text"
        placeholder="Search for dishes, ingredients..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-10 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
      />
      
      {searchQuery && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};
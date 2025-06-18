import React from 'react';
import { Search, X } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

export const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useUIStore();

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search chats..."
          className="w-full pl-10 pr-10 py-2 bg-gray-100 dark:bg-gray-700 rounded-full focus:ring-2 focus:ring-whatsapp-primary focus:bg-white dark:focus:bg-gray-600 transition-colors dark:text-white"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
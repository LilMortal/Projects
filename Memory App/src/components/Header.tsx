import React from 'react';
import { Search, Plus, Grid, Calendar, Moon, Sun, Download, Heart } from 'lucide-react';
import { useMemory } from '../contexts/MemoryContext';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { state, setFilters, setViewMode, toggleCreateModal, exportMemories } = useMemory();
  const { theme, toggleTheme } = useTheme();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ searchTerm: e.target.value });
  };

  const toggleFavoritesFilter = () => {
    setFilters({ showFavoritesOnly: !state.filters.showFavoritesOnly });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent">
              Memories
            </h1>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search memories..."
                value={state.filters.searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleFavoritesFilter}
              className={`p-2 rounded-full transition-all duration-200 ${
                state.filters.showFavoritesOnly
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title="Show favorites only"
            >
              <Heart className={`w-5 h-5 ${state.filters.showFavoritesOnly ? 'fill-current' : ''}`} />
            </button>

            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-full transition-all duration-200 ${
                  state.viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-700 text-teal-600 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
                title="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`p-2 rounded-full transition-all duration-200 ${
                  state.viewMode === 'calendar'
                    ? 'bg-white dark:bg-gray-700 text-teal-600 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
                title="Calendar view"
              >
                <Calendar className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={exportMemories}
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200"
              title="Export memories"
            >
              <Download className="w-5 h-5" />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200"
              title="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <button
              onClick={toggleCreateModal}
              className="bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">Add Memory</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
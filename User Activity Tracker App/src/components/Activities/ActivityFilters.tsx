import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, Calendar, Tag, ArrowUpDown } from 'lucide-react';
import { useActivityStore } from '../../store/activityStore';
import { ActivityType } from '../../types/activity';

export const ActivityFilters: React.FC = () => {
  const { filters, setFilters, getAllTags } = useActivityStore();
  const [showFilters, setShowFilters] = useState(false);
  const allTags = getAllTags();

  const activityTypes: ActivityType[] = ['work', 'exercise', 'study', 'break', 'personal', 'meeting'];
  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'duration', label: 'Duration' },
    { value: 'type', label: 'Activity Type' },
  ];

  const handleTypeToggle = (type: ActivityType) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    setFilters({ types: newTypes });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    setFilters({ tags: newTags });
  };

  const activeFiltersCount = filters.types.length + filters.tags.length + 
    (filters.dateRange.start || filters.dateRange.end ? 1 : 0);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
        {activeFiltersCount > 0 && (
          <span className="bg-primary-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
            {activeFiltersCount}
          </span>
        )}
        <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-80 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl z-50"
          >
            <div className="p-4 space-y-4">
              {/* Sort Options */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <ArrowUpDown className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort By</span>
                </div>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ sortBy: e.target.value as any })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() => setFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      filters.sortOrder === 'desc'
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Descending
                  </button>
                  <button
                    onClick={() => setFilters({ sortOrder: filters.sortOrder === 'desc' ? 'asc' : 'desc' })}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      filters.sortOrder === 'asc'
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Ascending
                  </button>
                </div>
              </div>

              {/* Activity Types */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Activity Types</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activityTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => handleTypeToggle(type)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        filters.types.includes(type)
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              {allTags.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Tag className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleTagToggle(tag)}
                        className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                          filters.tags.includes(tag)
                            ? 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={() => setFilters({
                    types: [],
                    tags: [],
                    dateRange: { start: null, end: null },
                  })}
                  className="w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
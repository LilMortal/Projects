import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { useMemory } from '../contexts/MemoryContext';
import MemoryCard from './MemoryCard';
import FilterSidebar from './FilterSidebar';

const MemoryGrid: React.FC = () => {
  const { getFilteredMemories } = useMemory();
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  
  const memories = getFilteredMemories();

  if (memories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-purple-100 dark:from-teal-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl">📸</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No memories found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          Start creating beautiful memories by clicking the "Add Memory" button above.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Filter Toggle */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          {memories.length} {memories.length === 1 ? 'memory' : 'memories'} found
        </p>
        <button
          onClick={() => setIsFilterSidebarOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Memory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {memories.map(memory => (
          <MemoryCard key={memory.id} memory={memory} />
        ))}
      </div>

      {/* Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterSidebarOpen}
        onClose={() => setIsFilterSidebarOpen(false)}
      />
    </div>
  );
};

export default MemoryGrid;
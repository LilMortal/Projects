import React from 'react';
import { useMenuStore } from '../../store/menuStore';

export const CategoryFilter: React.FC = () => {
  const { categories, selectedCategory, setSelectedCategory } = useMenuStore();

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => setSelectedCategory(null)}
        className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
          selectedCategory === null
            ? 'bg-primary-500 text-white shadow-soft'
            : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'
        }`}
      >
        All Items
      </button>
      
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelectedCategory(category.id)}
          className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
            selectedCategory === category.id
              ? 'bg-primary-500 text-white shadow-soft'
              : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'
          }`}
        >
          {category.name}
          <span className="ml-2 text-xs opacity-75">({category.itemCount})</span>
        </button>
      ))}
    </div>
  );
};
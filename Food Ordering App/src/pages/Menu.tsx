import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBar } from '../components/Menu/SearchBar';
import { CategoryFilter } from '../components/Menu/CategoryFilter';
import { MenuItemCard } from '../components/Menu/MenuItemCard';
import { MenuItemDetail } from '../components/Menu/MenuItemDetail';
import { useMenuStore } from '../store/menuStore';
import type { MenuItem } from '../types';

export const Menu: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const { filteredItems, setSelectedCategory } = useMenuStore();

  // Handle category from URL params
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams, setSelectedCategory]);

  const handleViewDetails = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const handleCloseDetails = () => {
    setSelectedItem(null);
  };

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            Our Menu
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Discover our carefully crafted dishes made with the finest ingredients
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchBar />
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter />
        </div>

        {/* Menu Items */}
        <div className="space-y-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-neutral-500 mb-4">No items found</p>
              <p className="text-neutral-400">Try adjusting your search or category filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Item Detail Modal */}
      <MenuItemDetail
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={handleCloseDetails}
      />
    </div>
  );
};
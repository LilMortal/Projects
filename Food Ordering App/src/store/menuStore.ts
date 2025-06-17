import { create } from 'zustand';
import { menuItems, categories } from '../data/mockData';
import type { MenuItem, Category } from '../types';

interface MenuStore {
  items: MenuItem[];
  categories: Category[];
  selectedCategory: string | null;
  searchQuery: string;
  filteredItems: MenuItem[];
  
  setSelectedCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  getItemsByCategory: (category: string) => MenuItem[];
  searchItems: (query: string) => MenuItem[];
  updateFilteredItems: () => void;
}

export const useMenuStore = create<MenuStore>((set, get) => ({
  items: menuItems,
  categories: categories,
  selectedCategory: null,
  searchQuery: '',
  filteredItems: menuItems,

  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
    get().updateFilteredItems();
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().updateFilteredItems();
  },

  getItemsByCategory: (category) => {
    return get().items.filter(item => item.category === category);
  },

  searchItems: (query) => {
    const lowercaseQuery = query.toLowerCase();
    return get().items.filter(item =>
      item.name.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery) ||
      item.category.toLowerCase().includes(lowercaseQuery) ||
      item.ingredients.some(ingredient => ingredient.toLowerCase().includes(lowercaseQuery))
    );
  },

  updateFilteredItems: () => {
    const { items, selectedCategory, searchQuery } = get();
    let filtered = items;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(lowercaseQuery) ||
        item.description.toLowerCase().includes(lowercaseQuery) ||
        item.category.toLowerCase().includes(lowercaseQuery) ||
        item.ingredients.some(ingredient => ingredient.toLowerCase().includes(lowercaseQuery))
      );
    }

    set({ filteredItems: filtered });
  },
}));
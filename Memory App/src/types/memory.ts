export interface Memory {
  id: string;
  title: string;
  description: string;
  location: string;
  image?: string;
  tags: string[];
  date: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MemoryFilters {
  searchTerm: string;
  selectedTags: string[];
  dateRange: {
    start: string;
    end: string;
  };
  showFavoritesOnly: boolean;
}

export type ViewMode = 'grid' | 'calendar';
export type Theme = 'light' | 'dark';
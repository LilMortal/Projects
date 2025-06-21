import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Memory, MemoryFilters, ViewMode } from '../types/memory';

interface MemoryState {
  memories: Memory[];
  filters: MemoryFilters;
  viewMode: ViewMode;
  selectedMemory: Memory | null;
  isCreateModalOpen: boolean;
  isDetailModalOpen: boolean;
}

type MemoryAction =
  | { type: 'SET_MEMORIES'; payload: Memory[] }
  | { type: 'ADD_MEMORY'; payload: Memory }
  | { type: 'UPDATE_MEMORY'; payload: Memory }
  | { type: 'DELETE_MEMORY'; payload: string }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<MemoryFilters> }
  | { type: 'SET_VIEW_MODE'; payload: ViewMode }
  | { type: 'SET_SELECTED_MEMORY'; payload: Memory | null }
  | { type: 'TOGGLE_CREATE_MODAL' }
  | { type: 'TOGGLE_DETAIL_MODAL' };

const initialState: MemoryState = {
  memories: [],
  filters: {
    searchTerm: '',
    selectedTags: [],
    dateRange: { start: '', end: '' },
    showFavoritesOnly: false,
  },
  viewMode: 'grid',
  selectedMemory: null,
  isCreateModalOpen: false,
  isDetailModalOpen: false,
};

const memoryReducer = (state: MemoryState, action: MemoryAction): MemoryState => {
  switch (action.type) {
    case 'SET_MEMORIES':
      return { ...state, memories: action.payload };
    case 'ADD_MEMORY':
      return { ...state, memories: [...state.memories, action.payload] };
    case 'UPDATE_MEMORY':
      return {
        ...state,
        memories: state.memories.map(memory =>
          memory.id === action.payload.id ? action.payload : memory
        ),
      };
    case 'DELETE_MEMORY':
      return {
        ...state,
        memories: state.memories.filter(memory => memory.id !== action.payload),
      };
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        memories: state.memories.map(memory =>
          memory.id === action.payload
            ? { ...memory, isFavorite: !memory.isFavorite }
            : memory
        ),
      };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };
    case 'SET_SELECTED_MEMORY':
      return { ...state, selectedMemory: action.payload };
    case 'TOGGLE_CREATE_MODAL':
      return { ...state, isCreateModalOpen: !state.isCreateModalOpen };
    case 'TOGGLE_DETAIL_MODAL':
      return { ...state, isDetailModalOpen: !state.isDetailModalOpen };
    default:
      return state;
  }
};

interface MemoryContextType {
  state: MemoryState;
  addMemory: (memory: Omit<Memory, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateMemory: (memory: Memory) => void;
  deleteMemory: (id: string) => void;
  toggleFavorite: (id: string) => void;
  setFilters: (filters: Partial<MemoryFilters>) => void;
  setViewMode: (mode: ViewMode) => void;
  setSelectedMemory: (memory: Memory | null) => void;
  toggleCreateModal: () => void;
  toggleDetailModal: () => void;
  exportMemories: () => void;
  getFilteredMemories: () => Memory[];
  getAllTags: () => string[];
}

const MemoryContext = createContext<MemoryContextType | undefined>(undefined);

export const useMemory = () => {
  const context = useContext(MemoryContext);
  if (!context) {
    throw new Error('useMemory must be used within a MemoryProvider');
  }
  return context;
};

export const MemoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(memoryReducer, initialState);

  // Load memories from localStorage on mount
  useEffect(() => {
    const savedMemories = localStorage.getItem('memories');
    if (savedMemories) {
      try {
        const memories = JSON.parse(savedMemories);
        dispatch({ type: 'SET_MEMORIES', payload: memories });
      } catch (error) {
        console.error('Error loading memories from localStorage:', error);
      }
    }
  }, []);

  // Save memories to localStorage whenever memories change
  useEffect(() => {
    localStorage.setItem('memories', JSON.stringify(state.memories));
  }, [state.memories]);

  const addMemory = (memoryData: Omit<Memory, 'id' | 'createdAt' | 'updatedAt'>) => {
    const memory: Memory = {
      ...memoryData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_MEMORY', payload: memory });
  };

  const updateMemory = (memory: Memory) => {
    const updatedMemory = {
      ...memory,
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'UPDATE_MEMORY', payload: updatedMemory });
  };

  const deleteMemory = (id: string) => {
    dispatch({ type: 'DELETE_MEMORY', payload: id });
  };

  const toggleFavorite = (id: string) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
  };

  const setFilters = (filters: Partial<MemoryFilters>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const setViewMode = (mode: ViewMode) => {
    dispatch({ type: 'SET_VIEW_MODE', payload: mode });
  };

  const setSelectedMemory = (memory: Memory | null) => {
    dispatch({ type: 'SET_SELECTED_MEMORY', payload: memory });
  };

  const toggleCreateModal = () => {
    dispatch({ type: 'TOGGLE_CREATE_MODAL' });
  };

  const toggleDetailModal = () => {
    dispatch({ type: 'TOGGLE_DETAIL_MODAL' });
  };

  const exportMemories = () => {
    const dataStr = JSON.stringify(state.memories, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `memories_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getFilteredMemories = (): Memory[] => {
    let filtered = [...state.memories];

    // Filter by search term
    if (state.filters.searchTerm) {
      const searchLower = state.filters.searchTerm.toLowerCase();
      filtered = filtered.filter(memory =>
        memory.title.toLowerCase().includes(searchLower) ||
        memory.description.toLowerCase().includes(searchLower) ||
        memory.location.toLowerCase().includes(searchLower) ||
        memory.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Filter by selected tags
    if (state.filters.selectedTags.length > 0) {
      filtered = filtered.filter(memory =>
        state.filters.selectedTags.some(tag => memory.tags.includes(tag))
      );
    }

    // Filter by date range
    if (state.filters.dateRange.start || state.filters.dateRange.end) {
      filtered = filtered.filter(memory => {
        const memoryDate = new Date(memory.date);
        const startDate = state.filters.dateRange.start ? new Date(state.filters.dateRange.start) : null;
        const endDate = state.filters.dateRange.end ? new Date(state.filters.dateRange.end) : null;

        if (startDate && memoryDate < startDate) return false;
        if (endDate && memoryDate > endDate) return false;
        return true;
      });
    }

    // Filter by favorites
    if (state.filters.showFavoritesOnly) {
      filtered = filtered.filter(memory => memory.isFavorite);
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const getAllTags = (): string[] => {
    const tags = new Set<string>();
    state.memories.forEach(memory => {
      memory.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  };

  const value: MemoryContextType = {
    state,
    addMemory,
    updateMemory,
    deleteMemory,
    toggleFavorite,
    setFilters,
    setViewMode,
    setSelectedMemory,
    toggleCreateModal,
    toggleDetailModal,
    exportMemories,
    getFilteredMemories,
    getAllTags,
  };

  return (
    <MemoryContext.Provider value={value}>
      {children}
    </MemoryContext.Provider>
  );
};
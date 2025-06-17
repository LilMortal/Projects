import { create } from 'zustand';
import type { HistoryState } from '../types';

interface HistoryStore {
  history: HistoryState[];
  currentIndex: number;
  maxHistorySize: number;
  
  // Actions
  saveState: (state: Omit<HistoryState, 'id' | 'timestamp'>) => void;
  undo: () => HistoryState | null;
  redo: () => HistoryState | null;
  canUndo: () => boolean;
  canRedo: () => boolean;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryStore>((set, get) => ({
  // State
  history: [],
  currentIndex: -1,
  maxHistorySize: 50,

  // Actions
  saveState: (state) => {
    const { history, currentIndex, maxHistorySize } = get();
    
    const newState: HistoryState = {
      ...state,
      id: `history-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };

    // Remove any states after current index (when undoing then making new changes)
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newState);

    // Keep history within size limit
    if (newHistory.length > maxHistorySize) {
      newHistory.shift();
    }

    set({
      history: newHistory,
      currentIndex: newHistory.length - 1,
    });
  },

  undo: () => {
    const { history, currentIndex } = get();
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      set({ currentIndex: newIndex });
      return history[newIndex];
    }
    return null;
  },

  redo: () => {
    const { history, currentIndex } = get();
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      set({ currentIndex: newIndex });
      return history[newIndex];
    }
    return null;
  },

  canUndo: () => {
    const { currentIndex } = get();
    return currentIndex > 0;
  },

  canRedo: () => {
    const { history, currentIndex } = get();
    return currentIndex < history.length - 1;
  },

  clearHistory: () => set({
    history: [],
    currentIndex: -1,
  }),
}));
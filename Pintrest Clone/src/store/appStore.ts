import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Pin } from '../types';

interface AppState {
  theme: 'light' | 'dark';
  searchQuery: string;
  selectedPin: Pin | null;
  showPinModal: boolean;
  showCreatePinModal: boolean;
  showAuthModal: boolean;
  authMode: 'login' | 'signup';
  
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedPin: (pin: Pin | null) => void;
  setShowPinModal: (show: boolean) => void;
  setShowCreatePinModal: (show: boolean) => void;
  setShowAuthModal: (show: boolean) => void;
  setAuthMode: (mode: 'login' | 'signup') => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      searchQuery: '',
      selectedPin: null,
      showPinModal: false,
      showCreatePinModal: false,
      showAuthModal: false,
      authMode: 'login',

      setTheme: (theme) => {
        set({ theme });
        document.documentElement.classList.toggle('dark', theme === 'dark');
      },

      toggleTheme: () => {
        const { theme } = get();
        const newTheme = theme === 'light' ? 'dark' : 'light';
        get().setTheme(newTheme);
      },

      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSelectedPin: (selectedPin) => set({ selectedPin }),
      setShowPinModal: (showPinModal) => set({ showPinModal }),
      setShowCreatePinModal: (showCreatePinModal) => set({ showCreatePinModal }),
      setShowAuthModal: (showAuthModal) => set({ showAuthModal }),
      setAuthMode: (authMode) => set({ authMode }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
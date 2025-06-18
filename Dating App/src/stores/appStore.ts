import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState } from '../types';

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      currentView: 'home',

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      setCurrentView: (view) => set({ currentView: view }),
    }),
    {
      name: 'app-storage',
    }
  )
);
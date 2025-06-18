import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (darkMode: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      darkMode: false,
      
      toggleDarkMode: () => set((state) => {
        const newDarkMode = !state.darkMode;
        document.documentElement.classList.toggle('dark', newDarkMode);
        return { darkMode: newDarkMode };
      }),
      
      setDarkMode: (darkMode) => set(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        return { darkMode };
      }),
    }),
    {
      name: 'app-storage',
      onRehydrateStorage: () => (state) => {
        if (state?.darkMode) {
          document.documentElement.classList.add('dark');
        }
      },
    }
  )
);
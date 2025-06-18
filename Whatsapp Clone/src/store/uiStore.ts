import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UIState } from '../types';

interface UIStore extends UIState {
  setDarkMode: (isDark: boolean) => void;
  toggleSidebar: () => void;
  setActiveView: (view: UIState['activeView']) => void;
  setShowEmojiPicker: (show: boolean) => void;
  setSearchQuery: (query: string) => void;
  setNotifications: (enabled: boolean) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      isDarkMode: false,
      sidebarOpen: true,
      activeView: 'chats',
      showEmojiPicker: false,
      searchQuery: '',
      notifications: true,

      setDarkMode: (isDark: boolean) => {
        set({ isDarkMode: isDark });
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },

      setActiveView: (view: UIState['activeView']) => {
        set({ activeView: view });
      },

      setShowEmojiPicker: (show: boolean) => {
        set({ showEmojiPicker: show });
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      setNotifications: (enabled: boolean) => {
        set({ notifications: enabled });
      },
    }),
    {
      name: 'whatsapp-ui',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        notifications: state.notifications,
      }),
    }
  )
);
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock successful login
          const user: User = {
            id: '1',
            email,
            name: email.split('@')[0],
            createdAt: new Date(),
          };
          
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw new Error('Invalid credentials');
        }
      },

      register: async (email: string, password: string, name: string) => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock successful registration
          const user: User = {
            id: '1',
            email,
            name,
            createdAt: new Date(),
          };
          
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw new Error('Registration failed');
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      forgotPassword: async (email: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Mock success - in real app, would send email
      },

      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
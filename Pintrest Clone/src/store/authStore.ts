import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

// Mock user data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@example.com',
    name: 'Demo User',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    bio: 'Creative designer and visual storyteller',
    followers: 1250,
    following: 834,
    createdAt: '2024-01-01T00:00:00Z',
  },
];

export const useAuthStore = create<AuthState>()(
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
          
          // Mock authentication - in real app, validate with backend
          const user = mockUsers.find(u => u.email === email) || mockUsers[0];
          
          set({ 
            user,
            isAuthenticated: true,
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
          throw new Error('Login failed');
        }
      },

      signup: async (email: string, password: string, name: string) => {
        set({ isLoading: true });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Create new user
          const newUser: User = {
            id: Date.now().toString(),
            email,
            name,
            followers: 0,
            following: 0,
            createdAt: new Date().toISOString(),
          };
          
          set({ 
            user: newUser,
            isAuthenticated: true,
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
          throw new Error('Signup failed');
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false,
          isLoading: false 
        });
      },

      updateProfile: (updates: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
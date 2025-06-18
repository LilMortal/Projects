import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types';

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'sarah@example.com',
    name: 'Sarah',
    age: 26,
    gender: 'female',
    bio: '🌸 Love hiking and yoga. Looking for someone to explore the city with!',
    location: 'San Francisco, CA',
    photos: [
      'https://images.pexels.com/photos/3307758/pexels-photo-3307758.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    interests: ['hiking', 'yoga', 'photography', 'travel'],
    preferences: {
      ageRange: [24, 32],
      genderPreference: 'male',
      maxDistance: 25
    },
    verified: true,
    lastSeen: new Date(),
    createdAt: new Date()
  }
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
          // Mock login - in real app, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const user = mockUsers.find(u => u.email === email) || {
            id: '1',
            email,
            name: 'Demo User',
            age: 25,
            gender: 'female' as const,
            bio: 'Just joined! Looking to meet new people.',
            location: 'Your City',
            photos: ['https://images.pexels.com/photos/3307758/pexels-photo-3307758.jpeg?auto=compress&cs=tinysrgb&w=400'],
            interests: ['music', 'movies'],
            preferences: {
              ageRange: [22, 35] as [number, number],
              genderPreference: 'both' as const,
              maxDistance: 50
            },
            verified: false,
            lastSeen: new Date(),
            createdAt: new Date()
          };

          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (userData: Partial<User>) => {
        set({ isLoading: true });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const user: User = {
            id: Date.now().toString(),
            email: userData.email || '',
            name: userData.name || '',
            age: userData.age || 25,
            gender: userData.gender || 'female',
            bio: userData.bio || '',
            location: userData.location || '',
            photos: userData.photos || [],
            interests: userData.interests || [],
            preferences: userData.preferences || {
              ageRange: [22, 35],
              genderPreference: 'both',
              maxDistance: 50
            },
            verified: false,
            lastSeen: new Date(),
            createdAt: new Date()
          };

          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: async (updates: Partial<User>) => {
        const { user } = get();
        if (!user) return;

        set({ isLoading: true });
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          const updatedUser = { ...user, ...updates };
          set({ user: updatedUser, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      }
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
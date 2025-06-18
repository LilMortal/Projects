import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { currentUser, mockUsers, MockUser } from '../lib/mockData';
import toast from 'react-hot-toast';

interface AuthState {
  user: MockUser | null;
  profile: MockUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  setUser: (user: MockUser | null) => void;
  setProfile: (profile: MockUser | null) => void;
  setLoading: (loading: boolean) => void;
  signUp: (email: string, password: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  setupProfile: (data: { username: string; fullName?: string; bio?: string }) => Promise<boolean>;
  updateProfile: (data: Partial<MockUser>) => Promise<boolean>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      loading: false,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setProfile: (profile) => set({ profile }),
      setLoading: (loading) => set({ loading }),

      signUp: async (email: string, password: string) => {
        try {
          set({ loading: true });
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Check if user already exists
          const existingUser = mockUsers.find(u => u.email === email);
          if (existingUser) {
            toast.error('User already exists');
            return false;
          }

          const newUser: MockUser = {
            id: Date.now().toString(),
            email,
            username: email.split('@')[0],
            full_name: null,
            bio: null,
            avatar_url: null,
            followers_count: 0,
            following_count: 0,
            posts_count: 0,
            created_at: new Date().toISOString(),
          };

          set({ user: newUser, isAuthenticated: true });
          toast.success('Account created successfully!');
          return true;
        } catch (error) {
          toast.error('Something went wrong. Please try again.');
          return false;
        } finally {
          set({ loading: false });
        }
      },

      signIn: async (email: string, password: string) => {
        try {
          set({ loading: true });
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // For demo purposes, accept any email/password combination
          // In a real app, you would validate credentials
          const user = mockUsers.find(u => u.email === email) || currentUser;
          
          set({ user, profile: user, isAuthenticated: true });
          toast.success('Welcome back!');
          return true;
        } catch (error) {
          toast.error('Something went wrong. Please try again.');
          return false;
        } finally {
          set({ loading: false });
        }
      },

      signOut: async () => {
        try {
          set({ loading: true });
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set({ user: null, profile: null, isAuthenticated: false });
          toast.success('Signed out successfully');
        } catch (error) {
          toast.error('Error signing out');
        } finally {
          set({ loading: false });
        }
      },

      setupProfile: async (data) => {
        try {
          const { user } = get();
          if (!user) return false;

          set({ loading: true });
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));

          const updatedUser: MockUser = {
            ...user,
            username: data.username,
            full_name: data.fullName || null,
            bio: data.bio || null,
          };

          set({ profile: updatedUser, user: updatedUser });
          toast.success('Profile setup complete!');
          return true;
        } catch (error) {
          toast.error('Something went wrong. Please try again.');
          return false;
        } finally {
          set({ loading: false });
        }
      },

      updateProfile: async (data) => {
        try {
          const { profile } = get();
          if (!profile) return false;

          set({ loading: true });
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));

          const updatedProfile: MockUser = {
            ...profile,
            ...data,
          };

          set({ profile: updatedProfile, user: updatedProfile });
          toast.success('Profile updated successfully!');
          return true;
        } catch (error) {
          toast.error('Something went wrong. Please try again.');
          return false;
        } finally {
          set({ loading: false });
        }
      },

      initialize: async () => {
        try {
          // For demo purposes, automatically sign in with demo user
          const storedAuth = localStorage.getItem('auth-storage');
          if (!storedAuth) {
            // Auto-login with demo user for better UX
            set({ 
              user: currentUser, 
              profile: currentUser, 
              isAuthenticated: true 
            });
          }
        } catch (error) {
          console.error('Error initializing auth:', error);
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        profile: state.profile, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
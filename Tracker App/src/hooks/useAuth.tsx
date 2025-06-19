import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUser: User = {
  id: 'mock-user-1',
  email: 'demo@example.com',
  full_name: 'Demo User',
  avatar_url: '',
  theme_preference: 'system',
  notifications_enabled: true,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and auto-login for demo
    const timer = setTimeout(() => {
      const savedUser = localStorage.getItem('demo-user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const userData = { ...mockUser, email };
      setUser(userData);
      localStorage.setItem('demo-user', JSON.stringify(userData));
      
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful signup
      const userData = { ...mockUser, email, full_name: fullName || 'New User' };
      setUser(userData);
      localStorage.setItem('demo-user', JSON.stringify(userData));
      
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('demo-user');
  };

  const signInWithGoogle = async () => {
    try {
      // Simulate Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = { ...mockUser, full_name: 'Google User' };
      setUser(userData);
      localStorage.setItem('demo-user', JSON.stringify(userData));
      
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
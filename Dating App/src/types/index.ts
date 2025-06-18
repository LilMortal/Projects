export interface User {
  id: string;
  email: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'non-binary';
  bio: string;
  location: string;
  photos: string[];
  interests: string[];
  preferences: {
    ageRange: [number, number];
    genderPreference: 'male' | 'female' | 'both';
    maxDistance: number;
  };
  verified: boolean;
  lastSeen: Date;
  createdAt: Date;
}

export interface Match {
  id: string;
  users: [string, string];
  matchedAt: Date;
  lastMessage?: Message;
  unreadCount: number;
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  sentAt: Date;
  read: boolean;
}

export interface SwipeAction {
  id: string;
  userId: string;
  targetUserId: string;
  action: 'like' | 'pass' | 'superlike';
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

export interface AppState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  currentView: 'home' | 'matches' | 'explore' | 'profile';
  setCurrentView: (view: 'home' | 'matches' | 'explore' | 'profile') => void;
}

export interface SwipeState {
  currentUserIndex: number;
  users: User[];
  matches: Match[];
  swipeUser: (userId: string, action: 'like' | 'pass' | 'superlike') => Promise<boolean>;
  undoSwipe: () => void;
  loadMoreUsers: () => Promise<void>;
  resetSwipes: () => void;
}
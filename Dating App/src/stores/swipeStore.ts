import { create } from 'zustand';
import { SwipeState, User, Match } from '../types';

// Mock data for potential matches
const mockPotentialMatches: User[] = [
  {
    id: '2',
    email: 'alex@example.com',
    name: 'Alex',
    age: 28,
    gender: 'male',
    bio: '🎸 Musician and coffee enthusiast. Let\'s grab a latte and talk about life!',
    location: 'San Francisco, CA',
    photos: [
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    interests: ['music', 'coffee', 'art', 'hiking'],
    preferences: {
      ageRange: [24, 32],
      genderPreference: 'female',
      maxDistance: 30
    },
    verified: true,
    lastSeen: new Date(),
    createdAt: new Date()
  },
  {
    id: '3',
    email: 'emma@example.com',
    name: 'Emma',
    age: 24,
    gender: 'female',
    bio: '📚 Book lover and weekend adventurer. Always up for trying new restaurants!',
    location: 'San Francisco, CA',
    photos: [
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    interests: ['reading', 'food', 'travel', 'photography'],
    preferences: {
      ageRange: [25, 35],
      genderPreference: 'both',
      maxDistance: 20
    },
    verified: false,
    lastSeen: new Date(),
    createdAt: new Date()
  },
  {
    id: '4',
    email: 'james@example.com',
    name: 'James',
    age: 30,
    gender: 'male',
    bio: '🏃‍♂️ Fitness enthusiast and dog lover. Looking for a running partner and adventure buddy!',
    location: 'San Francisco, CA',
    photos: [
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    interests: ['fitness', 'dogs', 'outdoor', 'cooking'],
    preferences: {
      ageRange: [22, 28],
      genderPreference: 'female',
      maxDistance: 40
    },
    verified: true,
    lastSeen: new Date(),
    createdAt: new Date()
  },
  {
    id: '5',
    email: 'sofia@example.com',
    name: 'Sofia',
    age: 27,
    gender: 'female',
    bio: '🎨 Artist and yoga instructor. Seeking someone who appreciates creativity and mindfulness.',
    location: 'San Francisco, CA',
    photos: [
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    interests: ['art', 'yoga', 'meditation', 'nature'],
    preferences: {
      ageRange: [26, 35],
      genderPreference: 'both',
      maxDistance: 25
    },
    verified: true,
    lastSeen: new Date(),
    createdAt: new Date()
  },
  {
    id: '6',
    email: 'michael@example.com',
    name: 'Michael',
    age: 29,
    gender: 'male',
    bio: '🍕 Foodie and tech enthusiast. Always down for spontaneous adventures and good conversations!',
    location: 'San Francisco, CA',
    photos: [
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    interests: ['food', 'technology', 'travel', 'gaming'],
    preferences: {
      ageRange: [24, 32],
      genderPreference: 'female',
      maxDistance: 35
    },
    verified: false,
    lastSeen: new Date(),
    createdAt: new Date()
  }
];

export const useSwipeStore = create<SwipeState>((set, get) => ({
  currentUserIndex: 0,
  users: mockPotentialMatches,
  matches: [],

  swipeUser: async (userId: string, action: 'like' | 'pass' | 'superlike') => {
    const { currentUserIndex, users } = get();
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Check if it's a match (random for demo)
    const isMatch = action === 'like' && Math.random() > 0.5;
    
    if (isMatch) {
      const matchedUser = users.find(u => u.id === userId);
      if (matchedUser) {
        const newMatch: Match = {
          id: Date.now().toString(),
          users: ['1', userId], // Current user ID is '1'
          matchedAt: new Date(),
          unreadCount: 0
        };
        
        set(state => ({
          matches: [...state.matches, newMatch],
          currentUserIndex: state.currentUserIndex + 1
        }));
        
        return true; // It's a match!
      }
    }
    
    set(state => ({
      currentUserIndex: state.currentUserIndex + 1
    }));
    
    return false;
  },

  undoSwipe: () => {
    set(state => ({
      currentUserIndex: Math.max(0, state.currentUserIndex - 1)
    }));
  },

  loadMoreUsers: async () => {
    // In a real app, this would fetch more users from the API
    await new Promise(resolve => setTimeout(resolve, 1000));
    // For demo, we'll just reset the index when we run out of users
    const { currentUserIndex, users } = get();
    if (currentUserIndex >= users.length) {
      set({ currentUserIndex: 0 });
    }
  },

  resetSwipes: () => {
    set({ currentUserIndex: 0 });
  }
}));
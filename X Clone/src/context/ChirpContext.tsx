import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Chirp, ChirpContextType } from '../types/chirp';
import { mockUsers, mockChirps } from '../data/mockData';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ChirpContext = createContext<ChirpContextType | undefined>(undefined);

export const useChirpContext = () => {
  const context = useContext(ChirpContext);
  if (context === undefined) {
    throw new Error('useChirpContext must be used within a ChirpProvider');
  }
  return context;
};

interface ChirpProviderProps {
  children: ReactNode;
}

export const ChirpProvider: React.FC<ChirpProviderProps> = ({ children }) => {
  const [users, setUsers] = useLocalStorage<User[]>('chirp-users', mockUsers);
  const [chirps, setChirps] = useLocalStorage<Chirp[]>('chirp-chirps', mockChirps);
  const [currentUser] = useState<User>(users[0]); // For demo, always use first user

  const addChirp = (content: string, image?: string) => {
    const newChirp: Chirp = {
      id: Date.now().toString(),
      userId: currentUser.id,
      content,
      image,
      timestamp: new Date().toISOString(),
      likes: [],
      rechirps: [],
      comments: [],
    };
    setChirps(prev => [newChirp, ...prev]);
  };

  const likeChirp = (chirpId: string) => {
    setChirps(prev => prev.map(chirp => {
      if (chirp.id === chirpId) {
        const isLiked = chirp.likes.includes(currentUser.id);
        return {
          ...chirp,
          likes: isLiked
            ? chirp.likes.filter(id => id !== currentUser.id)
            : [...chirp.likes, currentUser.id]
        };
      }
      return chirp;
    }));
  };

  const rechirp = (chirpId: string) => {
    setChirps(prev => prev.map(chirp => {
      if (chirp.id === chirpId) {
        const isRechirped = chirp.rechirps.includes(currentUser.id);
        return {
          ...chirp,
          rechirps: isRechirped
            ? chirp.rechirps.filter(id => id !== currentUser.id)
            : [...chirp.rechirps, currentUser.id]
        };
      }
      return chirp;
    }));
  };

  const addComment = (chirpId: string, content: string) => {
    const newComment = {
      id: Date.now().toString(),
      userId: currentUser.id,
      content,
      timestamp: new Date().toISOString(),
      likes: [],
    };

    setChirps(prev => prev.map(chirp => {
      if (chirp.id === chirpId) {
        return {
          ...chirp,
          comments: [...chirp.comments, newComment]
        };
      }
      return chirp;
    }));
  };

  const followUser = (userId: string) => {
    setUsers(prev => prev.map(user => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          following: [...user.following, userId]
        };
      }
      if (user.id === userId) {
        return {
          ...user,
          followers: [...user.followers, currentUser.id]
        };
      }
      return user;
    }));
  };

  const unfollowUser = (userId: string) => {
    setUsers(prev => prev.map(user => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          following: user.following.filter(id => id !== userId)
        };
      }
      if (user.id === userId) {
        return {
          ...user,
          followers: user.followers.filter(id => id !== currentUser.id)
        };
      }
      return user;
    }));
  };

  const getUserById = (userId: string): User | undefined => {
    return users.find(user => user.id === userId);
  };

  const getChirpsByUserId = (userId: string): Chirp[] => {
    return chirps.filter(chirp => chirp.userId === userId);
  };

  const getTrendingChirps = (): Chirp[] => {
    return chirps
      .sort((a, b) => (b.likes.length + b.rechirps.length) - (a.likes.length + a.rechirps.length))
      .slice(0, 10);
  };

  const value: ChirpContextType = {
    currentUser,
    users,
    chirps,
    addChirp,
    likeChirp,
    rechirp,
    addComment,
    followUser,
    unfollowUser,
    getUserById,
    getChirpsByUserId,
    getTrendingChirps,
  };

  return (
    <ChirpContext.Provider value={value}>
      {children}
    </ChirpContext.Provider>
  );
};
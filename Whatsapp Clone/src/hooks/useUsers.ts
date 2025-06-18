import { useState, useEffect } from 'react';
import { User } from '../types';

const demoUsers: User[] = [
  {
    id: 'user_1',
    name: 'Alice Johnson',
    phone: '+1234567890',
    about: 'Love to travel and explore new places 🌍',
    isOnline: true,
    lastSeen: new Date(),
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150&h=150&fit=crop',
  },
  {
    id: 'user_2',
    name: 'Bob Smith',
    phone: '+1234567891',
    about: 'Software developer | Coffee enthusiast ☕',
    isOnline: false,
    lastSeen: new Date(Date.now() - 3600000),
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=150&h=150&fit=crop',
  },
  {
    id: 'user_3',
    name: 'Carol Davis',
    phone: '+1234567892',
    about: 'Designer | Art lover 🎨',
    isOnline: true,
    lastSeen: new Date(),
    avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?w=150&h=150&fit=crop',
  },
  {
    id: 'user_4',
    name: 'David Wilson',
    phone: '+1234567893',
    about: 'Available',
    isOnline: false,
    lastSeen: new Date(Date.now() - 7200000),
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?w=150&h=150&fit=crop',
  },
];

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchUsers = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        setUsers(demoUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getUserById = (id: string): User | undefined => {
    return users.find(user => user.id === id);
  };

  const searchUsers = (query: string): User[] => {
    if (!query.trim()) return users;
    
    return users.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.phone.includes(query)
    );
  };

  return {
    users,
    loading,
    getUserById,
    searchUsers,
  };
};
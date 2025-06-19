import { useState, useEffect } from 'react';
import { Tracker, TrackerLog, TrackerFormData } from '../types';
import { useAuth } from './useAuth';
import { format, subDays, differenceInDays } from 'date-fns';
import toast from 'react-hot-toast';

// Mock data
const mockTrackers: Tracker[] = [
  {
    id: '1',
    user_id: 'mock-user-1',
    name: 'Morning Workout',
    type: 'habit',
    category: 'health',
    color: '#10B981',
    icon: 'dumbbell',
    frequency: 'daily',
    current_value: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
    streak: 5,
    completion_rate: 85,
  },
  {
    id: '2',
    user_id: 'mock-user-1',
    name: 'Read 20 Books',
    type: 'goal',
    category: 'learning',
    color: '#4F46E5',
    icon: 'book',
    frequency: 'daily',
    target_value: 20,
    current_value: 7,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
    streak: 12,
    completion_rate: 35,
  },
  {
    id: '3',
    user_id: 'mock-user-1',
    name: 'Finish Project Report',
    type: 'task',
    category: 'work',
    color: '#F59E0B',
    icon: 'target',
    frequency: 'daily',
    current_value: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
    streak: 0,
    completion_rate: 0,
  },
  {
    id: '4',
    user_id: 'mock-user-1',
    name: 'Drink Water',
    type: 'habit',
    category: 'health',
    color: '#06B6D4',
    icon: 'heart',
    frequency: 'daily',
    current_value: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
    streak: 8,
    completion_rate: 92,
  },
];

export function useTrackers() {
  const { user } = useAuth();
  const [trackers, setTrackers] = useState<Tracker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      // Simulate loading
      const timer = setTimeout(() => {
        const savedTrackers = localStorage.getItem('demo-trackers');
        if (savedTrackers) {
          setTrackers(JSON.parse(savedTrackers));
        } else {
          setTrackers(mockTrackers);
          localStorage.setItem('demo-trackers', JSON.stringify(mockTrackers));
        }
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setTrackers([]);
      setLoading(false);
    }
  }, [user]);

  const createTracker = async (data: TrackerFormData) => {
    if (!user) return { error: new Error('User not authenticated') };

    try {
      const newTracker: Tracker = {
        id: Date.now().toString(),
        user_id: user.id,
        name: data.name,
        type: data.type,
        category: data.category,
        color: data.color,
        icon: data.icon,
        frequency: data.frequency,
        target_value: data.target_value,
        current_value: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_active: true,
        streak: 0,
        completion_rate: 0,
      };

      const updatedTrackers = [...trackers, newTracker];
      setTrackers(updatedTrackers);
      localStorage.setItem('demo-trackers', JSON.stringify(updatedTrackers));
      
      toast.success(`${data.name} tracker created successfully!`);
      return { error: null };
    } catch (err) {
      console.error('Error creating tracker:', err);
      toast.error('Failed to create tracker');
      return { error: err as Error };
    }
  };

  const updateTracker = async (id: string, updates: Partial<TrackerFormData>) => {
    if (!user) return { error: new Error('User not authenticated') };

    try {
      const updatedTrackers = trackers.map(tracker =>
        tracker.id === id
          ? { ...tracker, ...updates, updated_at: new Date().toISOString() }
          : tracker
      );
      
      setTrackers(updatedTrackers);
      localStorage.setItem('demo-trackers', JSON.stringify(updatedTrackers));
      
      toast.success('Tracker updated successfully!');
      return { error: null };
    } catch (err) {
      console.error('Error updating tracker:', err);
      toast.error('Failed to update tracker');
      return { error: err as Error };
    }
  };

  const deleteTracker = async (id: string) => {
    if (!user) return { error: new Error('User not authenticated') };

    try {
      const updatedTrackers = trackers.filter(tracker => tracker.id !== id);
      setTrackers(updatedTrackers);
      localStorage.setItem('demo-trackers', JSON.stringify(updatedTrackers));
      
      toast.success('Tracker deleted successfully!');
      return { error: null };
    } catch (err) {
      console.error('Error deleting tracker:', err);
      toast.error('Failed to delete tracker');
      return { error: err as Error };
    }
  };

  const logProgress = async (trackerId: string, value: number, notes?: string) => {
    if (!user) return { error: new Error('User not authenticated') };

    try {
      const updatedTrackers = trackers.map(tracker => {
        if (tracker.id === trackerId) {
          const newStreak = value > tracker.current_value ? (tracker.streak || 0) + 1 : tracker.streak;
          return {
            ...tracker,
            current_value: value,
            streak: newStreak,
            completion_rate: Math.min(100, ((tracker.completion_rate || 0) + 5)),
            updated_at: new Date().toISOString(),
          };
        }
        return tracker;
      });

      setTrackers(updatedTrackers);
      localStorage.setItem('demo-trackers', JSON.stringify(updatedTrackers));
      
      toast.success('Progress logged successfully!');
      return { error: null };
    } catch (err) {
      console.error('Error logging progress:', err);
      toast.error('Failed to log progress');
      return { error: err as Error };
    }
  };

  return {
    trackers,
    loading,
    error,
    createTracker,
    updateTracker,
    deleteTracker,
    logProgress,
    refetch: () => {
      const savedTrackers = localStorage.getItem('demo-trackers');
      if (savedTrackers) {
        setTrackers(JSON.parse(savedTrackers));
      }
    },
  };
}
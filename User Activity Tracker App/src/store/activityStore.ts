import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Activity, ActivityType, FilterOptions } from '../types/activity';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

interface ActivityStore {
  activities: Activity[];
  currentActivity: Activity | null;
  filters: FilterOptions;
  theme: 'light' | 'dark';
  
  // Actions
  addActivity: (activity: Omit<Activity, 'id'>) => void;
  updateActivity: (id: string, activity: Partial<Activity>) => void;
  deleteActivity: (id: string) => void;
  setCurrentActivity: (activity: Activity | null) => void;
  setFilters: (filters: Partial<FilterOptions>) => void;
  toggleTheme: () => void;
  
  // Computed
  getFilteredActivities: () => Activity[];
  getActivityStats: (period?: 'day' | 'week' | 'month') => any;
  getAllTags: () => string[];
}

export const useActivityStore = create<ActivityStore>()(
  persist(
    (set, get) => ({
      activities: [],
      currentActivity: null,
      theme: 'light',
      filters: {
        dateRange: { start: null, end: null },
        types: [],
        tags: [],
        sortBy: 'recent',
        sortOrder: 'desc',
      },

      addActivity: (activityData) => {
        const activity: Activity = {
          ...activityData,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        };
        set((state) => ({
          activities: [...state.activities, activity],
        }));
      },

      updateActivity: (id, updates) => {
        set((state) => ({
          activities: state.activities.map((activity) =>
            activity.id === id ? { ...activity, ...updates } : activity
          ),
        }));
      },

      deleteActivity: (id) => {
        set((state) => ({
          activities: state.activities.filter((activity) => activity.id !== id),
          currentActivity: state.currentActivity?.id === id ? null : state.currentActivity,
        }));
      },

      setCurrentActivity: (activity) => {
        set({ currentActivity: activity });
      },

      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        }));
      },

      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        }));
      },

      getFilteredActivities: () => {
        const { activities, filters } = get();
        let filtered = [...activities];

        // Filter by date range
        if (filters.dateRange.start && filters.dateRange.end) {
          filtered = filtered.filter((activity) => {
            const activityDate = new Date(activity.startTime);
            return isWithinInterval(activityDate, {
              start: filters.dateRange.start!,
              end: filters.dateRange.end!,
            });
          });
        }

        // Filter by types
        if (filters.types.length > 0) {
          filtered = filtered.filter((activity) => filters.types.includes(activity.type));
        }

        // Filter by tags
        if (filters.tags.length > 0) {
          filtered = filtered.filter((activity) =>
            filters.tags.some((tag) => activity.tags.includes(tag))
          );
        }

        // Sort activities
        filtered.sort((a, b) => {
          let comparison = 0;
          
          switch (filters.sortBy) {
            case 'recent':
              comparison = new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
              break;
            case 'duration':
              comparison = b.duration - a.duration;
              break;
            case 'type':
              comparison = a.type.localeCompare(b.type);
              break;
          }

          return filters.sortOrder === 'desc' ? comparison : -comparison;
        });

        return filtered;
      },

      getActivityStats: (period = 'week') => {
        const { activities } = get();
        const now = new Date();
        let periodStart: Date;
        let periodEnd: Date;

        switch (period) {
          case 'day':
            periodStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            periodEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            break;
          case 'week':
            periodStart = startOfWeek(now);
            periodEnd = endOfWeek(now);
            break;
          case 'month':
            periodStart = startOfMonth(now);
            periodEnd = endOfMonth(now);
            break;
          default:
            periodStart = startOfWeek(now);
            periodEnd = endOfWeek(now);
        }

        const periodActivities = activities.filter((activity) =>
          isWithinInterval(new Date(activity.startTime), { start: periodStart, end: periodEnd })
        );

        const totalTime = periodActivities.reduce((sum, activity) => sum + activity.duration, 0);
        const activityCount = periodActivities.length;
        const averageSession = activityCount > 0 ? totalTime / activityCount : 0;

        const typeStats: { [key in ActivityType]: number } = {
          work: 0,
          exercise: 0,
          study: 0,
          break: 0,
          personal: 0,
          meeting: 0,
        };

        periodActivities.forEach((activity) => {
          typeStats[activity.type] += activity.duration;
        });

        const mostFrequentType = Object.entries(typeStats).reduce((a, b) =>
          typeStats[a[0] as ActivityType] > typeStats[b[0] as ActivityType] ? a : b
        )[0] as ActivityType;

        return {
          totalTime,
          activityCount,
          averageSession,
          mostFrequentType: activityCount > 0 ? mostFrequentType : null,
          typeStats,
          periodActivities,
        };
      },

      getAllTags: () => {
        const { activities } = get();
        const tagSet = new Set<string>();
        activities.forEach((activity) => {
          activity.tags.forEach((tag) => tagSet.add(tag));
        });
        return Array.from(tagSet).sort();
      },
    }),
    {
      name: 'activity-tracker-storage',
    }
  )
);
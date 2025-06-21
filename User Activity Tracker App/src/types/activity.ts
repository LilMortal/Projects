export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
  date: string; // YYYY-MM-DD format
  tags: string[];
  description?: string;
}

export type ActivityType = 'work' | 'exercise' | 'study' | 'break' | 'personal' | 'meeting';

export interface ActivityStats {
  totalTime: number;
  activityCount: number;
  averageSession: number;
  mostFrequentType: ActivityType | null;
  dailyStats: { [date: string]: number };
  typeStats: { [type in ActivityType]: number };
}

export interface FilterOptions {
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  types: ActivityType[];
  tags: string[];
  sortBy: 'recent' | 'duration' | 'type';
  sortOrder: 'asc' | 'desc';
}
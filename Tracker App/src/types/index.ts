export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  theme_preference: 'light' | 'dark' | 'system';
  notifications_enabled: boolean;
}

export interface Tracker {
  id: string;
  user_id: string;
  name: string;
  type: 'habit' | 'goal' | 'task';
  category: string;
  color: string;
  icon: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  target_value?: number;
  current_value: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  streak?: number;
  completion_rate?: number;
}

export interface TrackerLog {
  id: string;
  tracker_id: string;
  user_id: string;
  date: string;
  value: number;
  notes?: string;
  created_at: string;
}

export interface DashboardStats {
  total_trackers: number;
  active_trackers: number;
  completed_today: number;
  current_streak: number;
  weekly_completion_rate: number;
}

export interface TrackerFormData {
  name: string;
  type: 'habit' | 'goal' | 'task';
  category: string;
  color: string;
  icon: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  target_value?: number;
}
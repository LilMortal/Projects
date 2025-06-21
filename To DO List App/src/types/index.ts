export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: Priority;
  completed: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export interface TaskFilters {
  status: 'all' | 'completed' | 'incomplete';
  priority: Priority | 'all';
  tag: string | 'all';
}

export interface TaskSort {
  field: 'dueDate' | 'createdAt' | 'priority' | 'title';
  direction: 'asc' | 'desc';
}

export interface Theme {
  mode: 'light' | 'dark';
}
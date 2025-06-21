import { Activity, ActivityType } from '../types/activity';
import { format, differenceInMinutes } from 'date-fns';

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}m`;
  } else if (mins === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${mins}m`;
  }
};

export const formatTime = (date: Date): string => {
  return format(date, 'HH:mm');
};

export const formatDate = (date: Date): string => {
  return format(date, 'MMM dd, yyyy');
};

export const getActivityTypeColor = (type: ActivityType): string => {
  const colors = {
    work: 'bg-primary-100 text-primary-700 border-primary-200',
    exercise: 'bg-success-100 text-success-700 border-success-200',
    study: 'bg-secondary-100 text-secondary-700 border-secondary-200',
    break: 'bg-accent-100 text-accent-700 border-accent-200',
    personal: 'bg-purple-100 text-purple-700 border-purple-200',
    meeting: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  };
  return colors[type] || colors.work;
};

export const getActivityTypeIcon = (type: ActivityType): string => {
  const icons = {
    work: '💼',
    exercise: '🏃‍♂️',
    study: '📚',
    break: '☕',
    personal: '🏠',
    meeting: '👥',
  };
  return icons[type] || icons.work;
};

export const calculateDuration = (startTime: Date, endTime: Date): number => {
  return differenceInMinutes(endTime, startTime);
};

export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const exportToCSV = (activities: Activity[]): string => {
  const headers = ['Title', 'Type', 'Start Time', 'End Time', 'Duration (minutes)', 'Date', 'Tags', 'Description'];
  const rows = activities.map(activity => [
    activity.title,
    activity.type,
    formatTime(activity.startTime),
    formatTime(activity.endTime),
    activity.duration.toString(),
    activity.date,
    activity.tags.join('; '),
    activity.description || ''
  ]);
  
  return [headers, ...rows].map(row => row.map(field => `"${field}"`).join(',')).join('\n');
};
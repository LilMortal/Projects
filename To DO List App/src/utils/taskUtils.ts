import { Task, Priority, TaskFilters, TaskSort } from '../types';

export function filterTasks(tasks: Task[], filters: TaskFilters): Task[] {
  return tasks.filter(task => {
    // Status filter
    if (filters.status === 'completed' && !task.completed) return false;
    if (filters.status === 'incomplete' && task.completed) return false;

    // Priority filter
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false;

    // Tag filter
    if (filters.tag !== 'all' && !task.tags.includes(filters.tag)) return false;

    return true;
  });
}

export function sortTasks(tasks: Task[], sort: TaskSort): Task[] {
  return [...tasks].sort((a, b) => {
    let comparison = 0;

    switch (sort.field) {
      case 'dueDate':
        const aDate = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const bDate = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        comparison = aDate - bDate;
        break;
      case 'createdAt':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case 'priority':
        const priorityOrder = { [Priority.HIGH]: 3, [Priority.MEDIUM]: 2, [Priority.LOW]: 1 };
        comparison = priorityOrder[b.priority] - priorityOrder[a.priority];
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
    }

    return sort.direction === 'desc' ? -comparison : comparison;
  });
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Tomorrow';
  if (diffInDays === -1) return 'Yesterday';
  if (diffInDays > 1 && diffInDays <= 7) return `In ${diffInDays} days`;
  if (diffInDays < -1 && diffInDays >= -7) return `${Math.abs(diffInDays)} days ago`;

  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
}

export function isOverdue(dueDate: string): boolean {
  return new Date(dueDate) < new Date();
}

export function getPriorityColor(priority: Priority): string {
  switch (priority) {
    case Priority.HIGH:
      return 'text-red-600 dark:text-red-400';
    case Priority.MEDIUM:
      return 'text-yellow-600 dark:text-yellow-400';
    case Priority.LOW:
      return 'text-green-600 dark:text-green-400';
  }
}

export function getPriorityBadgeColor(priority: Priority): string {
  switch (priority) {
    case Priority.HIGH:
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    case Priority.MEDIUM:
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    case Priority.LOW:
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
  }
}
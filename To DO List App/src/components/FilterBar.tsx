import React from 'react';
import { Filter, ArrowUpDown, Tag, CheckCircle, Circle, AlertCircle } from 'lucide-react';
import { TaskFilters, TaskSort, Priority } from '../types';

interface FilterBarProps {
  filters: TaskFilters;
  sort: TaskSort;
  onFiltersChange: (filters: TaskFilters) => void;
  onSortChange: (sort: TaskSort) => void;
  availableTags: string[];
  taskCounts: {
    all: number;
    completed: number;
    incomplete: number;
  };
}

export function FilterBar({ 
  filters, 
  sort, 
  onFiltersChange, 
  onSortChange, 
  availableTags,
  taskCounts 
}: FilterBarProps) {
  const statusOptions = [
    { value: 'all', label: 'All Tasks', icon: Circle, count: taskCounts.all },
    { value: 'incomplete', label: 'Active', icon: Circle, count: taskCounts.incomplete },
    { value: 'completed', label: 'Completed', icon: CheckCircle, count: taskCounts.completed },
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: Priority.HIGH, label: 'High Priority' },
    { value: Priority.MEDIUM, label: 'Medium Priority' },
    { value: Priority.LOW, label: 'Low Priority' },
  ];

  const sortOptions = [
    { value: 'createdAt', label: 'Created Date' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'title', label: 'Title' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <h3 className="font-semibold text-gray-900 dark:text-white">Filters & Sorting</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <div className="space-y-1">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onFiltersChange({...filters, status: option.value as any})}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  filters.status === option.value
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <option.icon className="w-4 h-4" />
                  {option.label}
                </span>
                <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded-full">
                  {option.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Priority
          </label>
          <select
            value={filters.priority}
            onChange={(e) => onFiltersChange({...filters, priority: e.target.value as any})}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tag Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Tag className="w-4 h-4 inline mr-1" />
            Tags
          </label>
          <select
            value={filters.tag}
            onChange={(e) => onFiltersChange({...filters, tag: e.target.value})}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="all">All Tags</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <ArrowUpDown className="w-4 h-4 inline mr-1" />
            Sort By
          </label>
          <div className="flex gap-1">
            <select
              value={sort.field}
              onChange={(e) => onSortChange({...sort, field: e.target.value as any})}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => onSortChange({...sort, direction: sort.direction === 'asc' ? 'desc' : 'asc'})}
              className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                sort.direction === 'desc'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
              title={sort.direction === 'asc' ? 'Ascending' : 'Descending'}
            >
              {sort.direction === 'desc' ? '↓' : '↑'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
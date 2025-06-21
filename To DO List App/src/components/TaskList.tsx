import React from 'react';
import { CheckCircle2, ListTodo, Sparkles } from 'lucide-react';
import { Task } from '../types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export function TaskList({ tasks, onToggle, onEdit, onDelete, isLoading }: TaskListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 animate-pulse">
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl mb-4">
          <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No tasks found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
          Create your first task to get started on your productivity journey!
        </p>
        <div className="flex justify-center gap-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <ListTodo className="w-4 h-4" />
            Organize your work
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Track progress
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
import React, { useState } from 'react';
import { Check, Edit2, Trash2, Calendar, Tag, Clock } from 'lucide-react';
import { Task } from '../types';
import { formatDate, isOverdue, getPriorityColor, getPriorityBadgeColor } from '../utils/taskUtils';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleDelete = () => {
    if (showConfirmDelete) {
      onDelete(task.id);
      setShowConfirmDelete(false);
    } else {
      setShowConfirmDelete(true);
      setTimeout(() => setShowConfirmDelete(false), 3000);
    }
  };

  const dueDateClass = task.dueDate && isOverdue(task.dueDate) && !task.completed
    ? 'text-red-600 dark:text-red-400'
    : 'text-gray-500 dark:text-gray-400';

  return (
    <div className={`group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 ${
      task.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggle(task.id)}
          className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            task.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-400'
          }`}
        >
          {task.completed && <Check className="w-4 h-4" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className={`font-semibold text-lg mb-1 ${
                task.completed 
                  ? 'line-through text-gray-500 dark:text-gray-400' 
                  : 'text-gray-900 dark:text-white'
              }`}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={`text-sm mb-3 ${
                  task.completed 
                    ? 'line-through text-gray-400 dark:text-gray-500' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {task.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadgeColor(task.priority)}`}>
                  {task.priority} priority
                </span>

                {task.dueDate && (
                  <span className={`inline-flex items-center gap-1 ${dueDateClass}`}>
                    <Calendar className="w-3 h-3" />
                    {formatDate(task.dueDate)}
                  </span>
                )}

                {task.tags.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Tag className="w-3 h-3 text-gray-400" />
                    <div className="flex gap-1">
                      {task.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <span className="inline-flex items-center gap-1 text-gray-400 text-xs">
                  <Clock className="w-3 h-3" />
                  {formatDate(task.createdAt)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => onEdit(task)}
                className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                title="Edit task"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  showConfirmDelete
                    ? 'text-white bg-red-600 hover:bg-red-700'
                    : 'text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                }`}
                title={showConfirmDelete ? 'Click again to confirm' : 'Delete task'}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
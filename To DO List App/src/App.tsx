import React, { useState } from 'react';
import { Plus, CheckSquare, BarChart3, Trash2 } from 'lucide-react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { FilterBar } from './components/FilterBar';
import { ThemeToggle } from './components/ThemeToggle';
import { useTasks } from './hooks/useTasks';
import { Task } from './types';

function App() {
  const {
    tasks,
    allTasks,
    filters,
    sort,
    allTags,
    taskStats,
    setFilters,
    setSort,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    clearCompleted
  } = useTasks();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const handleCreateTask = () => {
    setEditingTask(undefined);
    setIsFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleSubmitTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
    setIsFormOpen(false);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingTask(undefined);
  };

  const taskCounts = {
    all: allTasks.length,
    completed: allTasks.filter(t => t.completed).length,
    incomplete: allTasks.filter(t => !t.completed).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <CheckSquare className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                TaskFlow
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Stay organized, stay productive
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={handleCreateTask}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add Task</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {taskStats.total}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Tasks</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {taskStats.completed}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Completed</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <CheckSquare className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {taskStats.incomplete}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Remaining</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                <Plus className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {taskStats.highPriority}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">High Priority</p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                <Plus className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Filters */}
          <FilterBar
            filters={filters}
            sort={sort}
            onFiltersChange={setFilters}
            onSortChange={setSort}
            availableTags={allTags}
            taskCounts={taskCounts}
          />

          {/* Quick Actions */}
          {taskStats.completed > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                    <CheckSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Great job! You've completed {taskStats.completed} task{taskStats.completed !== 1 ? 's' : ''}.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Keep up the momentum!
                    </p>
                  </div>
                </div>
                <button
                  onClick={clearCompleted}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Completed
                </button>
              </div>
            </div>
          )}

          {/* Task List */}
          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onEdit={handleEditTask}
            onDelete={deleteTask}
          />
        </div>

        {/* Task Form Modal */}
        <TaskForm
          task={editingTask}
          onSubmit={handleSubmitTask}
          onCancel={handleCancelForm}
          isOpen={isFormOpen}
        />
      </div>
    </div>
  );
}

export default App;
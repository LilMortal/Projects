import { useState, useMemo } from 'react';
import { Task, Priority, TaskFilters, TaskSort } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { sortTasks, filterTasks } from '../utils/taskUtils';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('taskflow-tasks', []);
  const [filters, setFilters] = useState<TaskFilters>({
    status: 'all',
    priority: 'all',
    tag: 'all'
  });
  const [sort, setSort] = useState<TaskSort>({
    field: 'createdAt',
    direction: 'desc'
  });

  const filteredAndSortedTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filters);
    return sortTasks(filtered, sort);
  }, [tasks, filters, sort]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    tasks.forEach(task => task.tags.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [tasks]);

  const taskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const incomplete = total - completed;
    const highPriority = tasks.filter(task => task.priority === Priority.HIGH && !task.completed).length;
    
    return { total, completed, incomplete, highPriority };
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    updateTask(id, { completed: !tasks.find(task => task.id === id)?.completed });
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  return {
    tasks: filteredAndSortedTasks,
    allTasks: tasks,
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
  };
}
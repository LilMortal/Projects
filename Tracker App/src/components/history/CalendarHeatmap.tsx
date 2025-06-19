import React from 'react';
import { motion } from 'framer-motion';
import { Tracker } from '../../types';
import { format, subDays, eachDayOfInterval, startOfYear } from 'date-fns';

interface CalendarHeatmapProps {
  trackers: Tracker[];
}

export function CalendarHeatmap({ trackers }: CalendarHeatmapProps) {
  const today = new Date();
  const startDate = startOfYear(today);
  const days = eachDayOfInterval({ start: startDate, end: today });

  // Mock data - in a real app, this would come from tracker logs
  const getActivityLevel = (date: Date): number => {
    const daysSinceStart = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    return Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0;
  };

  const getIntensityColor = (level: number): string => {
    const colors = [
      'bg-gray-100 dark:bg-gray-800', // 0 - no activity
      'bg-green-200 dark:bg-green-900', // 1 - low
      'bg-green-300 dark:bg-green-700', // 2 - medium
      'bg-green-400 dark:bg-green-600', // 3 - high
      'bg-green-500 dark:bg-green-500', // 4 - very high
    ];
    return colors[level] || colors[0];
  };

  // Group days by week
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];
  
  days.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === days.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Activity Heatmap
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Your tracking activity throughout the year
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="flex mb-2">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="flex-1 text-xs text-gray-500 dark:text-gray-400">
                {format(new Date(today.getFullYear(), i, 1), 'MMM')}
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          <div className="grid grid-cols-53 gap-1">
            {days.map((day, index) => {
              const level = getActivityLevel(day);
              return (
                <motion.div
                  key={day.toISOString()}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.001 }}
                  className={`w-3 h-3 rounded-sm ${getIntensityColor(level)} hover:ring-2 hover:ring-primary-300 dark:hover:ring-primary-600 cursor-pointer transition-all`}
                  title={`${format(day, 'MMM d, yyyy')} - ${level} activities`}
                />
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {format(startDate, 'MMM yyyy')} - {format(today, 'MMM yyyy')}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Less</span>
              <div className="flex space-x-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-sm ${getIntensityColor(level)}`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">More</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {days.filter(day => getActivityLevel(day) > 0).length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Active Days</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {Math.round((days.filter(day => getActivityLevel(day) > 0).length / days.length) * 100)}%
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Consistency</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {Math.max(...days.map(day => getActivityLevel(day)))}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Peak Day</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {trackers.reduce((sum, t) => sum + (t.streak || 0), 0)}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Streaks</div>
        </div>
      </div>
    </div>
  );
}
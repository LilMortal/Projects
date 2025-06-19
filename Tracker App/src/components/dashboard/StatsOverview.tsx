import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Calendar, Flame } from 'lucide-react';
import { Tracker } from '../../types';
import { format, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

interface StatsOverviewProps {
  trackers: Tracker[];
}

export function StatsOverview({ trackers }: StatsOverviewProps) {
  const stats = React.useMemo(() => {
    const totalTrackers = trackers.length;
    const activeTrackers = trackers.filter(t => t.is_active).length;
    const completedToday = trackers.filter(t => t.current_value > 0).length;
    const averageStreak = trackers.reduce((sum, t) => sum + (t.streak || 0), 0) / totalTrackers || 0;

    return {
      totalTrackers,
      activeTrackers,
      completedToday,
      averageStreak: Math.round(averageStreak),
    };
  }, [trackers]);

  const statCards = [
    {
      title: 'Total Trackers',
      value: stats.totalTrackers,
      icon: Target,
      color: 'primary',
      change: '+2 this week',
    },
    {
      title: 'Active Today',
      value: stats.activeTrackers,
      icon: TrendingUp,
      color: 'success',
      change: `${stats.completedToday}/${stats.activeTrackers} completed`,
    },
    {
      title: 'This Week',
      value: `${Math.round((stats.completedToday / stats.activeTrackers) * 100) || 0}%`,
      icon: Calendar,
      color: 'accent',
      change: 'completion rate',
    },
    {
      title: 'Average Streak',
      value: `${stats.averageStreak} days`,
      icon: Flame,
      color: 'error',
      change: 'keep it up!',
    },
  ];

  const colorClasses = {
    primary: 'bg-primary-500 text-white',
    success: 'bg-success-500 text-white',
    accent: 'bg-accent-500 text-white',
    error: 'bg-error-500 text-white',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {stat.change}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
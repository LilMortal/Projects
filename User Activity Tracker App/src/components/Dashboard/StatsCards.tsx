import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Activity as ActivityIcon, TrendingUp, Target } from 'lucide-react';
import { formatDuration } from '../../utils/activityHelpers';

interface StatsCardsProps {
  stats: {
    totalTime: number;
    activityCount: number;
    averageSession: number;
    mostFrequentType: string | null;
  };
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Total Time',
      value: formatDuration(stats.totalTime),
      icon: Clock,
      color: 'from-primary-400 to-primary-600',
      bgColor: 'bg-primary-50 dark:bg-primary-900/20',
      textColor: 'text-primary-600 dark:text-primary-400',
    },
    {
      title: 'Activities',
      value: stats.activityCount.toString(),
      icon: ActivityIcon,
      color: 'from-success-400 to-success-600',
      bgColor: 'bg-success-50 dark:bg-success-900/20',
      textColor: 'text-success-600 dark:text-success-400',
    },
    {
      title: 'Avg Session',
      value: formatDuration(Math.round(stats.averageSession)),
      icon: TrendingUp,
      color: 'from-secondary-400 to-secondary-600',
      bgColor: 'bg-secondary-50 dark:bg-secondary-900/20',
      textColor: 'text-secondary-600 dark:text-secondary-400',
    },
    {
      title: 'Most Frequent',
      value: stats.mostFrequentType || 'None',
      icon: Target,
      color: 'from-accent-400 to-accent-600',
      bgColor: 'bg-accent-50 dark:bg-accent-900/20',
      textColor: 'text-accent-600 dark:text-accent-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className={`${card.bgColor} backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-lg`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {card.title}
              </p>
              <p className={`text-2xl font-bold ${card.textColor}`}>
                {card.value}
              </p>
            </div>
            <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color}`}>
              <card.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
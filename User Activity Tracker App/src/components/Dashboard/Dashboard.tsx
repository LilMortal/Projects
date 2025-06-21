import React from 'react';
import { motion } from 'framer-motion';
import { useActivityStore } from '../../store/activityStore';
import { StatsCards } from './StatsCards';
import { ActivityChart } from './ActivityChart';
import { RecentActivities } from './RecentActivities';
import { TimeDistribution } from './TimeDistribution';

export const Dashboard: React.FC = () => {
  const { getActivityStats, getFilteredActivities } = useActivityStore();
  const stats = getActivityStats('week');
  const recentActivities = getFilteredActivities().slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h2>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          This Week's Activity
        </div>
      </div>

      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityChart />
        <TimeDistribution />
      </div>

      <RecentActivities activities={recentActivities} />
    </motion.div>
  );
};
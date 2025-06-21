import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useActivityStore } from '../../store/activityStore';
import { formatDuration } from '../../utils/activityHelpers';

export const TimeDistribution: React.FC = () => {
  const { getActivityStats } = useActivityStore();
  const stats = getActivityStats('week');

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  const data = Object.entries(stats.typeStats)
    .filter(([, duration]) => duration > 0)
    .map(([type, duration]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      value: duration,
      percentage: stats.totalTime > 0 ? Math.round((duration / stats.totalTime) * 100) : 0,
    }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white">{data.name}</p>
          <p className="text-primary-600 dark:text-primary-400">
            {formatDuration(data.value)} ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-lg"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Time Distribution
      </h3>
      
      {data.length > 0 ? (
        <div className="flex items-center space-x-6">
          <div className="h-48 w-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex-1 space-y-2">
            {data.map((item, index) => (
              <div key={item.name} className="flex items-center space-x-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 flex-1">
                  {item.name}
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-48 text-gray-500 dark:text-gray-400">
          No activities recorded this week
        </div>
      )}
    </motion.div>
  );
};
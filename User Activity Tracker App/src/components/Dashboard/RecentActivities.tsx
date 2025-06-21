import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from '../../types/activity';
import { formatTime, formatDuration, getActivityTypeColor, getActivityTypeIcon } from '../../utils/activityHelpers';

interface RecentActivitiesProps {
  activities: Activity[];
}

export const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-lg"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Activities
      </h3>
      
      {activities.length > 0 ? (
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="text-2xl">{getActivityTypeIcon(activity.type)}</div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 dark:text-white truncate">
                  {activity.title}
                </h4>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>{formatTime(activity.startTime)} - {formatTime(activity.endTime)}</span>
                  <span>•</span>
                  <span>{formatDuration(activity.duration)}</span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getActivityTypeColor(activity.type)}`}>
                {activity.type}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No recent activities to display
        </div>
      )}
    </motion.div>
  );
};
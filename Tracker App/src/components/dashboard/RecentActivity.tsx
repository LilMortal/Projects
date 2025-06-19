import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Target, Calendar } from 'lucide-react';
import { Tracker } from '../../types';
import { format } from 'date-fns';

interface RecentActivityProps {
  trackers: Tracker[];
}

export function RecentActivity({ trackers }: RecentActivityProps) {
  // Mock recent activity data - in a real app, this would come from tracker logs
  const recentActivities = React.useMemo(() => {
    return trackers.slice(0, 5).map((tracker, index) => ({
      id: `activity-${index}`,
      trackerId: tracker.id,
      trackerName: tracker.name,
      type: tracker.type,
      action: tracker.current_value > 0 ? 'completed' : 'logged',
      timestamp: new Date(Date.now() - index * 3600000), // Mock timestamps
      value: tracker.current_value,
      color: tracker.color,
    }));
  }, [trackers]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'habit':
        return Calendar;
      case 'goal':
        return Target;
      case 'task':
        return TrendingUp;
      default:
        return Clock;
    }
  };

  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-xl font-semibold text-gray-900 dark:text-white mb-6"
      >
        Recent Activity
      </motion.h2>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        {recentActivities.length === 0 ? (
          <div className="p-6 text-center">
            <Clock className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No recent activity</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentActivities.map((activity, index) => {
              const ActivityIcon = getActivityIcon(activity.type);
              
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="p-2 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: `${activity.color}20` }}
                    >
                      <ActivityIcon 
                        className="w-4 h-4"
                        style={{ color: activity.color }}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {activity.trackerName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.action} • {format(activity.timestamp, 'HH:mm')}
                      </p>
                    </div>

                    {activity.value > 0 && (
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                          +{activity.value}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 grid grid-cols-2 gap-4"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
            {trackers.filter(t => t.current_value > 0).length}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Completed Today
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-accent-600 dark:text-accent-400 mb-1">
            {Math.round(trackers.reduce((sum, t) => sum + (t.streak || 0), 0) / trackers.length) || 0}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Avg. Streak
          </div>
        </div>
      </motion.div>
    </div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Clock, Calendar, Tag } from 'lucide-react';
import { Activity } from '../../types/activity';
import { formatTime, formatDate, formatDuration, getActivityTypeColor, getActivityTypeIcon } from '../../utils/activityHelpers';

interface ActivityCardProps {
  activity: Activity;
  index: number;
  onEdit: (activity: Activity) => void;
  onDelete: (id: string) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity, index, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{getActivityTypeIcon(activity.type)}</div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
              {activity.title}
            </h3>
            <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getActivityTypeColor(activity.type)} mt-1`}>
              {activity.type}
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(activity)}
            className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <Edit className="h-4 w-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(activity.id)}
            className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      {activity.description && (
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {activity.description}
        </p>
      )}

      <div className="space-y-2 text-sm">
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <Clock className="h-4 w-4" />
          <span>{formatTime(activity.startTime)} - {formatTime(activity.endTime)}</span>
          <span className="font-medium text-primary-600 dark:text-primary-400">
            ({formatDuration(activity.duration)})
          </span>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(activity.startTime)}</span>
        </div>

        {activity.tags.length > 0 && (
          <div className="flex items-start space-x-2 text-gray-600 dark:text-gray-400">
            <Tag className="h-4 w-4 mt-0.5" />
            <div className="flex flex-wrap gap-1">
              {activity.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
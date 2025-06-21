import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useActivityStore } from '../../store/activityStore';
import { ActivityCard } from './ActivityCard';
import { ActivityFilters } from './ActivityFilters';
import { SearchBar } from './SearchBar';
import { Activity } from '../../types/activity';

export const ActivityList: React.FC = () => {
  const { getFilteredActivities, deleteActivity, setCurrentActivity } = useActivityStore();
  const [searchTerm, setSearchTerm] = useState('');
  
  const activities = getFilteredActivities();
  const filteredActivities = activities.filter(activity =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEdit = (activity: Activity) => {
    setCurrentActivity(activity);
  };

  const handleDelete = (id: string) => {
    deleteActivity(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Activities
        </h2>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {filteredActivities.length} activities
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0">
        <div className="flex-1">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
        <ActivityFilters />
      </div>

      {filteredActivities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity, index) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              index={index}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📊</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No activities found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm ? 'Try adjusting your search or filters' : 'Start tracking your activities to see them here'}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};
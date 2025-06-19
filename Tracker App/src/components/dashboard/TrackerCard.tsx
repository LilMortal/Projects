import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Plus, 
  Minus, 
  Flame, 
  Target, 
  Calendar,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';
import { Tracker } from '../../types';
import { useTrackers } from '../../hooks/useTrackers';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { Dropdown } from '../ui/Dropdown';

interface TrackerCardProps {
  tracker: Tracker;
}

export function TrackerCard({ tracker }: TrackerCardProps) {
  const { logProgress, deleteTracker } = useTrackers();
  const [isLogging, setIsLogging] = useState(false);
  const [currentValue, setCurrentValue] = useState(tracker.current_value);

  const handleQuickLog = async (value: number) => {
    setIsLogging(true);
    try {
      await logProgress(tracker.id, value);
      setCurrentValue(value);
    } finally {
      setIsLogging(false);
    }
  };

  const handleIncrementLog = async () => {
    const newValue = currentValue + 1;
    await handleQuickLog(newValue);
  };

  const handleDecrementLog = async () => {
    const newValue = Math.max(0, currentValue - 1);
    await handleQuickLog(newValue);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this tracker?')) {
      await deleteTracker(tracker.id);
    }
  };

  const progressPercentage = tracker.target_value 
    ? Math.min((currentValue / tracker.target_value) * 100, 100)
    : currentValue > 0 ? 100 : 0;

  const getTypeIcon = () => {
    switch (tracker.type) {
      case 'habit':
        return Calendar;
      case 'goal':
        return Target;
      case 'task':
        return Check;
      default:
        return Target;
    }
  };

  const TypeIcon = getTypeIcon();

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${tracker.color}20` }}
          >
            <TypeIcon 
              className="w-5 h-5"
              style={{ color: tracker.color }}
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {tracker.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
              {tracker.type} • {tracker.frequency}
            </p>
          </div>
        </div>

        <Dropdown
          trigger={
            <IconButton variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </IconButton>
          }
          items={[
            {
              label: 'Edit',
              icon: Edit,
              onClick: () => console.log('Edit tracker'),
            },
            {
              label: 'Delete',
              icon: Trash2,
              onClick: handleDelete,
              destructive: true,
            },
          ]}
        />
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {tracker.target_value 
              ? `${currentValue}/${tracker.target_value}`
              : currentValue
            }
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
            className="h-2 rounded-full"
            style={{ backgroundColor: tracker.color }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-orange-500 mb-1">
            <Flame className="w-4 h-4" />
            <span className="text-sm font-medium">{tracker.streak || 0}</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Day Streak</p>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
            {Math.round(tracker.completion_rate || 0)}%
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Completion</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center space-x-2">
        {tracker.type === 'habit' || tracker.type === 'goal' ? (
          <>
            <IconButton
              onClick={handleDecrementLog}
              disabled={isLogging || currentValue === 0}
              variant="outline"
              size="sm"
            >
              <Minus className="w-4 h-4" />
            </IconButton>
            
            <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <span className="font-medium text-gray-900 dark:text-white">
                {currentValue}
              </span>
            </div>

            <IconButton
              onClick={handleIncrementLog}
              disabled={isLogging}
              variant="outline"
              size="sm"
            >
              <Plus className="w-4 h-4" />
            </IconButton>
          </>
        ) : (
          <Button
            onClick={() => handleQuickLog(currentValue > 0 ? 0 : 1)}
            loading={isLogging}
            variant={currentValue > 0 ? 'success' : 'primary'}
            size="sm"
            className="w-full"
          >
            {currentValue > 0 ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Completed
              </>
            ) : (
              'Mark Complete'
            )}
          </Button>
        )}
      </div>
    </motion.div>
  );
}
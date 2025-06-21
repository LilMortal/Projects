import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Clock, Calendar, Tag, Type, FileText } from 'lucide-react';
import { useActivityStore } from '../../store/activityStore';
import { ActivityType } from '../../types/activity';
import { calculateDuration } from '../../utils/activityHelpers';
import { format } from 'date-fns';

export const ActivityForm: React.FC = () => {
  const { currentActivity, addActivity, updateActivity, setCurrentActivity } = useActivityStore();
  const [formData, setFormData] = useState({
    title: '',
    type: 'work' as ActivityType,
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: format(new Date(), 'HH:mm'),
    endTime: format(new Date(Date.now() + 60 * 60 * 1000), 'HH:mm'),
    description: '',
    tags: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (currentActivity) {
      setFormData({
        title: currentActivity.title,
        type: currentActivity.type,
        date: currentActivity.date,
        startTime: format(currentActivity.startTime, 'HH:mm'),
        endTime: format(currentActivity.endTime, 'HH:mm'),
        description: currentActivity.description || '',
        tags: currentActivity.tags.join(', '),
      });
    }
  }, [currentActivity]);

  const activityTypes: { value: ActivityType; label: string; emoji: string }[] = [
    { value: 'work', label: 'Work', emoji: '💼' },
    { value: 'exercise', label: 'Exercise', emoji: '🏃‍♂️' },
    { value: 'study', label: 'Study', emoji: '📚' },
    { value: 'break', label: 'Break', emoji: '☕' },
    { value: 'personal', label: 'Personal', emoji: '🏠' },
    { value: 'meeting', label: 'Meeting', emoji: '👥' },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }

    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    }

    if (formData.startTime && formData.endTime) {
      const start = new Date(`${formData.date} ${formData.startTime}`);
      const end = new Date(`${formData.date} ${formData.endTime}`);
      
      if (end <= start) {
        newErrors.endTime = 'End time must be after start time';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const startTime = new Date(`${formData.date} ${formData.startTime}`);
    const endTime = new Date(`${formData.date} ${formData.endTime}`);
    const duration = calculateDuration(startTime, endTime);
    const tags = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const activityData = {
      title: formData.title,
      type: formData.type,
      startTime,
      endTime,
      duration,
      date: formData.date,
      tags,
      description: formData.description,
    };

    if (currentActivity) {
      updateActivity(currentActivity.id, activityData);
    } else {
      addActivity(activityData);
    }

    handleReset();
  };

  const handleReset = () => {
    setFormData({
      title: '',
      type: 'work',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: format(new Date(), 'HH:mm'),
      endTime: format(new Date(Date.now() + 60 * 60 * 1000), 'HH:mm'),
      description: '',
      tags: '',
    });
    setErrors({});
    setCurrentActivity(null);
  };

  const duration = calculateDuration(
    new Date(`${formData.date} ${formData.startTime}`),
    new Date(`${formData.date} ${formData.endTime}`)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-700/50 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {currentActivity ? 'Edit Activity' : 'Add New Activity'}
          </h2>
          {currentActivity && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="h-5 w-5" />
            </motion.button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Type className="h-4 w-4" />
              <span>Activity Title</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.title
                  ? 'border-red-300 dark:border-red-600'
                  : 'border-gray-200 dark:border-gray-700'
              } bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200`}
              placeholder="What did you work on?"
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
            )}
          </div>

          {/* Activity Type */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Tag className="h-4 w-4" />
              <span>Activity Type</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {activityTypes.map((type) => (
                <motion.button
                  key={type.value}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData({ ...formData, type: type.value })}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    formData.type === type.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="text-2xl mb-1">{type.emoji}</div>
                  <div className="text-sm font-medium">{type.label}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="h-4 w-4" />
                <span>Date</span>
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Clock className="h-4 w-4" />
                <span>Start Time</span>
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.startTime
                    ? 'border-red-300 dark:border-red-600'
                    : 'border-gray-200 dark:border-gray-700'
                } bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200`}
              />
              {errors.startTime && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.startTime}</p>
              )}
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Clock className="h-4 w-4" />
                <span>End Time</span>
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.endTime
                    ? 'border-red-300 dark:border-red-600'
                    : 'border-gray-200 dark:border-gray-700'
                } bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200`}
              />
              {errors.endTime && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.endTime}</p>
              )}
            </div>
          </div>

          {/* Duration Display */}
          {duration > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-200 dark:border-primary-800"
            >
              <p className="text-primary-700 dark:text-primary-300 text-sm font-medium">
                Duration: {Math.floor(duration / 60)}h {duration % 60}m
              </p>
            </motion.div>
          )}

          {/* Description */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FileText className="h-4 w-4" />
              <span>Description (Optional)</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 resize-none"
              placeholder="Add any additional notes..."
            />
          </div>

          {/* Tags */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Tag className="h-4 w-4" />
              <span>Tags (Optional)</span>
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
              placeholder="focus, important, project-x (separate with commas)"
            />
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4 pt-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-xl hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200"
            >
              <Save className="h-5 w-5" />
              <span>{currentActivity ? 'Update Activity' : 'Save Activity'}</span>
            </motion.button>

            {currentActivity && (
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReset}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
              >
                Cancel
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );
};
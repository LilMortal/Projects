import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Target, 
  Calendar, 
  CheckSquare, 
  ArrowLeft,
  Palette,
  Hash
} from 'lucide-react';
import { useTrackers } from '../../hooks/useTrackers';
import { TrackerFormData } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { ColorPicker } from '../ui/ColorPicker';
import { IconPicker } from '../ui/IconPicker';
import toast from 'react-hot-toast';

const trackerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name must be less than 50 characters'),
  type: z.enum(['habit', 'goal', 'task']),
  category: z.string().min(1, 'Category is required'),
  color: z.string().min(1, 'Color is required'),
  icon: z.string().min(1, 'Icon is required'),
  frequency: z.enum(['daily', 'weekly', 'monthly']),
  target_value: z.number().optional(),
});

interface CreateTrackerFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function CreateTrackerForm({ onBack, onSuccess }: CreateTrackerFormProps) {
  const { createTracker } = useTrackers();
  const [loading, setLoading] = React.useState(false);

  const form = useForm<TrackerFormData>({
    resolver: zodResolver(trackerSchema),
    defaultValues: {
      name: '',
      type: 'habit',
      category: '',
      color: '#4F46E5',
      icon: 'target',
      frequency: 'daily',
    },
  });

  const watchedType = form.watch('type');

  const handleSubmit = async (data: TrackerFormData) => {
    setLoading(true);
    try {
      const { error } = await createTracker(data);
      if (!error) {
        toast.success('Tracker created successfully!');
        onSuccess();
      }
    } finally {
      setLoading(false);
    }
  };

  const typeOptions = [
    { value: 'habit', label: 'Habit', icon: Calendar, description: 'Recurring activities' },
    { value: 'goal', label: 'Goal', icon: Target, description: 'Measurable objectives' },
    { value: 'task', label: 'Task', icon: CheckSquare, description: 'One-time activities' },
  ];

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
  ];

  const categoryOptions = [
    { value: 'health', label: 'Health & Fitness' },
    { value: 'productivity', label: 'Productivity' },
    { value: 'learning', label: 'Learning' },
    { value: 'personal', label: 'Personal' },
    { value: 'work', label: 'Work' },
    { value: 'social', label: 'Social' },
    { value: 'creative', label: 'Creative' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8"
      >
        <div className="flex items-center space-x-4 mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create New Tracker
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Set up a new habit, goal, or task to track
            </p>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <Input
              {...form.register('name')}
              label="Tracker Name"
              placeholder="e.g., Morning Workout, Read 30 Minutes"
              error={form.formState.errors.name?.message}
            />
          </div>

          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Tracker Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {typeOptions.map((option) => (
                <motion.label
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    form.watch('type') === option.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <input
                    {...form.register('type')}
                    type="radio"
                    value={option.value}
                    className="sr-only"
                  />
                  <div className="flex items-center space-x-3">
                    <option.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {option.label}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {option.description}
                      </div>
                    </div>
                  </div>
                </motion.label>
              ))}
            </div>
            {form.formState.errors.type && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {form.formState.errors.type.message}
              </p>
            )}
          </div>

          {/* Category and Frequency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              {...form.register('category')}
              label="Category"
              options={categoryOptions}
              error={form.formState.errors.category?.message}
            />
            
            <Select
              {...form.register('frequency')}
              label="Frequency"
              options={frequencyOptions}
              error={form.formState.errors.frequency?.message}
            />
          </div>

          {/* Target Value for Goals */}
          {watchedType === 'goal' && (
            <div>
              <Input
                {...form.register('target_value', { valueAsNumber: true })}
                type="number"
                label="Target Value"
                placeholder="e.g., 10000 (steps), 5 (books)"
                icon={Hash}
                error={form.formState.errors.target_value?.message}
              />
            </div>
          )}

          {/* Color and Icon */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Color
              </label>
              <ColorPicker
                value={form.watch('color')}
                onChange={(color) => form.setValue('color', color)}
              />
              {form.formState.errors.color && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {form.formState.errors.color.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Icon
              </label>
              <IconPicker
                value={form.watch('icon')}
                onChange={(icon) => form.setValue('icon', icon)}
                color={form.watch('color')}
              />
              {form.formState.errors.icon && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {form.formState.errors.icon.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              onClick={onBack}
              variant="ghost"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={loading}
              className="min-w-[120px]"
            >
              Create Tracker
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
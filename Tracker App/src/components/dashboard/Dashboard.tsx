import React from 'react';
import { motion } from 'framer-motion';
import { useTrackers } from '../../hooks/useTrackers';
import { StatsOverview } from './StatsOverview';
import { TrackerGrid } from './TrackerGrid';
import { RecentActivity } from './RecentActivity';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { EmptyState } from '../ui/EmptyState';
import { Target, Plus } from 'lucide-react';

interface DashboardProps {
  onCreateTracker: () => void;
}

export function Dashboard({ onCreateTracker }: DashboardProps) {
  const { trackers, loading } = useTrackers();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (trackers.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <EmptyState
          icon={Target}
          title="No trackers yet"
          description="Create your first tracker to start monitoring your habits and goals."
          action={{
            label: 'Create Tracker',
            onClick: onCreateTracker,
            icon: Plus,
          }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
        >
          Dashboard
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-400"
        >
          Track your progress and stay motivated
        </motion.p>
      </div>

      <StatsOverview trackers={trackers} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TrackerGrid trackers={trackers} />
        </div>
        <div>
          <RecentActivity trackers={trackers} />
        </div>
      </div>
    </motion.div>
  );
}
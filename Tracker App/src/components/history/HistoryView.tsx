import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, BarChart3, Filter } from 'lucide-react';
import { useTrackers } from '../../hooks/useTrackers';
import { CalendarHeatmap } from './CalendarHeatmap';
import { ProgressCharts } from './ProgressCharts';
import { Button } from '../ui/Button';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export function HistoryView() {
  const { trackers, loading } = useTrackers();
  const [view, setView] = useState<'calendar' | 'charts'>('calendar');

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
          >
            History & Analytics
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 dark:text-gray-400"
          >
            View your progress over time and analyze your patterns
          </motion.p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setView('calendar')}
            variant={view === 'calendar' ? 'primary' : 'outline'}
            size="sm"
            className="flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Calendar</span>
          </Button>
          <Button
            onClick={() => setView('charts')}
            variant={view === 'charts' ? 'primary' : 'outline'}
            size="sm"
            className="flex items-center space-x-2"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Charts</span>
          </Button>
        </div>
      </div>

      <motion.div
        key={view}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {view === 'calendar' ? (
          <CalendarHeatmap trackers={trackers} />
        ) : (
          <ProgressCharts trackers={trackers} />
        )}
      </motion.div>
    </motion.div>
  );
}
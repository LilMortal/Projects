import React from 'react';
import { motion } from 'framer-motion';
import { Tracker } from '../../types';
import { TrackerCard } from './TrackerCard';

interface TrackerGridProps {
  trackers: Tracker[];
}

export function TrackerGrid({ trackers }: TrackerGridProps) {
  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-xl font-semibold text-gray-900 dark:text-white mb-6"
      >
        Today's Trackers
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trackers.map((tracker, index) => (
          <motion.div
            key={tracker.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <TrackerCard tracker={tracker} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
        <Icon className="w-12 h-12 text-gray-400 dark:text-gray-600" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        {description}
      </p>
      
      {action && (
        <Button onClick={action.onClick} className="inline-flex items-center space-x-2">
          {action.icon && <action.icon className="w-4 h-4" />}
          <span>{action.label}</span>
        </Button>
      )}
    </motion.div>
  );
}
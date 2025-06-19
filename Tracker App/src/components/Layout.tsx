import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { Navigation } from './Navigation';
import { LoadingSpinner } from './ui/LoadingSpinner';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4 py-8"
      >
        {children}
      </motion.main>
    </div>
  );
}
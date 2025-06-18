import React from 'react';
import { useAuthStore } from '../store/authStore';
import { Navbar } from './Navbar';
import { AuthFlow } from './auth/AuthFlow';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated, profile } = useAuthStore();

  if (!isAuthenticated || !profile) {
    return <AuthFlow />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
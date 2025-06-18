import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { ProfileSetupForm } from './ProfileSetupForm';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export function AuthFlow() {
  const { user, profile, initialize } = useAuthStore();
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      await initialize();
      setIsInitializing(false);
    };
    initAuth();
  }, [initialize]);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 dark:from-dark-900 dark:to-dark-800 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // If user exists but no profile, show profile setup
  if (user && !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 dark:from-dark-900 dark:to-dark-800 flex items-center justify-center p-4">
        <ProfileSetupForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 dark:from-dark-900 dark:to-dark-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            InstaClone
          </h1>
          <p className="text-gray-600 dark:text-dark-300">
            Share your moments with the world
          </p>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8 animate-fade-in">
          {authMode === 'signin' ? (
            <SignInForm onSwitchToSignUp={() => setAuthMode('signup')} />
          ) : (
            <SignUpForm onSwitchToSignIn={() => setAuthMode('signin')} />
          )}
        </div>
      </div>
    </div>
  );
}
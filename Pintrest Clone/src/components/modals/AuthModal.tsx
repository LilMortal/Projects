import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

export const AuthModal: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { login, signup, isLoading } = useAuthStore();
  const { authMode, setShowAuthModal, setAuthMode } = useAppStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData | SignupFormData>({
    resolver: zodResolver(authMode === 'login' ? loginSchema : signupSchema),
  });

  const handleClose = () => {
    setShowAuthModal(false);
    reset();
  };

  const switchMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
    reset();
  };

  const onSubmit = async (data: LoginFormData | SignupFormData) => {
    try {
      if (authMode === 'login') {
        const loginData = data as LoginFormData;
        await login(loginData.email, loginData.password);
      } else {
        const signupData = data as SignupFormData;
        await signup(signupData.email, signupData.password, signupData.name);
      }
      handleClose();
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-dark-bg rounded-2xl w-full max-w-md animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {authMode === 'login' ? 'Welcome back' : 'Join Pinterest'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-surface rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {authMode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  {...register('name' as keyof SignupFormData)}
                  type="text"
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pinterest-red bg-white dark:bg-dark-surface"
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                {...register('email')}
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pinterest-red bg-white dark:bg-dark-surface"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pinterest-red bg-white dark:bg-dark-surface"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {authMode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  {...register('confirmPassword' as keyof SignupFormData)}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pinterest-red bg-white dark:bg-dark-surface"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-pinterest-red text-white py-3 rounded-lg font-medium hover:bg-pinterest-red-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Please wait...' : (authMode === 'login' ? 'Log in' : 'Sign up')}
          </button>

          {/* Demo Account */}
          {authMode === 'login' && (
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Demo account: demo@example.com / password
              </p>
            </div>
          )}

          <div className="text-center">
            <button
              type="button"
              onClick={switchMode}
              className="text-pinterest-red hover:underline"
            >
              {authMode === 'login' 
                ? "Don't have an account? Sign up" 
                : 'Already have an account? Log in'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
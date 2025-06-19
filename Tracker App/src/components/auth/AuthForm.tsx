import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, User, Chrome } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import toast from 'react-hot-toast';

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signUpSchema = signInSchema.extend({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignInFormData = z.infer<typeof signInSchema>;
type SignUpFormData = z.infer<typeof signUpSchema>;

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, signInWithGoogle } = useAuth();

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSignIn = async (data: SignInFormData) => {
    setLoading(true);
    try {
      const { error } = await signIn(data.email, data.password);
      if (error) {
        toast.error(error.message || 'Failed to sign in');
      } else {
        toast.success('Welcome back!');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (data: SignUpFormData) => {
    setLoading(true);
    try {
      const { error } = await signUp(data.email, data.password, data.fullName);
      if (error) {
        toast.error(error.message || 'Failed to create account');
      } else {
        toast.success('Account created successfully! Please check your email to verify your account.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast.error(error.message || 'Failed to sign in with Google');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {isSignUp 
                ? 'Start tracking your habits and goals today' 
                : 'Sign in to continue your tracking journey'
              }
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Google Sign In */}
            <Button
              onClick={handleGoogleSignIn}
              disabled={loading}
              variant="outline"
              className="w-full flex items-center justify-center space-x-3"
            >
              <Chrome className="w-5 h-5" />
              <span>Continue with Google</span>
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={isSignUp 
                ? signUpForm.handleSubmit(handleSignUp)
                : signInForm.handleSubmit(handleSignIn)
              }
              className="space-y-4"
            >
              {isSignUp && (
                <div>
                  <Input
                    {...signUpForm.register('fullName')}
                    type="text"
                    placeholder="Full Name"
                    icon={User}
                    error={signUpForm.formState.errors.fullName?.message}
                  />
                </div>
              )}

              <div>
                <Input
                  {...(isSignUp ? signUpForm.register('email') : signInForm.register('email'))}
                  type="email"
                  placeholder="Email Address"
                  icon={Mail}
                  error={isSignUp 
                    ? signUpForm.formState.errors.email?.message 
                    : signInForm.formState.errors.email?.message
                  }
                />
              </div>

              <div>
                <Input
                  {...(isSignUp ? signUpForm.register('password') : signInForm.register('password'))}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  icon={Lock}
                  rightIcon={showPassword ? EyeOff : Eye}
                  onRightIconClick={() => setShowPassword(!showPassword)}
                  error={isSignUp 
                    ? signUpForm.formState.errors.password?.message 
                    : signInForm.formState.errors.password?.message
                  }
                />
              </div>

              {isSignUp && (
                <div>
                  <Input
                    {...signUpForm.register('confirmPassword')}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    icon={Lock}
                    rightIcon={showConfirmPassword ? EyeOff : Eye}
                    onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    error={signUpForm.formState.errors.confirmPassword?.message}
                  />
                </div>
              )}

              <Button
                type="submit"
                loading={loading}
                className="w-full"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </Button>
            </form>

            <div className="text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
              >
                {isSignUp 
                  ? 'Already have an account? Sign in' 
                  : "Don't have an account? Sign up"
                }
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
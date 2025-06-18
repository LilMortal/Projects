import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, SignInData } from '../../lib/validationSchemas';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface SignInFormProps {
  onSwitchToSignUp: () => void;
}

export function SignInForm({ onSwitchToSignUp }: SignInFormProps) {
  const { signIn, loading } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInData) => {
    await signIn(data.email, data.password);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
        Welcome Back
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
          placeholder="Enter your email"
        />
        
        <Input
          label="Password"
          type="password"
          {...register('password')}
          error={errors.password?.message}
          placeholder="Enter your password"
        />
        
        <Button
          type="submit"
          className="w-full"
          loading={loading}
        >
          Sign In
        </Button>
      </form>

      <div className="text-center">
        <span className="text-gray-600 dark:text-dark-300">
          Don't have an account?{' '}
        </span>
        <button
          onClick={onSwitchToSignUp}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
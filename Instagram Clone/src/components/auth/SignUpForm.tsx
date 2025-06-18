import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, SignUpData } from '../../lib/validationSchemas';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface SignUpFormProps {
  onSwitchToSignIn: () => void;
}

export function SignUpForm({ onSwitchToSignIn }: SignUpFormProps) {
  const { signUp, loading } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpData) => {
    await signUp(data.email, data.password);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
        Create Account
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
          placeholder="Create a password"
          helperText="Must be at least 6 characters"
        />
        
        <Input
          label="Confirm Password"
          type="password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
          placeholder="Confirm your password"
        />
        
        <Button
          type="submit"
          className="w-full"
          loading={loading}
        >
          Create Account
        </Button>
      </form>

      <div className="text-center">
        <span className="text-gray-600 dark:text-dark-300">
          Already have an account?{' '}
        </span>
        <button
          onClick={onSwitchToSignIn}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
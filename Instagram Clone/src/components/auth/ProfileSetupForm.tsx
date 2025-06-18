import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSetupSchema, ProfileSetupData } from '../../lib/validationSchemas';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';

export function ProfileSetupForm() {
  const { setupProfile, loading } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileSetupData>({
    resolver: zodResolver(profileSetupSchema),
  });

  const onSubmit = async (data: ProfileSetupData) => {
    await setupProfile({
      username: data.username,
      fullName: data.fullName,
      bio: data.bio,
    });
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto animate-fade-in">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Complete Your Profile
          </h2>
          <p className="text-gray-600 dark:text-dark-300">
            Let's set up your profile to get started
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Username"
            {...register('username')}
            error={errors.username?.message}
            placeholder="Choose a unique username"
            helperText="3-30 characters, letters, numbers, and underscores only"
          />
          
          <Input
            label="Full Name (Optional)"
            {...register('fullName')}
            error={errors.fullName?.message}
            placeholder="Enter your full name"
          />
          
          <Textarea
            label="Bio (Optional)"
            {...register('bio')}
            error={errors.bio?.message}
            placeholder="Tell us about yourself..."
            rows={3}
            helperText="Up to 150 characters"
          />
          
          <Button
            type="submit"
            className="w-full"
            loading={loading}
          >
            Complete Setup
          </Button>
        </form>
      </div>
    </div>
  );
}
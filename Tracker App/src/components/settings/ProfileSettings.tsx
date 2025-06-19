import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Save } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import toast from 'react-hot-toast';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileSettings() {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.full_name || '',
      email: user?.email || '',
    },
  });

  const handleSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    try {
      // In a real app, this would update the user profile
      console.log('Updating profile:', data);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Profile Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Update your personal information and preferences
        </p>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <Button variant="outline" size="sm">
              Change Avatar
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              JPG, GIF or PNG. 1MB max.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            {...form.register('fullName')}
            label="Full Name"
            icon={User}
            error={form.formState.errors.fullName?.message}
          />
          
          <Input
            {...form.register('email')}
            label="Email Address"
            type="email"
            icon={Mail}
            error={form.formState.errors.email?.message}
          />
        </div>

        <div className="flex items-center justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="submit"
            loading={loading}
            className="flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
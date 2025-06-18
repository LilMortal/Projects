import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Edit, MapPin, Camera, LogOut } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { ThemeToggle } from '../common/ThemeToggle';

export const ProfileView: React.FC = () => {
  const { user, logout } = useAuthStore();
  const [showSettings, setShowSettings] = useState(false);

  if (!user) return null;

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-primary-500 to-accent-500 p-6 pb-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Profile</h1>
          <div className="flex gap-2">
            <ThemeToggle />
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="relative -mt-16 mx-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-dark-700 rounded-3xl shadow-xl p-6"
        >
          {/* Profile Photo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={user.photos[0] || 'https://images.pexels.com/photos/3307758/pexels-photo-3307758.jpeg?auto=compress&cs=tinysrgb&w=400'}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-2 right-2 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center shadow-lg">
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Profile Info */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {user.name}, {user.age}
            </h2>
            <div className="flex items-center justify-center gap-1 mb-4">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-300">
                {user.location}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {user.bio || 'Add a bio to tell others about yourself!'}
            </p>
          </div>

          {/* Edit Button */}
          <Button
            variant="outline"
            className="w-full mb-6"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-500 mb-1">12</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Likes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-500 mb-1">5</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Matches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500 mb-1">3</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Chats</div>
            </div>
          </div>

          {/* Interests */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Settings Modal */}
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Settings"
      >
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            <button className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              Account Settings
            </button>
            <button className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              Privacy & Safety
            </button>
            <button className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              Notifications
            </button>
            <button className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              Help & Support
            </button>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <Button
              variant="outline"
              className="w-full text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
              onClick={() => {
                logout();
                setShowSettings(false);
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
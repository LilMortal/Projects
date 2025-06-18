import React, { useState } from 'react';
import { Camera, Edit3, Check, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const ProfilePanel: React.FC = () => {
  const { user, updateProfile } = useAuthStore();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedAbout, setEditedAbout] = useState(user?.about || '');

  const handleSaveName = () => {
    if (editedName.trim()) {
      updateProfile({ name: editedName.trim() });
      setIsEditingName(false);
    }
  };

  const handleSaveAbout = () => {
    updateProfile({ about: editedAbout.trim() });
    setIsEditingAbout(false);
  };

  const handleCancelEdit = (field: 'name' | 'about') => {
    if (field === 'name') {
      setEditedName(user?.name || '');
      setIsEditingName(false);
    } else {
      setEditedAbout(user?.about || '');
      setIsEditingAbout(false);
    }
  };

  if (!user) return null;

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Profile
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {/* Profile Picture */}
        <div className="relative p-8 text-center">
          <div className="relative inline-block">
            <img
              src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=25D366&color=fff&size=120`}
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover mx-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=25D366&color=fff&size=120`;
              }}
            />
            <button className="absolute bottom-0 right-0 bg-whatsapp-primary text-white p-2 rounded-full hover:bg-green-600 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-4 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            {isEditingName ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-whatsapp-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleCancelEdit('name')}
                  className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-900 dark:text-white">{user.name}</span>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="p-1 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* About */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              About
            </label>
            {isEditingAbout ? (
              <div className="space-y-2">
                <textarea
                  value={editedAbout}
                  onChange={(e) => setEditedAbout(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-whatsapp-primary focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                  autoFocus
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleSaveAbout}
                    className="px-3 py-1 text-sm bg-whatsapp-primary text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleCancelEdit('about')}
                    className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-900 dark:text-white flex-1">{user.about}</span>
                <button
                  onClick={() => setIsEditingAbout(true)}
                  className="p-1 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors ml-2"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone
            </label>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-gray-900 dark:text-white">{user.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
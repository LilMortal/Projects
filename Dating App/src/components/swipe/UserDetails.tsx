import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Verified, ChevronLeft, ChevronRight } from 'lucide-react';
import { User } from '../../types';
import { Button } from '../common/Button';

interface UserDetailsProps {
  user: User;
  onClose: () => void;
}

export const UserDetails: React.FC<UserDetailsProps> = ({ user, onClose }) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  const nextPhoto = () => {
    setPhotoIndex((prev) => (prev + 1) % user.photos.length);
  };

  const prevPhoto = () => {
    setPhotoIndex((prev) => (prev - 1 + user.photos.length) % user.photos.length);
  };

  return (
    <div className="max-h-[80vh] overflow-auto">
      {/* Photo Gallery */}
      <div className="relative h-96">
        <img
          src={user.photos[photoIndex]}
          alt={user.name}
          className="w-full h-full object-cover"
        />
        
        {/* Photo Navigation */}
        <div className="absolute top-4 left-4 right-4 flex gap-1">
          {user.photos.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-1 rounded-full ${
                index === photoIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        {user.photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/30 rounded-full flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/30 rounded-full flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* User Info */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {user.name}
          </h1>
          <span className="text-3xl text-gray-600 dark:text-gray-300">
            {user.age}
          </span>
          {user.verified && (
            <Verified className="w-7 h-7 text-blue-500" />
          )}
        </div>

        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-5 h-5 text-gray-500" />
          <span className="text-gray-600 dark:text-gray-300">
            {user.location}
          </span>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            About
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {user.bio}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Interests
          </h2>
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

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            className="flex-1"
            onClick={() => {
              onClose();
              // Handle like action
            }}
          >
            Like
          </Button>
        </div>
      </div>
    </div>
  );
};
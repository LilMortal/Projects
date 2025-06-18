import React, { useState } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { Heart, X, Star, MapPin, Verified } from 'lucide-react';
import { User } from '../../types';

interface SwipeCardProps {
  user: User;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
  onShowDetails: () => void;
  isTop: boolean;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  user,
  onSwipe,
  onShowDetails,
  isTop
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-30, 30]);
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 150;
    const superLikeThreshold = -150;

    if (info.offset.y < superLikeThreshold) {
      onSwipe('up'); // Super like
    } else if (info.offset.x > threshold) {
      onSwipe('right'); // Like
    } else if (info.offset.x < -threshold) {
      onSwipe('left'); // Pass
    } else {
      // Snap back
      x.set(0);
      y.set(0);
    }
  };

  const nextPhoto = () => {
    setPhotoIndex((prev) => (prev + 1) % user.photos.length);
  };

  const prevPhoto = () => {
    setPhotoIndex((prev) => (prev - 1 + user.photos.length) % user.photos.length);
  };

  return (
    <motion.div
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={1}
      onDragEnd={handleDragEnd}
      style={{ x, y, rotate, opacity }}
      className={`absolute inset-4 bg-white dark:bg-dark-800 rounded-3xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing ${
        !isTop ? 'scale-95' : ''
      }`}
      whileHover={{ scale: isTop ? 1.02 : 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Photo Section */}
      <div className="relative h-2/3">
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

        {/* Photo Tap Areas */}
        <button
          className="absolute left-0 top-0 w-1/2 h-full"
          onClick={prevPhoto}
        />
        <button
          className="absolute right-0 top-0 w-1/2 h-full"
          onClick={nextPhoto}
        />

        {/* Swipe Indicators */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: useTransform(x, [50, 150], [0, 1]),
          }}
        >
          <div className="bg-green-500 text-white px-6 py-3 rounded-2xl font-bold text-xl transform rotate-12">
            LIKE
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: useTransform(x, [-150, -50], [1, 0]),
          }}
        >
          <div className="bg-red-500 text-white px-6 py-3 rounded-2xl font-bold text-xl transform -rotate-12">
            NOPE
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: useTransform(y, [-150, -50], [1, 0]),
          }}
        >
          <div className="bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold text-xl">
            SUPER LIKE
          </div>
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Info Section */}
      <div className="p-6 h-1/3 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.name}
            </h2>
            <span className="text-2xl text-gray-600 dark:text-gray-300">
              {user.age}
            </span>
            {user.verified && (
              <Verified className="w-6 h-6 text-blue-500" />
            )}
          </div>

          <div className="flex items-center gap-1 mb-3">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600 dark:text-gray-300 text-sm">
              {user.location}
            </span>
          </div>

          <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">
            {user.bio}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {user.interests.slice(0, 3).map((interest) => (
            <span
              key={interest}
              className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
            >
              {interest}
            </span>
          ))}
          {user.interests.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium">
              +{user.interests.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onSwipe('left')}
          className="w-14 h-14 bg-white dark:bg-dark-700 rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200 dark:border-gray-600"
        >
          <X className="w-6 h-6 text-red-500" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onSwipe('up')}
          className="w-14 h-14 bg-white dark:bg-dark-700 rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200 dark:border-gray-600"
        >
          <Star className="w-6 h-6 text-blue-500" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onSwipe('right')}
          className="w-14 h-14 bg-white dark:bg-dark-700 rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200 dark:border-gray-600"
        >
          <Heart className="w-6 h-6 text-green-500" />
        </motion.button>
      </div>

      {/* Info Button */}
      <button
        onClick={onShowDetails}
        className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
      >
        <span className="text-white font-bold">i</span>
      </button>
    </motion.div>
  );
};
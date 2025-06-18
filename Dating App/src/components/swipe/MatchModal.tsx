import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, X } from 'lucide-react';
import { User } from '../../types';
import { Button } from '../common/Button';
import { useAuthStore } from '../../stores/authStore';

interface MatchModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
  onSendMessage: () => void;
}

export const MatchModal: React.FC<MatchModalProps> = ({
  isOpen,
  user,
  onClose,
  onSendMessage
}) => {
  const { user: currentUser } = useAuthStore();

  if (!user || !currentUser) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gradient-to-br from-pink-500/90 via-purple-500/90 to-primary-500/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-white dark:bg-dark-800 rounded-3xl p-8 max-w-md w-full text-center relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="mb-6"
            >
              <div className="flex justify-center mb-4">
                <Heart className="w-16 h-16 text-pink-500" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                It's a Match!
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                You and {user.name} liked each other
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-4 mb-8"
            >
              <div className="relative">
                <img
                  src={currentUser.photos[0] || 'https://images.pexels.com/photos/3307758/pexels-photo-3307758.jpeg?auto=compress&cs=tinysrgb&w=400'}
                  alt={currentUser.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
              <div className="relative">
                <img
                  src={user.photos[0]}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-3"
            >
              <Button
                onClick={onSendMessage}
                className="w-full"
                variant="primary"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Send Message
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full"
              >
                Keep Swiping
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-sm text-gray-500 dark:text-gray-400 mt-4"
            >
              Start a conversation and make a great first impression!
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
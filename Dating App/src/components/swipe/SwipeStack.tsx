import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SwipeCard } from './SwipeCard';
import { Modal } from '../common/Modal';
import { UserDetails } from './UserDetails';
import { MatchModal } from './MatchModal';
import { useSwipeStore } from '../../stores/swipeStore';
import { User } from '../../types';
import toast from 'react-hot-toast';

export const SwipeStack: React.FC = () => {
  const { users, currentUserIndex, swipeUser, undoSwipe } = useSwipeStore();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [matchedUser, setMatchedUser] = useState<User | null>(null);

  const currentUser = users[currentUserIndex];
  const nextUser = users[currentUserIndex + 1];

  const handleSwipe = async (userId: string, direction: 'left' | 'right' | 'up') => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    const action = direction === 'left' ? 'pass' : direction === 'up' ? 'superlike' : 'like';
    
    try {
      const isMatch = await swipeUser(userId, action);
      
      if (isMatch) {
        setMatchedUser(user);
        toast.success('It\'s a match! 🎉');
      } else if (action === 'like') {
        toast('Keep swiping! 💕', { icon: '👍' });
      } else if (action === 'superlike') {
        toast('Super like sent! ⭐', { icon: '💫' });
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleUndoSwipe = () => {
    undoSwipe();
    toast.success('Swipe undone!');
  };

  if (!currentUser) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span className="text-4xl">🎉</span>
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            You've seen everyone!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Check back later for new people in your area.
          </p>
          <button
            onClick={handleUndoSwipe}
            className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
          >
            Undo Last Swipe
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 relative">
        {/* Next Card (Background) */}
        {nextUser && (
          <SwipeCard
            key={`${nextUser.id}-next`}
            user={nextUser}
            onSwipe={() => {}}
            onShowDetails={() => {}}
            isTop={false}
          />
        )}

        {/* Current Card (Top) */}
        <SwipeCard
          key={`${currentUser.id}-current`}
          user={currentUser}
          onSwipe={(direction) => handleSwipe(currentUser.id, direction)}
          onShowDetails={() => setSelectedUser(currentUser)}
          isTop={true}
        />

        {/* Undo Button */}
        {currentUserIndex > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUndoSwipe}
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-6 py-3 rounded-2xl font-medium shadow-lg"
          >
            Undo
          </motion.button>
        )}
      </div>

      {/* User Details Modal */}
      <Modal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        className="max-w-lg"
      >
        {selectedUser && (
          <UserDetails
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </Modal>

      {/* Match Modal */}
      <MatchModal
        isOpen={!!matchedUser}
        user={matchedUser}
        onClose={() => setMatchedUser(null)}
        onSendMessage={() => {
          setMatchedUser(null);
          // Navigate to chat would go here
          toast.success('Opening chat...');
        }}
      />
    </>
  );
};
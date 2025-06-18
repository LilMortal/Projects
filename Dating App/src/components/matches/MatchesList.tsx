import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Heart } from 'lucide-react';
import { useSwipeStore } from '../../stores/swipeStore';
import { formatDistanceToNow } from 'date-fns';

export const MatchesList: React.FC = () => {
  const { matches, users } = useSwipeStore();

  if (matches.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Heart className="w-12 h-12 text-primary-500" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            No matches yet
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Start swiping to find your perfect match!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Your Matches
        </h1>

        <div className="space-y-4">
          {matches.map((match) => {
            const otherUserId = match.users.find(id => id !== '1'); // Current user ID is '1'
            const otherUser = users.find(u => u.id === otherUserId);
            
            if (!otherUser) return null;

            return (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-dark-700 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={otherUser.photos[0]}
                      alt={otherUser.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-dark-700" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {otherUser.name}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {otherUser.age}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Matched {formatDistanceToNow(match.matchedAt)} ago
                    </p>

                    {match.lastMessage ? (
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                        {match.lastMessage.content}
                      </p>
                    ) : (
                      <p className="text-sm text-primary-500 font-medium">
                        Start the conversation!
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <MessageCircle className="w-6 h-6 text-primary-500" />
                    {match.unreadCount > 0 && (
                      <span className="bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {match.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
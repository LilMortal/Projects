import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Heart, X } from 'lucide-react';
import { useSwipeStore } from '../../stores/swipeStore';
import { Button } from '../common/Button';

export const ExploreView: React.FC = () => {
  const { users } = useSwipeStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.interests.some(interest => 
      interest.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-6 pb-8">
        <h1 className="text-2xl font-bold text-white mb-6">Explore</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name or interests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Users Grid */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {filteredUsers.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-dark-700 rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="relative">
                <img
                  src={user.photos[0]}
                  alt={user.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Action Buttons */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-center gap-2">
                  <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <X className="w-5 h-5 text-white" />
                  </button>
                  <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {user.name}
                  </h3>
                  <span className="text-gray-600 dark:text-gray-300">
                    {user.age}
                  </span>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  <MapPin className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {user.location}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {user.interests.slice(0, 2).map((interest) => (
                    <span
                      key={interest}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs"
                    >
                      {interest}
                    </span>
                  ))}
                  {user.interests.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs">
                      +{user.interests.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">
              No users found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
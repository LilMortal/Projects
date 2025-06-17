import React from 'react';
import ChirpCard from '../components/ChirpCard';
import UserCard from '../components/UserCard';
import { useChirpContext } from '../context/ChirpContext';

const Explore: React.FC = () => {
  const { getTrendingChirps, users, currentUser } = useChirpContext();
  
  const trendingChirps = getTrendingChirps();
  const suggestedUsers = users.filter(user => 
    user.id !== currentUser.id && !currentUser.following.includes(user.id)
  ).slice(0, 3);

  return (
    <div className="py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Explore</h1>
        <p className="text-gray-600">Discover trending chirps and new people</p>
      </div>

      {/* Suggested Users */}
      {suggestedUsers.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Who to follow</h2>
          <div className="space-y-4">
            {suggestedUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      )}

      {/* Trending Chirps */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Trending</h2>
        <div className="space-y-4">
          {trendingChirps.map((chirp) => (
            <ChirpCard key={chirp.id} chirp={chirp} />
          ))}
        </div>
      </div>

      {trendingChirps.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No trending chirps</div>
          <p className="text-gray-500 text-sm">Check back later for trending content</p>
        </div>
      )}
    </div>
  );
};

export default Explore;
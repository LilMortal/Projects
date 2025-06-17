import React from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Link as LinkIcon, BadgeCheck } from 'lucide-react';
import ChirpCard from '../components/ChirpCard';
import { useChirpContext } from '../context/ChirpContext';

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { getUserById, getChirpsByUserId, currentUser, followUser, unfollowUser } = useChirpContext();
  
  if (!userId) return null;
  
  const user = getUserById(userId);
  const userChirps = getChirpsByUserId(userId);
  
  if (!user) {
    return (
      <div className="py-6">
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">User not found</div>
          <p className="text-gray-500 text-sm">This user doesn't exist or has been removed</p>
        </div>
      </div>
    );
  }

  const isCurrentUser = currentUser.id === user.id;
  const isFollowing = currentUser.following.includes(user.id);

  const handleFollowToggle = () => {
    if (isFollowing) {
      unfollowUser(user.id);
    } else {
      followUser(user.id);
    }
  };

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  return (
    <div className="py-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-soft p-6 mb-6 animate-fade-in">
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400 rounded-xl mb-4 relative">
          <img
            src={user.avatar}
            alt={user.displayName}
            className="absolute -bottom-6 left-6 h-24 w-24 rounded-full border-4 border-white"
          />
        </div>

        {/* Profile Info */}
        <div className="pt-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{user.displayName}</h1>
                {user.verified && (
                  <BadgeCheck className="h-6 w-6 text-sky-500" />
                )}
              </div>
              <p className="text-gray-500 mb-3">@{user.username}</p>
            </div>

            {!isCurrentUser && (
              <button
                onClick={handleFollowToggle}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 ${
                  isFollowing
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 text-white'
                }`}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>

          <p className="text-gray-700 mb-4 leading-relaxed">{user.bio}</p>

          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Joined {formatJoinDate(user.joinedDate)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <span>
              <span className="font-semibold text-gray-900">{user.following.length}</span>{' '}
              <span className="text-gray-500">Following</span>
            </span>
            <span>
              <span className="font-semibold text-gray-900">{user.followers.length}</span>{' '}
              <span className="text-gray-500">Followers</span>
            </span>
          </div>
        </div>
      </div>

      {/* User's Chirps */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {isCurrentUser ? 'Your chirps' : `${user.displayName}'s chirps`}
        </h2>
        
        <div className="space-y-4">
          {userChirps.map((chirp) => (
            <ChirpCard key={chirp.id} chirp={chirp} />
          ))}
        </div>

        {userChirps.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">
              {isCurrentUser ? "You haven't chirped yet" : "No chirps yet"}
            </div>
            <p className="text-gray-500 text-sm">
              {isCurrentUser ? "Share your first thought with the world!" : "This user hasn't shared anything yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
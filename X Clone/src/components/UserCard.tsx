import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, UserPlus, UserMinus } from 'lucide-react';
import { User } from '../types/chirp';
import { useChirpContext } from '../context/ChirpContext';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const { currentUser, followUser, unfollowUser } = useChirpContext();
  
  const isFollowing = currentUser.following.includes(user.id);
  const isCurrentUser = currentUser.id === user.id;

  const handleFollowToggle = () => {
    if (isFollowing) {
      unfollowUser(user.id);
    } else {
      followUser(user.id);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 animate-fade-in hover:shadow-medium transition-shadow duration-200">
      <div className="flex items-start space-x-4">
        <Link to={`/profile/${user.id}`}>
          <img
            src={user.avatar}
            alt={user.displayName}
            className="h-16 w-16 rounded-full hover:scale-105 transition-transform duration-200"
          />
        </Link>
        
        <div className="flex-1 min-w-0">
          <Link to={`/profile/${user.id}`} className="block group">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-gray-900 truncate group-hover:text-sky-600 transition-colors duration-200">
                {user.displayName}
              </h3>
              {user.verified && (
                <BadgeCheck className="h-4 w-4 text-sky-500 flex-shrink-0" />
              )}
            </div>
            <p className="text-gray-500 text-sm mb-2">@{user.username}</p>
          </Link>
          
          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
            {user.bio}
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <span>
              <span className="font-semibold text-gray-900">{user.following.length}</span> Following
            </span>
            <span>
              <span className="font-semibold text-gray-900">{user.followers.length}</span> Followers
            </span>
          </div>
          
          {!isCurrentUser && (
            <button
              onClick={handleFollowToggle}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 ${
                isFollowing
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 text-white'
              }`}
            >
              {isFollowing ? (
                <>
                  <UserMinus className="h-4 w-4" />
                  <span>Unfollow</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  <span>Follow</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
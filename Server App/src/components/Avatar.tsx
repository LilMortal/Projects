import React from 'react';
import { User } from '../types';

interface AvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ user, size = 'md', showStatus = false }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  const statusColors = {
    online: 'bg-secondary-500',
    away: 'bg-accent-500',
    offline: 'bg-neutral-400'
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative">
      <div className={`
        ${sizeClasses[size]} 
        bg-gradient-to-br from-primary-400 to-primary-600
        rounded-full 
        flex items-center justify-center 
        text-white font-medium
        shadow-soft
      `}>
        {user.avatar ? (
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          getInitials(user.name)
        )}
      </div>
      {showStatus && (
        <div className={`
          absolute -bottom-0.5 -right-0.5 
          w-3 h-3 
          ${statusColors[user.status]} 
          rounded-full 
          border-2 border-white
          shadow-sm
        `} />
      )}
    </div>
  );
};
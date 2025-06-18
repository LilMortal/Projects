import React, { useState } from 'react';
import { Heart, Download, Share, ExternalLink, MoreHorizontal } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import type { Pin } from '../../types';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';

interface PinCardProps {
  pin: Pin;
  onPinClick: (pin: Pin) => void;
}

export const PinCard: React.FC<PinCardProps> = ({ pin, onPinClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [likes, setLikes] = useState(pin.likes);
  const [isLiked, setIsLiked] = useState(pin.isLiked);
  
  const { isAuthenticated } = useAuthStore();
  const { setShowAuthModal, setAuthMode } = useAppStore();
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      setAuthMode('login');
      setShowAuthModal(true);
      return;
    }

    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      setAuthMode('login');
      setShowAuthModal(true);
      return;
    }
    
    // Implement save functionality
    console.log('Save pin:', pin.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: pin.title,
        text: pin.description,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const aspectRatio = pin.imageHeight / pin.imageWidth;
  const height = Math.min(400, Math.max(200, 250 * aspectRatio));

  return (
    <div
      ref={ref}
      className="break-inside-avoid mb-4 group cursor-pointer animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPinClick(pin)}
    >
      <div className="relative bg-white dark:bg-dark-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
        {/* Image Container */}
        <div className="relative overflow-hidden" style={{ height: `${height}px` }}>
          {inView && (
            <img
              src={pin.imageUrl}
              alt={pin.title}
              className={`w-full h-full object-cover transition-all duration-500 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
          )}
          
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
          )}

          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Action Buttons */}
          <div
            className={`absolute top-3 right-3 flex flex-col space-y-2 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}
          >
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-pinterest-red text-white rounded-full text-sm font-medium hover:bg-pinterest-red-dark transition-colors shadow-lg"
            >
              Save
            </button>
            
            <div className="flex space-x-1">
              <button
                onClick={handleShare}
                className="p-2 bg-white/90 hover:bg-white rounded-full transition-colors shadow-lg"
              >
                <Share size={16} className="text-gray-700" />
              </button>
              
              <button className="p-2 bg-white/90 hover:bg-white rounded-full transition-colors shadow-lg">
                <MoreHorizontal size={16} className="text-gray-700" />
              </button>
            </div>
          </div>

          {/* Bottom Actions */}
          <div
            className={`absolute bottom-3 left-3 right-3 flex items-center justify-between transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <div className="flex items-center space-x-2">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 px-2 py-1 rounded-full transition-colors ${
                  isLiked 
                    ? 'bg-pinterest-red text-white' 
                    : 'bg-white/90 hover:bg-white text-gray-700'
                } shadow-lg`}
              >
                <Heart 
                  size={14} 
                  className={isLiked ? 'fill-current' : ''} 
                />
                <span className="text-xs font-medium">{likes}</span>
              </button>
            </div>

            {pin.destinationUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(pin.destinationUrl, '_blank');
                }}
                className="p-2 bg-white/90 hover:bg-white rounded-full transition-colors shadow-lg"
              >
                <ExternalLink size={14} className="text-gray-700" />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
            {pin.title}
          </h3>
          
          {pin.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
              {pin.description}
            </p>
          )}

          {/* User Info */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-300">
              {pin.user.avatar ? (
                <img
                  src={pin.user.avatar}
                  alt={pin.user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-pinterest-red text-white text-xs">
                  {pin.user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {pin.user.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
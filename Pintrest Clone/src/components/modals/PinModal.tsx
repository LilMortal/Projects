import React, { useState } from 'react';
import { X, Heart, Share, ExternalLink, MessageCircle, Download, MoreHorizontal } from 'lucide-react';
import type { Pin } from '../../types';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';
import { mockPins } from '../../data/mockData';

interface PinModalProps {
  pin: Pin;
  onClose: () => void;
}

export const PinModal: React.FC<PinModalProps> = ({ pin, onClose }) => {
  const [likes, setLikes] = useState(pin.likes);
  const [isLiked, setIsLiked] = useState(pin.isLiked);
  const [comment, setComment] = useState('');
  
  const { isAuthenticated } = useAuthStore();
  const { setShowAuthModal, setAuthMode } = useAppStore();

  // Get related pins (mock implementation)
  const relatedPins = mockPins
    .filter(p => p.id !== pin.id && p.tags.some(tag => pin.tags.includes(tag)))
    .slice(0, 6);

  const handleLike = () => {
    if (!isAuthenticated) {
      setAuthMode('login');
      setShowAuthModal(true);
      return;
    }

    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSave = () => {
    if (!isAuthenticated) {
      setAuthMode('login');
      setShowAuthModal(true);
      return;
    }
    
    console.log('Save pin:', pin.id);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: pin.title,
        text: pin.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setAuthMode('login');
      setShowAuthModal(true);
      return;
    }
    
    if (comment.trim()) {
      console.log('Add comment:', comment);
      setComment('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-dark-bg rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
        <div className="flex h-full">
          {/* Left side - Image */}
          <div className="flex-1 bg-black flex items-center justify-center min-h-[600px]">
            <img
              src={pin.imageUrl}
              alt={pin.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Right side - Content */}
          <div className="w-96 flex flex-col bg-white dark:bg-dark-bg">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleShare}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-dark-surface rounded-full transition-colors"
                >
                  <Share size={20} />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-dark-surface rounded-full transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-surface rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-4">
                {/* Actions */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-pinterest-red text-white py-3 rounded-full font-medium hover:bg-pinterest-red-dark transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleLike}
                    className={`p-3 rounded-full transition-colors ${
                      isLiked 
                        ? 'bg-pinterest-red text-white' 
                        : 'bg-gray-100 dark:bg-dark-surface hover:bg-gray-200 dark:hover:bg-dark-surface-hover'
                    }`}
                  >
                    <Heart size={20} className={isLiked ? 'fill-current' : ''} />
                  </button>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>{likes} likes</span>
                  <span>{pin.saves} saves</span>
                  <span>{pin.comments} comments</span>
                </div>

                {/* Title and Description */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {pin.title}
                  </h2>
                  {pin.description && (
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {pin.description}
                    </p>
                  )}
                </div>

                {/* User Info */}
                <div className="flex items-center space-x-3 pt-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300">
                    {pin.user.avatar ? (
                      <img
                        src={pin.user.avatar}
                        alt={pin.user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-pinterest-red text-white text-lg font-semibold">
                        {pin.user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {pin.user.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {pin.user.followers.toLocaleString()} followers
                    </p>
                  </div>
                </div>

                {/* Destination Link */}
                {pin.destinationUrl && (
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-3">
                    <div className="flex items-center space-x-2">
                      <ExternalLink size={16} className="text-gray-500" />
                      <a
                        href={pin.destinationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-pinterest-red hover:underline"
                      >
                        Visit source
                      </a>
                    </div>
                  </div>
                )}

                {/* Comments Section */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Comments ({pin.comments})
                  </h4>
                  
                  {/* Comment Form */}
                  <form onSubmit={handleCommentSubmit} className="mb-4">
                    <div className="flex space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                        <div className="w-full h-full flex items-center justify-center bg-pinterest-red text-white text-xs">
                          U
                        </div>
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-pinterest-red"
                        />
                      </div>
                    </div>
                  </form>

                  {/* Mock Comments */}
                  <div className="space-y-3">
                    <div className="flex space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                        <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-xs">
                          J
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-semibold">John Doe</span>
                          <span className="ml-2 text-gray-600 dark:text-gray-400">
                            Love this design! Where can I find similar pieces?
                          </span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2h</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Pins */}
            {relatedPins.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  More like this
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {relatedPins.map((relatedPin) => (
                    <div
                      key={relatedPin.id}
                      className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => {
                        // Switch to the related pin
                        window.location.hash = relatedPin.id;
                      }}
                    >
                      <img
                        src={relatedPin.imageUrl}
                        alt={relatedPin.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, BadgeCheck } from 'lucide-react';
import { Chirp } from '../types/chirp';
import { useChirpContext } from '../context/ChirpContext';

interface ChirpCardProps {
  chirp: Chirp;
}

const ChirpCard: React.FC<ChirpCardProps> = ({ chirp }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const { currentUser, getUserById, likeChirp, rechirp, addComment } = useChirpContext();
  
  const author = getUserById(chirp.userId);
  if (!author) return null;

  const isLiked = chirp.likes.includes(currentUser.id);
  const isRechirped = chirp.rechirps.includes(currentUser.id);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d`;
    }
  };

  const handleLike = () => {
    likeChirp(chirp.id);
  };

  const handleRechirp = () => {
    rechirp(chirp.id);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(chirp.id, commentText.trim());
      setCommentText('');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 mb-4 animate-fade-in hover:shadow-medium transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start space-x-3 mb-4">
        <img
          src={author.avatar}
          alt={author.displayName}
          className="h-12 w-12 rounded-full flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-900 truncate">
              {author.displayName}
            </h3>
            {author.verified && (
              <BadgeCheck className="h-4 w-4 text-sky-500 flex-shrink-0" />
            )}
            <span className="text-gray-500 text-sm">@{author.username}</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-500 text-sm">{formatTimestamp(chirp.timestamp)}</span>
          </div>
        </div>
        
        <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-900 text-base leading-relaxed whitespace-pre-wrap">
          {chirp.content}
        </p>
        
        {chirp.image && (
          <div className="mt-4">
            <img
              src={chirp.image}
              alt="Chirp image"
              className="w-full max-h-96 object-cover rounded-xl"
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between text-gray-500 border-t border-gray-100 pt-4">
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 hover:text-sky-600 transition-colors duration-200 group"
        >
          <div className="p-2 rounded-full group-hover:bg-sky-50 transition-colors duration-200">
            <MessageCircle className="h-4 w-4" />
          </div>
          <span className="text-sm">{chirp.comments.length}</span>
        </button>

        <button
          onClick={handleRechirp}
          className={`flex items-center space-x-2 transition-colors duration-200 group ${
            isRechirped ? 'text-emerald-600' : 'hover:text-emerald-600'
          }`}
        >
          <div className={`p-2 rounded-full transition-colors duration-200 ${
            isRechirped ? 'bg-emerald-50' : 'group-hover:bg-emerald-50'
          }`}>
            <Repeat2 className="h-4 w-4" />
          </div>
          <span className="text-sm">{chirp.rechirps.length}</span>
        </button>

        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 transition-colors duration-200 group ${
            isLiked ? 'text-rose-600' : 'hover:text-rose-600'
          }`}
        >
          <div className={`p-2 rounded-full transition-colors duration-200 ${
            isLiked ? 'bg-rose-50' : 'group-hover:bg-rose-50'
          }`}>
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </div>
          <span className="text-sm">{chirp.likes.length}</span>
        </button>

        <button className="flex items-center space-x-2 hover:text-violet-600 transition-colors duration-200 group">
          <div className="p-2 rounded-full group-hover:bg-violet-50 transition-colors duration-200">
            <Share className="h-4 w-4" />
          </div>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
          {/* Comment Form */}
          <form onSubmit={handleComment} className="flex space-x-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.displayName}
              className="h-8 w-8 rounded-full flex-shrink-0"
            />
            <div className="flex-1">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Chirp your reply"
                className="w-full px-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
              />
            </div>
          </form>

          {/* Comments List */}
          {chirp.comments.map((comment) => {
            const commentAuthor = getUserById(comment.userId);
            if (!commentAuthor) return null;

            return (
              <div key={comment.id} className="flex space-x-3">
                <img
                  src={commentAuthor.avatar}
                  alt={commentAuthor.displayName}
                  className="h-8 w-8 rounded-full flex-shrink-0"
                />
                <div className="flex-1 bg-gray-50 rounded-2xl px-4 py-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm text-gray-900">
                      {commentAuthor.displayName}
                    </span>
                    {commentAuthor.verified && (
                      <BadgeCheck className="h-3 w-3 text-sky-500" />
                    )}
                    <span className="text-gray-500 text-xs">
                      @{commentAuthor.username}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {formatTimestamp(comment.timestamp)}
                    </span>
                  </div>
                  <p className="text-gray-900 text-sm">{comment.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChirpCard;
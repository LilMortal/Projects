import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { usePostsStore } from '../../store/postsStore';
import { useAuthStore } from '../../store/authStore';

interface PostCardProps {
  post: {
    id: string;
    author_id: string;
    caption: string | null;
    image_url: string;
    location: string | null;
    likes_count: number;
    comments_count: number;
    created_at: string;
    author: {
      username: string;
      avatar_url: string | null;
      full_name: string | null;
    };
    user_liked: boolean;
  };
  onOpenComments: () => void;
}

export function PostCard({ post, onOpenComments }: PostCardProps) {
  const { likePost } = usePostsStore();
  const { profile } = useAuthStore();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLike = async () => {
    await likePost(post.id);
  };

  const handleDoubleClick = () => {
    if (!post.user_liked) {
      handleLike();
    }
  };

  const isOwner = profile?.id === post.author_id;

  return (
    <article className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-200 dark:border-dark-700 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          {post.author.avatar_url ? (
            <img
              src={post.author.avatar_url}
              alt={post.author.username}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-400 to-accent-400 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {post.author.username[0].toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {post.author.username}
            </h3>
            {post.location && (
              <p className="text-sm text-gray-500 dark:text-dark-400">
                {post.location}
              </p>
            )}
          </div>
        </div>
        {isOwner && (
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>

      {/* Image */}
      <div className="relative aspect-square bg-gray-100 dark:bg-dark-700">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-primary-500 rounded-full animate-spin" />
          </div>
        )}
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500 dark:text-dark-400">Failed to load image</p>
          </div>
        ) : (
          <img
            src={post.image_url}
            alt={post.caption || 'Post image'}
            className={`w-full h-full object-cover cursor-pointer transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            onDoubleClick={handleDoubleClick}
          />
        )}
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`p-2 rounded-full transition-all duration-200 ${
                post.user_liked
                  ? 'text-red-500 hover:text-red-600 animate-bounce-subtle'
                  : 'text-gray-700 dark:text-dark-200 hover:text-red-500'
              }`}
            >
              <Heart
                className={`w-6 h-6 ${post.user_liked ? 'fill-current' : ''}`}
              />
            </button>
            <button
              onClick={onOpenComments}
              className="p-2 rounded-full text-gray-700 dark:text-dark-200 hover:text-accent-500 transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
            </button>
            <button className="p-2 rounded-full text-gray-700 dark:text-dark-200 hover:text-accent-500 transition-colors">
              <Share className="w-6 h-6" />
            </button>
          </div>
          <button className="p-2 rounded-full text-gray-700 dark:text-dark-200 hover:text-accent-500 transition-colors">
            <Bookmark className="w-6 h-6" />
          </button>
        </div>

        {/* Likes */}
        {post.likes_count > 0 && (
          <p className="font-semibold text-gray-900 dark:text-white mb-2">
            {post.likes_count} {post.likes_count === 1 ? 'like' : 'likes'}
          </p>
        )}

        {/* Caption */}
        {post.caption && (
          <div className="mb-2">
            <span className="font-semibold text-gray-900 dark:text-white mr-2">
              {post.author.username}
            </span>
            <span className="text-gray-700 dark:text-dark-200">
              {post.caption}
            </span>
          </div>
        )}

        {/* Comments link */}
        {post.comments_count > 0 && (
          <button
            onClick={onOpenComments}
            className="text-gray-500 dark:text-dark-400 hover:text-gray-700 dark:hover:text-dark-200 transition-colors mb-2"
          >
            View all {post.comments_count} comments
          </button>
        )}

        {/* Timestamp */}
        <p className="text-xs text-gray-500 dark:text-dark-400 uppercase tracking-wide">
          {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
        </p>
      </div>
    </article>
  );
}
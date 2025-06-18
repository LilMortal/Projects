import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Heart, MessageCircle, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { commentSchema, CommentData } from '../../lib/validationSchemas';
import { usePostsStore } from '../../store/postsStore';
import { useAuthStore } from '../../store/authStore';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PostModal({ isOpen, onClose }: PostModalProps) {
  const { selectedPost, comments, commentsLoading, likePost, fetchComments, addComment } = usePostsStore();
  const { profile } = useAuthStore();
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentData>({
    resolver: zodResolver(commentSchema),
  });

  useEffect(() => {
    if (isOpen && selectedPost) {
      fetchComments(selectedPost.id);
      setImageLoaded(false);
    }
  }, [isOpen, selectedPost, fetchComments]);

  const onSubmit = async (data: CommentData) => {
    if (!selectedPost) return;
    
    const success = await addComment(selectedPost.id, data.content);
    if (success) {
      reset();
    }
  };

  const handleLike = async () => {
    if (!selectedPost) return;
    await likePost(selectedPost.id);
  };

  if (!selectedPost) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="2xl">
      <div className="flex flex-col md:flex-row max-h-[90vh]">
        {/* Image */}
        <div className="md:flex-1 relative bg-black">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <LoadingSpinner size="lg" />
            </div>
          )}
          <img
            src={selectedPost.image_url}
            alt={selectedPost.caption || 'Post image'}
            className={`w-full h-full object-contain transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Content */}
        <div className="md:w-96 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-600">
            <div className="flex items-center space-x-3">
              {selectedPost.author.avatar_url ? (
                <img
                  src={selectedPost.author.avatar_url}
                  alt={selectedPost.author.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-400 to-accent-400 flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">
                    {selectedPost.author.username[0].toUpperCase()}
                  </span>
                </div>
              )}
              <span className="font-semibold text-gray-900 dark:text-white">
                {selectedPost.author.username}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Caption */}
          {selectedPost.caption && (
            <div className="p-4 border-b border-gray-200 dark:border-dark-600">
              <div className="flex items-start space-x-3">
                {selectedPost.author.avatar_url ? (
                  <img
                    src={selectedPost.author.avatar_url}
                    alt={selectedPost.author.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-400 to-accent-400 flex items-center justify-center">
                    <span className="text-white font-semibold text-xs">
                      {selectedPost.author.username[0].toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <span className="font-semibold text-gray-900 dark:text-white mr-2">
                    {selectedPost.author.username}
                  </span>
                  <span className="text-gray-700 dark:text-dark-200">
                    {selectedPost.caption}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-dark-400 mt-1">
                    {formatDistanceToNow(new Date(selectedPost.created_at), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Comments */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {commentsLoading ? (
              <div className="flex justify-center">
                <LoadingSpinner />
              </div>
            ) : comments.length === 0 ? (
              <p className="text-gray-500 dark:text-dark-400 text-center">
                No comments yet
              </p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3">
                  {comment.user.avatar_url ? (
                    <img
                      src={comment.user.avatar_url}
                      alt={comment.user.username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-400 to-accent-400 flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">
                        {comment.user.username[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900 dark:text-white mr-2">
                      {comment.user.username}
                    </span>
                    <span className="text-gray-700 dark:text-dark-200">
                      {comment.content}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-dark-400 mt-1">
                      {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Actions */}
          <div className="border-t border-gray-200 dark:border-dark-600">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  className={`transition-all duration-200 ${
                    selectedPost.user_liked
                      ? 'text-red-500 hover:text-red-600'
                      : 'text-gray-700 dark:text-dark-200 hover:text-red-500'
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${selectedPost.user_liked ? 'fill-current' : ''}`}
                  />
                </button>
                <MessageCircle className="w-6 h-6 text-gray-700 dark:text-dark-200" />
              </div>
            </div>

            {selectedPost.likes_count > 0 && (
              <div className="px-4 pb-2">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {selectedPost.likes_count} {selectedPost.likes_count === 1 ? 'like' : 'likes'}
                </p>
              </div>
            )}

            {/* Add Comment */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 border-t border-gray-200 dark:border-dark-600">
              <div className="flex items-center space-x-3">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-400 to-accent-400 flex items-center justify-center">
                    <span className="text-white font-semibold text-xs">
                      {profile?.username[0].toUpperCase()}
                    </span>
                  </div>
                )}
                <input
                  {...register('content')}
                  placeholder="Add a comment..."
                  className="flex-1 bg-transparent text-gray-700 dark:text-dark-200 placeholder-gray-400 focus:outline-none"
                />
                <Button type="submit" variant="ghost" size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              {errors.content && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  {errors.content.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}
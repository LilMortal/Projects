import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, X } from 'lucide-react';
import { postSchema, PostData } from '../../lib/validationSchemas';
import { usePostsStore } from '../../store/postsStore';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const { createPost, loading } = usePostsStore();
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<PostData>({
    resolver: zodResolver(postSchema),
  });

  const selectedImage = watch('image');

  const handleFileSelect = (file: File) => {
    if (file) {
      setValue('image', file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const onSubmit = async (data: PostData) => {
    const success = await createPost(data);
    if (success) {
      reset();
      setPreview(null);
      onClose();
    }
  };

  const handleClose = () => {
    reset();
    setPreview(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Post" maxWidth="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        {/* Image Upload */}
        <div className="space-y-4">
          {!preview ? (
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragActive
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-dark-600'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-dark-300 mb-2">
                Drag and drop your image here, or{' '}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  browse
                </button>
              </p>
              <p className="text-sm text-gray-500 dark:text-dark-400">
                PNG, JPG up to 5MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelect(file);
                }}
              />
            </div>
          ) : (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-xl"
              />
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  setValue('image', undefined as any);
                }}
                className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          {errors.image && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.image.message}
            </p>
          )}
        </div>

        {/* Caption */}
        <Textarea
          label="Caption"
          {...register('caption')}
          error={errors.caption?.message}
          placeholder="Write a caption..."
          rows={3}
        />

        {/* Location */}
        <Input
          label="Location"
          {...register('location')}
          error={errors.location?.message}
          placeholder="Add location"
        />

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-dark-600">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
            disabled={!selectedImage}
          >
            Share Post
          </Button>
        </div>
      </form>
    </Modal>
  );
}
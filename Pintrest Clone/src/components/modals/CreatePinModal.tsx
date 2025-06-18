import React, { useState, useRef } from 'react';
import { X, Upload, Link, Image as ImageIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppStore } from '../../store/appStore';

const createPinSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  destinationUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  imageUrl: z.string().url('Please enter a valid image URL').optional().or(z.literal('')),
  board: z.string().min(1, 'Please select a board'),
});

type CreatePinFormData = z.infer<typeof createPinSchema>;

export const CreatePinModal: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { setShowCreatePinModal } = useAppStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CreatePinFormData>({
    resolver: zodResolver(createPinSchema),
    defaultValues: {
      board: 'home-inspiration',
    },
  });

  const imageUrl = watch('imageUrl');
  const displayImage = uploadedImage || imageUrl;

  const handleClose = () => {
    setShowCreatePinModal(false);
    reset();
    setUploadedImage('');
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data: CreatePinFormData) => {
    try {
      // Mock API call
      console.log('Creating pin:', { ...data, image: uploadedImage });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      handleClose();
    } catch (error) {
      console.error('Error creating pin:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-dark-bg rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create Pin
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-surface rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex h-full max-h-[600px]">
          {/* Left side - Image Upload */}
          <div className="w-1/2 p-6 border-r border-gray-200 dark:border-gray-700">
            <div className="h-full flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Add Image
              </h3>
              
              {displayImage ? (
                <div className="flex-1 relative">
                  <img
                    src={displayImage}
                    alt="Preview"
                    className="w-full h-full object-contain rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setUploadedImage('');
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                    className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div
                  className={`flex-1 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors ${
                    dragActive 
                      ? 'border-pinterest-red bg-pinterest-red/5' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-pinterest-red'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-dark-surface rounded-full flex items-center justify-center mx-auto">
                      <Upload size={24} className="text-gray-400" />
                    </div>
                    
                    <div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        Choose a file or drag and drop it here
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        We recommend using high quality .jpg files less than 20MB
                      </p>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-gray-200 px-6 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-surface-hover transition-colors"
                    >
                      Choose file
                    </button>
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </div>
              )}
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Or paste image URL
                </label>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    {...register('imageUrl')}
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pinterest-red bg-white dark:bg-dark-surface"
                  />
                </div>
                {errors.imageUrl && (
                  <p className="text-sm text-red-500 mt-1">{errors.imageUrl.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-1/2 p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  {...register('title')}
                  type="text"
                  placeholder="Add a title"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pinterest-red bg-white dark:bg-dark-surface text-lg"
                />
                {errors.title && (
                  <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  placeholder="Tell everyone what your Pin is about"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pinterest-red bg-white dark:bg-dark-surface resize-none"
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
                )}
              </div>

              {/* Destination URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Destination link
                </label>
                <input
                  {...register('destinationUrl')}
                  type="url"
                  placeholder="Add a destination link"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pinterest-red bg-white dark:bg-dark-surface"
                />
                {errors.destinationUrl && (
                  <p className="text-sm text-red-500 mt-1">{errors.destinationUrl.message}</p>
                )}
              </div>

              {/* Board Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Board *
                </label>
                <select
                  {...register('board')}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pinterest-red bg-white dark:bg-dark-surface"
                >
                  <option value="home-inspiration">Home Inspiration</option>
                  <option value="my-dream-home">My Dream Home</option>
                  <option value="create-new">+ Create new board</option>
                </select>
                {errors.board && (
                  <p className="text-sm text-red-500 mt-1">{errors.board.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex-1 flex items-end">
                <button
                  type="submit"
                  disabled={!displayImage}
                  className="w-full bg-pinterest-red text-white py-3 rounded-full font-medium hover:bg-pinterest-red-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Pin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
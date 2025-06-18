import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useFileStore } from '../../stores/fileStore';
import { FileItem, UploadProgress } from '../../types';
import toast from 'react-hot-toast';

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const ALLOWED_TYPES = [
  'image/*',
  'video/*',
  'audio/*',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/zip',
  'application/x-rar-compressed',
  'text/*',
];

export const FileUpload: React.FC = () => {
  const { addFile, updateUploadProgress, removeUploadProgress, uploadProgress } = useFileStore();

  const simulateUpload = async (file: File): Promise<FileItem> => {
    const fileId = Math.random().toString(36).substr(2, 9);
    
    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      updateUploadProgress({
        fileId,
        fileName: file.name,
        progress,
        status: 'uploading',
      });
    }

    // Mark as completed
    updateUploadProgress({
      fileId,
      fileName: file.name,
      progress: 100,
      status: 'completed',
    });

    // Remove from progress after delay
    setTimeout(() => {
      removeUploadProgress(fileId);
    }, 2000);

    // Create file item
    const fileItem: FileItem = {
      id: fileId,
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      shareId: Math.random().toString(36).substr(2, 9),
      userId: '1',
      uploadedAt: new Date(),
      downloadCount: 0,
      isPasswordProtected: false,
    };

    return fileItem;
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} is too large. Maximum size is 100MB.`);
        continue;
      }

      try {
        const fileItem = await simulateUpload(file);
        addFile(fileItem);
        toast.success(`${file.name} uploaded successfully!`);
      } catch (error) {
        toast.error(`Failed to upload ${file.name}`);
        updateUploadProgress({
          fileId: Math.random().toString(36).substr(2, 9),
          fileName: file.name,
          progress: 0,
          status: 'error',
        });
      }
    }
  }, [addFile, updateUploadProgress, removeUploadProgress]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ALLOWED_TYPES.reduce((acc, type) => ({
      ...acc,
      [type]: [],
    }), {}),
    maxSize: MAX_FILE_SIZE,
  });

  return (
    <div className="space-y-6">
      <motion.div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input {...getInputProps()} />
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {isDragActive ? 'Drop files here' : 'Upload your files'}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Drag and drop files here, or click to browse
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Supports images, videos, documents, and archives up to 100MB
        </p>
      </motion.div>

      {uploadProgress.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white">
            Upload Progress
          </h4>
          {uploadProgress.map((progress) => (
            <UploadProgressItem key={progress.fileId} progress={progress} />
          ))}
        </div>
      )}
    </div>
  );
};

const UploadProgressItem: React.FC<{ progress: UploadProgress }> = ({ progress }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <File className="h-5 w-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {progress.fileName}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {progress.status === 'completed' && (
            <CheckCircle className="h-5 w-5 text-accent-500" />
          )}
          {progress.status === 'error' && (
            <AlertCircle className="h-5 w-5 text-red-500" />
          )}
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {progress.progress}%
          </span>
        </div>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <motion.div
          className={`h-2 rounded-full ${
            progress.status === 'error'
              ? 'bg-red-500'
              : progress.status === 'completed'
              ? 'bg-accent-500'
              : 'bg-primary-500'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${progress.progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};
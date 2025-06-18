import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Lock, FileText, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { FileItem } from '../../types';
import { formatBytes } from '../../utils/formatBytes';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';

// Mock function to get file by share ID
const getFileByShareId = (shareId: string): FileItem | null => {
  // In real app, this would fetch from API
  const mockFiles: FileItem[] = [
    {
      id: '1',
      name: 'presentation.pdf',
      size: 2048576,
      type: 'application/pdf',
      url: 'https://example.com/files/presentation.pdf',
      shareId: 'abc123',
      userId: '1',
      uploadedAt: new Date(Date.now() - 86400000),
      expiresAt: new Date(Date.now() + 86400000 * 6),
      downloadCount: 15,
      isPasswordProtected: true,
      password: 'secret123',
      downloadLimit: 100,
    },
  ];
  
  return mockFiles.find(file => file.shareId === shareId) || null;
};

export const SharePage: React.FC = () => {
  const { shareId } = useParams<{ shareId: string }>();
  const [file, setFile] = useState<FileItem | null>(null);
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (shareId) {
      const foundFile = getFileByShareId(shareId);
      if (foundFile) {
        setFile(foundFile);
        if (!foundFile.isPasswordProtected) {
          setIsPasswordValid(true);
        }
      } else {
        setError('File not found or link is invalid');
      }
    }
  }, [shareId]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file && password === file.password) {
      setIsPasswordValid(true);
      toast.success('Password correct!');
    } else {
      toast.error('Incorrect password');
    }
  };

  const handleDownload = async () => {
    if (!file) return;
    
    // Check if file is expired
    if (file.expiresAt && new Date() > file.expiresAt) {
      toast.error('This file has expired');
      return;
    }

    // Check download limit
    if (file.downloadLimit && file.downloadCount >= file.downloadLimit) {
      toast.error('Download limit reached');
      return;
    }

    setIsDownloading(true);
    
    try {
      // Simulate download
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, would trigger actual download
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Download started!');
    } catch (error) {
      toast.error('Download failed');
    } finally {
      setIsDownloading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center"
        >
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            File Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The file you're looking for doesn't exist or the link has expired.
          </p>
        </motion.div>
      </div>
    );
  }

  if (!file) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const isExpired = file.expiresAt && new Date() > file.expiresAt;
  const isLimitReached = file.downloadLimit && file.downloadCount >= file.downloadLimit;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-full">
                <FileText className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center mb-2">
              {file.name}
            </h1>
            <p className="text-center text-primary-100">
              {formatBytes(file.size)} • Shared {formatDistanceToNow(file.uploadedAt, { addSuffix: true })}
            </p>
          </div>

          <div className="p-6">
            {/* File Info */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Download className="h-6 w-6 text-gray-600 dark:text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Downloads</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {file.downloadCount}
                </p>
              </div>
              
              {file.expiresAt && (
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Calendar className="h-6 w-6 text-gray-600 dark:text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Expires</p>
                  <p className={`text-sm font-medium ${
                    isExpired 
                      ? 'text-red-600 dark:text-red-400' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {formatDistanceToNow(file.expiresAt, { addSuffix: true })}
                  </p>
                </div>
              )}
            </div>

            {/* Password Protection */}
            {file.isPasswordProtected && !isPasswordValid && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6"
              >
                <div className="flex items-center mb-4">
                  <Lock className="h-5 w-5 text-yellow-500 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Password Required
                  </h3>
                </div>
                
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password to access file"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Unlock File
                  </button>
                </form>
              </motion.div>
            )}

            {/* Download Section */}
            {isPasswordValid && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                {isExpired ? (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                    <p className="text-red-700 dark:text-red-300 font-medium">
                      This file has expired
                    </p>
                  </div>
                ) : isLimitReached ? (
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <AlertCircle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                    <p className="text-yellow-700 dark:text-yellow-300 font-medium">
                      Download limit reached
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <CheckCircle className="h-12 w-12 text-accent-500 mx-auto mb-2" />
                      <p className="text-gray-600 dark:text-gray-400">
                        File is ready for download
                      </p>
                    </div>
                    
                    <button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="inline-flex items-center px-6 py-3 bg-accent-600 hover:bg-accent-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
                    >
                      {isDownloading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download className="h-5 w-5 mr-2" />
                          Download File
                        </>
                      )}
                    </button>
                    
                    {file.downloadLimit && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        {file.downloadLimit - file.downloadCount} downloads remaining
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
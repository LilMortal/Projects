import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List } from 'lucide-react';
import { useFileStore } from '../../stores/fileStore';
import { FileCard } from './FileCard';
import toast from 'react-hot-toast';

export const FileDashboard: React.FC = () => {
  const { files, removeFile } = useFileStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size' | 'downloads'>('date');

  const filteredFiles = files
    .filter(file => 
      file.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
          return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
        case 'size':
          return b.size - a.size;
        case 'downloads':
          return b.downloadCount - a.downloadCount;
        default:
          return 0;
      }
    });

  const handleDelete = (fileId: string) => {
    removeFile(fileId);
    toast.success('File deleted successfully');
  };

  const handleTogglePassword = (fileId: string) => {
    // Mock implementation - in real app, would update file in backend
    toast.success('Password protection toggled');
  };

  const handleSetExpiry = (fileId: string, expiresAt: Date | null) => {
    // Mock implementation - in real app, would update file in backend
    toast.success(expiresAt ? 'Expiry date set' : 'Expiry date removed');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
            <option value="size">Sort by Size</option>
            <option value="downloads">Sort by Downloads</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {filteredFiles.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 mb-4">
            <Filter className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {searchTerm ? 'No files found' : 'No files uploaded yet'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm 
              ? 'Try adjusting your search criteria'
              : 'Upload your first file to get started'
            }
          </p>
        </motion.div>
      ) : (
        <motion.div
          layout
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}
        >
          {filteredFiles.map((file) => (
            <FileCard
              key={file.id}
              file={file}
              onDelete={handleDelete}
              onTogglePassword={handleTogglePassword}
              onSetExpiry={handleSetExpiry}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};
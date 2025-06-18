import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Download, FileText, TrendingUp, Eye, Clock } from 'lucide-react';
import { useFileStore } from '../../stores/fileStore';
import { formatBytes } from '../../utils/formatBytes';

export const AnalyticsDashboard: React.FC = () => {
  const { files } = useFileStore();

  const totalFiles = files.length;
  const totalDownloads = files.reduce((sum, file) => sum + file.downloadCount, 0);
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  const averageDownloads = totalFiles > 0 ? Math.round(totalDownloads / totalFiles) : 0;

  const topFiles = [...files]
    .sort((a, b) => b.downloadCount - a.downloadCount)
    .slice(0, 5);

  const recentFiles = [...files]
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
    .slice(0, 5);

  const stats = [
    {
      label: 'Total Files',
      value: totalFiles,
      icon: FileText,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
    },
    {
      label: 'Total Downloads',
      value: totalDownloads,
      icon: Download,
      color: 'text-accent-600 dark:text-accent-400',
      bgColor: 'bg-accent-100 dark:bg-accent-900',
    },
    {
      label: 'Storage Used',
      value: formatBytes(totalSize),
      icon: BarChart3,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900',
    },
    {
      label: 'Avg Downloads',
      value: averageDownloads,
      icon: TrendingUp,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Analytics Overview
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Track your file sharing performance and usage statistics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Downloaded Files */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center mb-4">
            <TrendingUp className="h-5 w-5 text-accent-600 dark:text-accent-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Top Downloaded Files
            </h3>
          </div>
          
          <div className="space-y-3">
            {topFiles.length > 0 ? (
              topFiles.map((file, index) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-32">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatBytes(file.size)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-accent-600 dark:text-accent-400">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm font-medium">{file.downloadCount}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No files uploaded yet
              </p>
            )}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center mb-4">
            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Uploads
            </h3>
          </div>
          
          <div className="space-y-3">
            {recentFiles.length > 0 ? (
              recentFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-40">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(file.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {formatBytes(file.size)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {file.downloadCount} downloads
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No recent activity
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
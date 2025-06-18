import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  File, 
  Download, 
  Share2, 
  Trash2, 
  Lock, 
  Calendar, 
  Eye,
  QrCode,
  Copy,
  Settings
} from 'lucide-react';
import { FileItem } from '../../types';
import { formatDistanceToNow, format } from 'date-fns';
import { formatBytes } from '../../utils/formatBytes';
import { generateQRCode } from '../../utils/qrCode';
import toast from 'react-hot-toast';
import copy from 'copy-to-clipboard';

interface FileCardProps {
  file: FileItem;
  onDelete: (fileId: string) => void;
  onTogglePassword: (fileId: string) => void;
  onSetExpiry: (fileId: string, expiresAt: Date | null) => void;
}

export const FileCard: React.FC<FileCardProps> = ({
  file,
  onDelete,
  onTogglePassword,
  onSetExpiry,
}) => {
  const [showQR, setShowQR] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  const shareUrl = `${window.location.origin}/share/${file.shareId}`;

  const handleShare = () => {
    copy(shareUrl);
    toast.success('Share link copied to clipboard!');
  };

  const handleShowQR = async () => {
    if (!qrCodeUrl) {
      try {
        const qr = await generateQRCode(shareUrl);
        setQrCodeUrl(qr);
      } catch (error) {
        toast.error('Failed to generate QR code');
        return;
      }
    }
    setShowQR(true);
  };

  const isExpired = file.expiresAt && new Date() > file.expiresAt;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-white dark:bg-gray-800 rounded-lg border ${
        isExpired 
          ? 'border-red-200 dark:border-red-800' 
          : 'border-gray-200 dark:border-gray-700'
      } shadow-sm hover:shadow-md transition-shadow p-6`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-md">
            <File className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
              {file.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatBytes(file.size)} • {file.type}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {file.isPasswordProtected && (
            <Lock className="h-4 w-4 text-yellow-500" />
          )}
          {isExpired && (
            <div className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs rounded-full">
              Expired
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Uploaded</span>
          <span className="text-gray-900 dark:text-white">
            {formatDistanceToNow(file.uploadedAt, { addSuffix: true })}
          </span>
        </div>
        
        {file.expiresAt && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Expires</span>
            <span className={`${isExpired ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
              {format(file.expiresAt, 'MMM dd, yyyy')}
            </span>
          </div>
        )}
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Downloads</span>
          <div className="flex items-center space-x-1">
            <Eye className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 dark:text-white">{file.downloadCount}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleShare}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            title="Copy share link"
          >
            <Copy className="h-4 w-4" />
          </button>
          
          <button
            onClick={handleShowQR}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            title="Show QR code"
          >
            <QrCode className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            title="Settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
        
        <button
          onClick={() => onDelete(file.id)}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          title="Delete file"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {showSettings && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Password Protection</span>
            <button
              onClick={() => onTogglePassword(file.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                file.isPasswordProtected
                  ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              {file.isPasswordProtected ? 'Enabled' : 'Disabled'}
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Auto-expire</span>
            <select
              value={file.expiresAt ? format(file.expiresAt, 'yyyy-MM-dd') : ''}
              onChange={(e) => {
                const date = e.target.value ? new Date(e.target.value) : null;
                onSetExpiry(file.id, date);
              }}
              className="text-xs bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
            >
              <option value="">Never</option>
              <option value={format(new Date(Date.now() + 3600000), 'yyyy-MM-dd')}>1 hour</option>
              <option value={format(new Date(Date.now() + 86400000), 'yyyy-MM-dd')}>1 day</option>
              <option value={format(new Date(Date.now() + 604800000), 'yyyy-MM-dd')}>1 week</option>
            </select>
          </div>
        </motion.div>
      )}

      {showQR && qrCodeUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowQR(false)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 text-center">
              QR Code
            </h3>
            <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 mx-auto mb-4" />
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
              Scan to download {file.name}
            </p>
            <button
              onClick={() => setShowQR(false)}
              className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};
import React from 'react';
import { ExternalLink, Copy, Mail, Phone, ArrowLeft, Check } from 'lucide-react';
import { ScanResult } from '../types';
import { ActionButton } from './ActionButton';
import { formatContent } from '../utils/qrUtils';

interface ResultProps {
  result: ScanResult;
  onBack: () => void;
}

export const Result: React.FC<ResultProps> = ({ result, onBack }) => {
  const [copied, setCopied] = React.useState(false);
  
  const formattedContent = formatContent(result.content, result.type);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const handleAction = () => {
    switch (result.type) {
      case 'url':
        window.open(formattedContent.startsWith('http') ? formattedContent : `https://${formattedContent}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:${formattedContent}`, '_blank');
        break;
      case 'phone':
        window.open(`tel:${formattedContent}`, '_blank');
        break;
      default:
        handleCopy();
        break;
    }
  };

  const getActionLabel = () => {
    switch (result.type) {
      case 'url':
        return 'Open in Browser';
      case 'email':
        return 'Send Email';
      case 'phone':
        return 'Call Number';
      default:
        return 'Copy to Clipboard';
    }
  };

  const getActionIcon = () => {
    switch (result.type) {
      case 'url':
        return ExternalLink;
      case 'email':
        return Mail;
      case 'phone':
        return Phone;
      default:
        return Copy;
    }
  };

  const getTypeLabel = () => {
    switch (result.type) {
      case 'url':
        return 'Website URL';
      case 'email':
        return 'Email Address';
      case 'phone':
        return 'Phone Number';
      default:
        return 'Text Content';
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Scan Result
          </h1>
          <div className="w-10 h-10"></div> {/* Spacer */}
        </div>

        {/* Result Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
          {/* Type indicator */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {getTypeLabel()}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {result.date}
            </span>
          </div>

          {/* Content */}
          <div className="mb-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600">
              <p className="text-gray-800 dark:text-gray-200 break-all leading-relaxed">
                {result.content}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <ActionButton
              icon={getActionIcon()}
              label={getActionLabel()}
              onClick={handleAction}
              fullWidth
            />
            
            <ActionButton
              icon={copied ? Check : Copy}
              label={copied ? 'Copied!' : 'Copy to Clipboard'}
              onClick={handleCopy}
              variant={copied ? 'success' : 'secondary'}
              fullWidth
            />
          </div>
        </div>

        {/* Scan again button */}
        <ActionButton
          icon={ArrowLeft}
          label="Scan Another Code"
          onClick={onBack}
          variant="secondary"
          fullWidth
        />
      </div>
    </div>
  );
};
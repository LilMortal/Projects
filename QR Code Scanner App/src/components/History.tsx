import React from 'react';
import { Trash2, ExternalLink, Copy, Mail, Phone, Clock } from 'lucide-react';
import { ScanResult } from '../types';
import { ActionButton } from './ActionButton';
import { formatContent } from '../utils/qrUtils';

interface HistoryProps {
  history: ScanResult[];
  onClearHistory: () => void;
  onRemoveItem: (id: string) => void;
  onSelectResult: (result: ScanResult) => void;
}

export const History: React.FC<HistoryProps> = ({
  history,
  onClearHistory,
  onRemoveItem,
  onSelectResult,
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'url':
        return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'email':
        return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      case 'phone':
        return 'text-purple-500 bg-purple-50 dark:bg-purple-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-700';
    }
  };

  const handleQuickAction = (result: ScanResult, e: React.MouseEvent) => {
    e.stopPropagation();
    const formattedContent = formatContent(result.content, result.type);
    
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
        navigator.clipboard.writeText(result.content);
        break;
    }
  };

  if (history.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <Clock className="mx-auto mb-4 text-gray-400" size={64} />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            No Scan History
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Your scanned QR codes will appear here for easy access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Scan History
          </h1>
          <ActionButton
            icon={Trash2}
            label="Clear All"
            onClick={onClearHistory}
            variant="warning"
          />
        </div>

        {/* History List */}
        <div className="space-y-3">
          {history.map((item) => {
            const TypeIcon = getTypeIcon(item.type);
            
            return (
              <div
                key={item.id}
                onClick={() => onSelectResult(item)}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex items-start gap-3">
                  {/* Type icon */}
                  <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                    <TypeIcon size={20} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 dark:text-gray-200 font-medium truncate">
                      {item.content}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {item.date}
                    </p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleQuickAction(item, e)}
                      className="p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200"
                      title="Quick action"
                    >
                      <TypeIcon size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveItem(item.id);
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
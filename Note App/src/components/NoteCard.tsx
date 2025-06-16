import React from 'react';
import { Pin, Archive, Trash2, RotateCcw, Hash, Calendar, Edit3 } from 'lucide-react';
import { Note, Tag } from '../types';

interface NoteCardProps {
  note: Note;
  tags: Tag[];
  viewMode: 'grid' | 'list';
  isArchived?: boolean;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
  onArchive: (id: string) => void;
  onRestore?: (id: string) => void;
}

export function NoteCard({
  note,
  tags,
  viewMode,
  isArchived = false,
  onEdit,
  onDelete,
  onTogglePin,
  onArchive,
  onRestore,
}: NoteCardProps) {
  const getTagColor = (tagName: string) => {
    const tag = tags.find(t => t.name === tagName);
    return tag?.color || '#6B7280';
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return new Date(date).toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit' 
      });
    } else if (diffInHours < 168) { // 7 days
      return new Date(date).toLocaleDateString('en-US', { 
        weekday: 'short', 
        hour: 'numeric', 
        minute: '2-digit' 
      });
    } else {
      return new Date(date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const truncateContent = (content: string, limit: number) => {
    if (content.length <= limit) return content;
    return content.substring(0, limit) + '...';
  };

  const cardClasses = viewMode === 'grid' 
    ? "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer group" 
    : "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer group";

  return (
    <div className={cardClasses} onClick={() => onEdit(note)}>
      <div className={viewMode === 'grid' ? "p-5" : "p-4"}>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              {note.isPinned && (
                <Pin className="w-4 h-4 text-amber-500 fill-current" />
              )}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {note.title}
              </h3>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-2">
              <Calendar className="w-3 h-3" />
              <span>Updated {formatDate(note.updatedAt)}</span>
            </div>
          </div>
          
          {/* Actions */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 ml-2">
            {!isArchived && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTogglePin(note.id);
                }}
                className={`p-1.5 rounded-lg transition-colors ${
                  note.isPinned
                    ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title={note.isPinned ? 'Unpin' : 'Pin'}
              >
                <Pin className="w-4 h-4" />
              </button>
            )}
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(note);
              }}
              className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              title="Edit"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            {isArchived ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRestore?.(note.id);
                }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                title="Restore"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onArchive(note.id);
                }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
                title="Archive"
              >
                <Archive className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm('Are you sure you want to delete this note?')) {
                  onDelete(note.id);
                }
              }}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {truncateContent(note.content, viewMode === 'grid' ? 150 : 200)}
          </p>
        </div>

        {/* Tags */}
        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {note.tags.slice(0, viewMode === 'grid' ? 3 : 5).map(tagName => (
              <span
                key={tagName}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: getTagColor(tagName) }}
              >
                <Hash className="w-2.5 h-2.5 mr-1" />
                {tagName}
              </span>
            ))}
            {note.tags.length > (viewMode === 'grid' ? 3 : 5) && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700">
                +{note.tags.length - (viewMode === 'grid' ? 3 : 5)} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
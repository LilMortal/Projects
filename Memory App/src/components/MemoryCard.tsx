import React from 'react';
import { Heart, MapPin, Calendar, Edit, Trash2, Eye } from 'lucide-react';
import { Memory } from '../types/memory';
import { useMemory } from '../contexts/MemoryContext';
import { format } from 'date-fns';

interface MemoryCardProps {
  memory: Memory;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory }) => {
  const { toggleFavorite, deleteMemory, setSelectedMemory, toggleDetailModal } = useMemory();

  const handleView = () => {
    setSelectedMemory(memory);
    toggleDetailModal();
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedMemory(memory);
    toggleDetailModal();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this memory?')) {
      deleteMemory(memory.id);
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(memory.id);
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {memory.image ? (
          <img
            src={memory.image}
            alt={memory.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-teal-100 to-purple-100 dark:from-teal-900/30 dark:to-purple-900/30 flex items-center justify-center">
            <Calendar className="w-12 h-12 text-teal-400" />
          </div>
        )}
        
        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            <button
              onClick={handleView}
              className="bg-white text-gray-900 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
              title="View details"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={handleEdit}
              className="bg-white text-gray-900 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
              title="Edit memory"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="bg-white text-red-600 p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors duration-200"
              title="Delete memory"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Favorite button */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              memory.isFavorite
                ? 'text-red-500 fill-current'
                : 'text-gray-400 hover:text-red-500'
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
          {memory.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
          {memory.description}
        </p>

        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3 space-x-4">
          {memory.location && (
            <div className="flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              <span className="truncate">{memory.location}</span>
            </div>
          )}
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{format(new Date(memory.date), 'MMM d, yyyy')}</span>
          </div>
        </div>

        {/* Tags */}
        {memory.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {memory.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {memory.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                +{memory.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryCard;
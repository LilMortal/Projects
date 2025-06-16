import React, { useState } from 'react';
import { Tag as TagIcon, X, Plus, Hash } from 'lucide-react';
import { Tag } from '../types';

interface TagManagerProps {
  tags: Tag[];
  selectedTags: string[];
  onTagSelect: (tags: string[]) => void;
  onCreateTag: (name: string, color: string) => void;
}

const TAG_COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
  '#8B5CF6', '#06B6D4', '#84CC16', '#F97316',
  '#EC4899', '#6366F1', '#14B8A6', '#F43F5E'
];

export function TagManager({ tags, selectedTags, onTagSelect, onCreateTag }: TagManagerProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [selectedColor, setSelectedColor] = useState(TAG_COLORS[0]);

  const handleCreateTag = () => {
    if (newTagName.trim()) {
      onCreateTag(newTagName.trim(), selectedColor);
      setNewTagName('');
      setIsCreating(false);
    }
  };

  const toggleTag = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      onTagSelect(selectedTags.filter(t => t !== tagName));
    } else {
      onTagSelect([...selectedTags, tagName]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
            <TagIcon className="w-4 h-4 mr-2" />
            Filter by Tags
          </h3>
          <button
            onClick={() => setIsCreating(!isCreating)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" />
            New Tag
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map(tag => (
            <button
              key={tag.id}
              onClick={() => toggleTag(tag.name)}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all ${
                selectedTags.includes(tag.name)
                  ? 'text-white shadow-md transform scale-105'
                  : 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              style={{
                backgroundColor: selectedTags.includes(tag.name) ? tag.color : undefined,
              }}
            >
              <Hash className="w-3 h-3 mr-1" />
              {tag.name}
              <span className="ml-2 text-xs opacity-75">
                {tag.count}
              </span>
            </button>
          ))}
        </div>

        {isCreating && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-4">
            <input
              type="text"
              placeholder="Tag name"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              onKeyPress={(e) => e.key === 'Enter' && handleCreateTag()}
            />
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {TAG_COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full border-2 ${
                      selectedColor === color ? 'border-gray-900 dark:border-white' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsCreating(false)}
                  className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTag}
                  disabled={!newTagName.trim()}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedTags.length > 0 && (
          <button
            onClick={() => onTagSelect([])}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
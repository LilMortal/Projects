import React, { useState } from 'react';
import { Eye, EyeOff, Trash2, Edit3 } from 'lucide-react';
import { Button } from '../UI/Button';
import type { Layer } from '../../types';

interface LayerItemProps {
  layer: Layer;
  isActive: boolean;
  onSelect: () => void;
  onToggleVisibility: () => void;
  onDelete: () => void;
  onRename: (name: string) => void;
}

export const LayerItem: React.FC<LayerItemProps> = ({
  layer,
  isActive,
  onSelect,
  onToggleVisibility,
  onDelete,
  onRename,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(layer.name);

  const handleRename = () => {
    if (editName.trim() && editName !== layer.name) {
      onRename(editName.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setEditName(layer.name);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`flex items-center gap-2 p-3 rounded-lg border transition-all duration-200 ${
        isActive
          ? 'bg-primary-50 border-primary-200'
          : 'bg-white hover:bg-neutral-50 border-neutral-200'
      }`}
      onClick={onSelect}
    >
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onToggleVisibility();
        }}
        icon={layer.visible ? Eye : EyeOff}
        variant="ghost"
        size="sm"
        className="flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleRename}
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-1 text-sm border border-primary-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="text-sm font-medium text-neutral-700 truncate">
            {layer.name}
          </span>
        )}
      </div>

      <Button
        onClick={(e) => {
          e.stopPropagation();
          setIsEditing(true);
        }}
        icon={Edit3}
        variant="ghost"
        size="sm"
        className="flex-shrink-0"
      />

      <Button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        icon={Trash2}
        variant="ghost"
        size="sm"
        className="flex-shrink-0 text-error-500 hover:text-error-600"
      />
    </div>
  );
};
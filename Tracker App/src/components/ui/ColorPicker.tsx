import React from 'react';
import { motion } from 'framer-motion';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

const colors = [
  '#4F46E5', // Indigo
  '#F59E0B', // Amber
  '#10B981', // Emerald
  '#EF4444', // Red
  '#8B5CF6', // Violet
  '#06B6D4', // Cyan
  '#F97316', // Orange
  '#84CC16', // Lime
  '#EC4899', // Pink
  '#6B7280', // Gray
];

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {colors.map((color) => (
        <motion.button
          key={color}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(color)}
          className={`w-10 h-10 rounded-lg border-2 transition-all ${
            value === color 
              ? 'border-gray-900 dark:border-white shadow-lg' 
              : 'border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400'
          }`}
          style={{ backgroundColor: color }}
          type="button"
        />
      ))}
    </div>
  );
}
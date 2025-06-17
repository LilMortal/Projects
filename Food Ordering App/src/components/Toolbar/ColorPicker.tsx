import React from 'react';
import { COLORS } from '../../constants';

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorChange,
}) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-soft border border-neutral-200">
      <h3 className="text-sm font-medium text-neutral-700 mb-3">Colors</h3>
      
      <div className="grid grid-cols-5 gap-2 mb-4">
        {COLORS.map((color) => (
          <button
            key={color}
            onClick={() => onColorChange(color)}
            className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110 ${
              selectedColor === color
                ? 'border-primary-500 shadow-medium'
                : 'border-neutral-300 hover:border-neutral-400'
            }`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm text-neutral-600">Custom:</label>
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-8 h-8 rounded-lg border border-neutral-300 cursor-pointer"
        />
      </div>
    </div>
  );
};
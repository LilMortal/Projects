import React from 'react';
import { Type, Palette } from 'lucide-react';
import { TextElement } from '../App';

const FONT_FAMILIES = [
  'Impact, Arial Black, sans-serif',
  'Arial, sans-serif',
  'Helvetica, sans-serif',
  'Georgia, serif',
  'Times New Roman, serif',
  'Comic Sans MS, cursive',
  'Trebuchet MS, sans-serif',
  'Verdana, sans-serif',
];

const PRESET_COLORS = [
  '#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff',
  '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080',
];

interface TextControlsProps {
  textElements: TextElement[];
  selectedTextId: string;
  selectedText: TextElement | undefined;
  onTextSelect: (id: string) => void;
  onTextUpdate: (id: string, updates: Partial<TextElement>) => void;
}

export const TextControls: React.FC<TextControlsProps> = ({
  textElements,
  selectedTextId,
  selectedText,
  onTextSelect,
  onTextUpdate,
}) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200">
      <div className="flex items-center space-x-2 mb-6">
        <Type className="h-5 w-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Text Controls</h3>
      </div>

      {/* Text Selection */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Select Text</h4>
        <div className="grid grid-cols-2 gap-2">
          {textElements.map((element) => (
            <button
              key={element.id}
              onClick={() => onTextSelect(element.id)}
              className={`p-3 rounded-xl border transition-all duration-200 ${
                selectedTextId === element.id
                  ? 'border-primary-300 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <span className="text-sm font-medium capitalize">
                {element.id} Text
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Text Properties */}
      {selectedText && (
        <div className="space-y-4">
          {/* Text Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Content
            </label>
            <input
              type="text"
              value={selectedText.text}
              onChange={(e) => onTextUpdate(selectedText.id, { text: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder="Enter your text..."
            />
          </div>

          {/* Font Family */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Family
            </label>
            <select
              value={selectedText.fontFamily}
              onChange={(e) => onTextUpdate(selectedText.id, { fontFamily: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              {FONT_FAMILIES.map((font) => (
                <option key={font} value={font}>
                  {font.split(',')[0]}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Size: {selectedText.fontSize}px
            </label>
            <input
              type="range"
              min="16"
              max="80"
              value={selectedText.fontSize}
              onChange={(e) => onTextUpdate(selectedText.id, { fontSize: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>16px</span>
              <span>80px</span>
            </div>
          </div>

          {/* Text Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={selectedText.color}
                onChange={(e) => onTextUpdate(selectedText.id, { color: e.target.value })}
                className="w-12 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
              />
              <div className="flex-1 grid grid-cols-5 gap-2">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => onTextUpdate(selectedText.id, { color })}
                    className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110 ${
                      selectedText.color === color ? 'border-primary-500' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
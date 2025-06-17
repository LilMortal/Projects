import React, { useState, useEffect } from 'react';
import { Type, Palette, AlignLeft, AlignCenter, AlignRight, Trash2, Plus } from 'lucide-react';
import { useMemeStore, createNewTextElement, TextElement } from '../store/memeStore';

const FONT_FAMILIES = [
  'Impact, Arial Black, sans-serif',
  'Arial, sans-serif',
  'Helvetica, sans-serif',
  'Georgia, serif',
  'Times New Roman, serif',
  'Courier New, monospace',
  'Comic Sans MS, cursive',
  'Trebuchet MS, sans-serif',
  'Verdana, sans-serif',
  'Tahoma, sans-serif',
];

const FONT_SIZES = [12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 80, 96];

const PRESET_COLORS = [
  '#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff',
  '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080',
  '#ffc0cb', '#a52a2a', '#808080', '#008000', '#000080',
];

export const TextEditor: React.FC = () => {
  const {
    textElements,
    selectedElementId,
    addTextElement,
    updateTextElement,
    deleteTextElement,
    selectElement,
  } = useMemeStore();

  const [showColorPicker, setShowColorPicker] = useState<string | null>(null);
  const [customColor, setCustomColor] = useState('#ffffff');

  const selectedElement = textElements.find(el => el.id === selectedElementId);

  const handleAddText = () => {
    const newElement = createNewTextElement({
      y: textElements.length * 60 + 50, // Stack new text elements
    });
    addTextElement(newElement);
  };

  const handleUpdateElement = (updates: Partial<TextElement>) => {
    if (selectedElementId) {
      updateTextElement(selectedElementId, updates);
    }
  };

  const handleDeleteElement = () => {
    if (selectedElementId) {
      deleteTextElement(selectedElementId);
    }
  };

  const handleColorSelect = (color: string) => {
    if (showColorPicker === 'fill') {
      handleUpdateElement({ fill: color });
    } else if (showColorPicker === 'stroke') {
      handleUpdateElement({ stroke: color });
    }
    setShowColorPicker(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Type className="h-5 w-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Text Editor</h3>
        </div>
        
        <button
          onClick={handleAddText}
          className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-all duration-200 hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>Add Text</span>
        </button>
      </div>

      {/* Text Elements List */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Text Elements</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {textElements.map((element) => (
            <button
              key={element.id}
              onClick={() => selectElement(element.id)}
              className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                selectedElementId === element.id
                  ? 'border-primary-300 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 truncate">
                  {element.text || 'Empty text'}
                </span>
                {selectedElementId === element.id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteElement();
                    }}
                    className="text-error-500 hover:text-error-700 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </button>
          ))}
          
          {textElements.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              No text elements yet. Add one to get started!
            </p>
          )}
        </div>
      </div>

      {/* Text Properties */}
      {selectedElement && (
        <div className="space-y-4">
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Edit Selected Text</h4>
            
            {/* Text Content */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Content
              </label>
              <textarea
                value={selectedElement.text}
                onChange={(e) => handleUpdateElement({ text: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                rows={2}
                placeholder="Enter your text..."
              />
            </div>

            {/* Font Family */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Family
              </label>
              <select
                value={selectedElement.fontFamily}
                onChange={(e) => handleUpdateElement({ fontFamily: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {FONT_FAMILIES.map((font) => (
                  <option key={font} value={font} style={{ fontFamily: font }}>
                    {font.split(',')[0]}
                  </option>
                ))}
              </select>
            </div>

            {/* Font Size */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Size: {selectedElement.fontSize}px
              </label>
              <input
                type="range"
                min="12"
                max="120"
                value={selectedElement.fontSize}
                onChange={(e) => handleUpdateElement({ fontSize: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>12px</span>
                <span>120px</span>
              </div>
            </div>

            {/* Text Colors */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Text Color
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowColorPicker(showColorPicker === 'fill' ? null : 'fill')}
                    className="w-full h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: selectedElement.fill }}
                  >
                    <Palette className="h-4 w-4 text-white mix-blend-difference" />
                  </button>
                  
                  {showColorPicker === 'fill' && (
                    <div className="absolute top-12 left-0 z-50 bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
                      <div className="grid grid-cols-5 gap-2 mb-3">
                        {PRESET_COLORS.map((color) => (
                          <button
                            key={color}
                            onClick={() => handleColorSelect(color)}
                            className="w-8 h-8 rounded-md border-2 border-gray-300 hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <input
                        type="color"
                        value={customColor}
                        onChange={(e) => {
                          setCustomColor(e.target.value);
                          handleColorSelect(e.target.value);
                        }}
                        className="w-full h-8 rounded-md border border-gray-300"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Outline Color
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowColorPicker(showColorPicker === 'stroke' ? null : 'stroke')}
                    className="w-full h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: selectedElement.stroke }}
                  >
                    <Palette className="h-4 w-4 text-white mix-blend-difference" />
                  </button>
                  
                  {showColorPicker === 'stroke' && (
                    <div className="absolute top-12 left-0 z-50 bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
                      <div className="grid grid-cols-5 gap-2 mb-3">
                        {PRESET_COLORS.map((color) => (
                          <button
                            key={color}
                            onClick={() => handleColorSelect(color)}
                            className="w-8 h-8 rounded-md border-2 border-gray-300 hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <input
                        type="color"
                        value={customColor}
                        onChange={(e) => {
                          setCustomColor(e.target.value);
                          handleColorSelect(e.target.value);
                        }}
                        className="w-full h-8 rounded-md border border-gray-300"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Outline Width */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Outline Width: {selectedElement.strokeWidth}px
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={selectedElement.strokeWidth}
                onChange={(e) => handleUpdateElement({ strokeWidth: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            {/* Text Alignment */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Alignment
              </label>
              <div className="flex space-x-2">
                {(['left', 'center', 'right'] as const).map((align) => (
                  <button
                    key={align}
                    onClick={() => handleUpdateElement({ align })}
                    className={`flex-1 p-2 rounded-lg border transition-all duration-200 ${
                      selectedElement.align === align
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {align === 'left' && <AlignLeft className="h-4 w-4 mx-auto" />}
                    {align === 'center' && <AlignCenter className="h-4 w-4 mx-auto" />}
                    {align === 'right' && <AlignRight className="h-4 w-4 mx-auto" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close color picker */}
      {showColorPicker && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowColorPicker(null)}
        />
      )}
    </div>
  );
};
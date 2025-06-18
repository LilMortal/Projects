import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Minus, Plus } from 'lucide-react';

interface ReadingSettingsProps {
  onClose: () => void;
}

export default function ReadingSettings({ onClose }: ReadingSettingsProps) {
  const { state, dispatch } = useApp();

  const updateSetting = (key: keyof typeof state.readingSettings, value: any) => {
    dispatch({
      type: 'UPDATE_READING_SETTINGS',
      payload: { [key]: value }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`max-w-md w-full rounded-xl shadow-2xl ${
        state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold">Reading Settings</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium mb-3">Font Size</label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => updateSetting('fontSize', Math.max(12, state.readingSettings.fontSize - 2))}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-medium min-w-[3rem] text-center">
                {state.readingSettings.fontSize}px
              </span>
              <button
                onClick={() => updateSetting('fontSize', Math.min(24, state.readingSettings.fontSize + 2))}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Line Height */}
          <div>
            <label className="block text-sm font-medium mb-3">Line Height</label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => updateSetting('lineHeight', Math.max(1.2, state.readingSettings.lineHeight - 0.2))}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-medium min-w-[3rem] text-center">
                {state.readingSettings.lineHeight.toFixed(1)}
              </span>
              <button
                onClick={() => updateSetting('lineHeight', Math.min(2.0, state.readingSettings.lineHeight + 0.2))}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Font Family */}
          <div>
            <label className="block text-sm font-medium mb-3">Font Family</label>
            <div className="grid grid-cols-2 gap-2">
              {['serif', 'sans-serif'].map((font) => (
                <button
                  key={font}
                  onClick={() => updateSetting('fontFamily', font)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    state.readingSettings.fontFamily === font
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  style={{ fontFamily: font === 'serif' ? 'Georgia, serif' : 'Arial, sans-serif' }}
                >
                  {font === 'serif' ? 'Serif' : 'Sans Serif'}
                </button>
              ))}
            </div>
          </div>

          {/* Reading Theme */}
          <div>
            <label className="block text-sm font-medium mb-3">Reading Theme</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'light', label: 'Light', bg: 'bg-white', text: 'text-gray-900' },
                { key: 'sepia', label: 'Sepia', bg: 'bg-yellow-50', text: 'text-yellow-900' },
                { key: 'dark', label: 'Dark', bg: 'bg-gray-900', text: 'text-gray-100' }
              ].map((theme) => (
                <button
                  key={theme.key}
                  onClick={() => updateSetting('theme', theme.key)}
                  className={`p-3 rounded-lg border-2 transition-all ${theme.bg} ${theme.text} ${
                    state.readingSettings.theme === theme.key
                      ? 'border-emerald-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>

          {/* Margin */}
          <div>
            <label className="block text-sm font-medium mb-3">Page Margin</label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => updateSetting('margin', Math.max(0, state.readingSettings.margin - 10))}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-medium min-w-[3rem] text-center">
                {state.readingSettings.margin}px
              </span>
              <button
                onClick={() => updateSetting('margin', Math.min(60, state.readingSettings.margin + 10))}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
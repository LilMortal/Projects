import React from 'react';
import { useApp } from '../context/AppContext';
import { Settings, Palette, Type, Moon, Sun, Monitor, Save } from 'lucide-react';

export default function SettingsPage() {
  const { state, dispatch } = useApp();
  const [tempSettings, setTempSettings] = React.useState(state.readingSettings);

  const handleSave = () => {
    dispatch({ type: 'UPDATE_READING_SETTINGS', payload: tempSettings });
    // Show success message
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    const defaultSettings = {
      fontSize: 16,
      lineHeight: 1.6,
      theme: 'light' as const,
      fontFamily: 'serif',
      margin: 20
    };
    setTempSettings(defaultSettings);
    dispatch({ type: 'UPDATE_READING_SETTINGS', payload: defaultSettings });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-gray-500 to-gray-600 flex items-center justify-center">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className={`text-lg ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Customize your reading experience
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* App Theme */}
        <div className={`p-6 rounded-xl ${
          state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } shadow-lg border border-gray-200 dark:border-gray-700`}>
          <div className="flex items-center space-x-3 mb-4">
            <Palette className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-semibold">App Theme</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => dispatch({ type: 'SET_THEME', payload: 'light' })}
              className={`p-4 rounded-lg border-2 transition-all flex items-center space-x-3 ${
                state.theme === 'light'
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <Sun className="w-5 h-5" />
              <span>Light Mode</span>
            </button>
            <button
              onClick={() => dispatch({ type: 'SET_THEME', payload: 'dark' })}
              className={`p-4 rounded-lg border-2 transition-all flex items-center space-x-3 ${
                state.theme === 'dark'
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <Moon className="w-5 h-5" />
              <span>Dark Mode</span>
            </button>
          </div>
        </div>

        {/* Reading Settings */}
        <div className={`p-6 rounded-xl ${
          state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } shadow-lg border border-gray-200 dark:border-gray-700`}>
          <div className="flex items-center space-x-3 mb-6">
            <Type className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-semibold">Reading Preferences</h2>
          </div>

          <div className="space-y-6">
            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium mb-3">Font Size</label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setTempSettings(prev => ({ 
                    ...prev, 
                    fontSize: Math.max(12, prev.fontSize - 2) 
                  }))}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-lg">−</span>
                </button>
                <div className="flex-1">
                  <input
                    type="range"
                    min="12"
                    max="24"
                    step="2"
                    value={tempSettings.fontSize}
                    onChange={(e) => setTempSettings(prev => ({ 
                      ...prev, 
                      fontSize: parseInt(e.target.value) 
                    }))}
                    className="w-full"
                  />
                </div>
                <button
                  onClick={() => setTempSettings(prev => ({ 
                    ...prev, 
                    fontSize: Math.min(24, prev.fontSize + 2) 
                  }))}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-lg">+</span>
                </button>
                <span className="text-lg font-medium min-w-[3rem] text-center">
                  {tempSettings.fontSize}px
                </span>
              </div>
            </div>

            {/* Line Height */}
            <div>
              <label className="block text-sm font-medium mb-3">Line Height</label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setTempSettings(prev => ({ 
                    ...prev, 
                    lineHeight: Math.max(1.2, Math.round((prev.lineHeight - 0.2) * 10) / 10) 
                  }))}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-lg">−</span>
                </button>
                <div className="flex-1">
                  <input
                    type="range"
                    min="1.2"
                    max="2.0"
                    step="0.2"
                    value={tempSettings.lineHeight}
                    onChange={(e) => setTempSettings(prev => ({ 
                      ...prev, 
                      lineHeight: parseFloat(e.target.value) 
                    }))}
                    className="w-full"
                  />
                </div>
                <button
                  onClick={() => setTempSettings(prev => ({ 
                    ...prev, 
                    lineHeight: Math.min(2.0, Math.round((prev.lineHeight + 0.2) * 10) / 10) 
                  }))}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-lg">+</span>
                </button>
                <span className="text-lg font-medium min-w-[3rem] text-center">
                  {tempSettings.lineHeight.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Font Family */}
            <div>
              <label className="block text-sm font-medium mb-3">Font Family</label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: 'serif', label: 'Serif', family: 'Georgia, serif' },
                  { key: 'sans-serif', label: 'Sans Serif', family: 'Arial, sans-serif' }
                ].map((font) => (
                  <button
                    key={font.key}
                    onClick={() => setTempSettings(prev => ({ ...prev, fontFamily: font.key }))}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      tempSettings.fontFamily === font.key
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    style={{ fontFamily: font.family }}
                  >
                    {font.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reading Theme */}
            <div>
              <label className="block text-sm font-medium mb-3">Reading Theme</label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { key: 'light', label: 'Light', bg: 'bg-white', text: 'text-gray-900' },
                  { key: 'sepia', label: 'Sepia', bg: 'bg-yellow-50', text: 'text-yellow-900' },
                  { key: 'dark', label: 'Dark', bg: 'bg-gray-900', text: 'text-gray-100' }
                ].map((theme) => (
                  <button
                    key={theme.key}
                    onClick={() => setTempSettings(prev => ({ ...prev, theme: theme.key as any }))}
                    className={`p-4 rounded-lg border-2 transition-all ${theme.bg} ${theme.text} ${
                      tempSettings.theme === theme.key
                        ? 'border-emerald-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {theme.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Page Margin */}
            <div>
              <label className="block text-sm font-medium mb-3">Page Margin</label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setTempSettings(prev => ({ 
                    ...prev, 
                    margin: Math.max(0, prev.margin - 10) 
                  }))}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-lg">−</span>
                </button>
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="60"
                    step="10"
                    value={tempSettings.margin}
                    onChange={(e) => setTempSettings(prev => ({ 
                      ...prev, 
                      margin: parseInt(e.target.value) 
                    }))}
                    className="w-full"
                  />
                </div>
                <button
                  onClick={() => setTempSettings(prev => ({ 
                    ...prev, 
                    margin: Math.min(60, prev.margin + 10) 
                  }))}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-lg">+</span>
                </button>
                <span className="text-lg font-medium min-w-[4rem] text-center">
                  {tempSettings.margin}px
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className={`p-6 rounded-xl ${
          state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } shadow-lg border border-gray-200 dark:border-gray-700`}>
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div 
            className={`p-6 rounded-lg ${
              tempSettings.theme === 'dark' ? 'bg-gray-900 text-gray-100' :
              tempSettings.theme === 'sepia' ? 'bg-yellow-50 text-yellow-900' :
              'bg-white text-gray-900'
            }`}
            style={{
              fontSize: `${tempSettings.fontSize}px`,
              lineHeight: tempSettings.lineHeight,
              fontFamily: tempSettings.fontFamily === 'serif' ? 'Georgia, serif' : 'Arial, sans-serif',
              margin: `0 ${tempSettings.margin}px`,
            }}
          >
            <p className="mb-4">
              This is a preview of how your text will appear with the current settings. 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
              aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 justify-end">
          <button
            onClick={handleReset}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              state.theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
            }`}
          >
            Reset to Default
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-lg hover:from-emerald-600 hover:to-indigo-700 transition-all duration-200 font-medium"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
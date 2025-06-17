import React from 'react';
import { Palette, Download, RotateCcw } from 'lucide-react';

interface HeaderProps {
  onDownload: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onDownload, onReset }) => {
  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-2 rounded-xl shadow-lg">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-gray-900">MemeMuse</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Create Amazing Memes</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onReset}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              onClick={onDownload}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
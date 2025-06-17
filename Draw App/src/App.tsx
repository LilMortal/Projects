import React from 'react';
import { DrawingProvider } from './context/DrawingContext';
import { Toolbar } from './components/Toolbar';
import { Canvas } from './components/Canvas';
import { LayersPanel } from './components/LayersPanel';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

function DrawingApp() {
  useKeyboardShortcuts();

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AetherDraw
          </h1>
          <p className="text-sm text-gray-600 mt-1">Professional drawing application</p>
        </div>
      </header>
      
      <Toolbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Canvas width={1920} height={1080} />
        <LayersPanel />
      </div>
      
      <footer className="bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-6">
            <span>Ready to draw</span>
            <span>•</span>
            <span>Use keyboard shortcuts for faster workflow</span>
          </div>
          <div className="flex items-center space-x-4">
            <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl+Z</kbd>
            <span className="text-xs">Undo</span>
            <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">G</kbd>
            <span className="text-xs">Toggle Grid</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <DrawingProvider>
      <DrawingApp />
    </DrawingProvider>
  );
}

export default App;
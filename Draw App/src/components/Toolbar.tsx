import React from 'react';
import { 
  Brush, 
  Eraser, 
  Minus, 
  Square, 
  Circle, 
  PaintBucket, 
  Hand, 
  Grid3X3, 
  ZoomIn, 
  ZoomOut,
  RotateCcw,
  RotateCw,
  Download,
  Upload
} from 'lucide-react';
import { useDrawing } from '../context/DrawingContext';

const tools = [
  { id: 'brush', icon: Brush, label: 'Brush (B)' },
  { id: 'eraser', icon: Eraser, label: 'Eraser (E)' },
  { id: 'line', icon: Minus, label: 'Line (L)' },
  { id: 'rectangle', icon: Square, label: 'Rectangle (R)' },
  { id: 'circle', icon: Circle, label: 'Circle (C)' },
  { id: 'fill', icon: PaintBucket, label: 'Fill (F)' },
  { id: 'pan', icon: Hand, label: 'Pan (H)' },
];

const colors = [
  '#2563eb', '#dc2626', '#16a34a', '#ca8a04', '#9333ea', '#c2410c',
  '#0891b2', '#be123c', '#166534', '#a16207', '#7c2d12', '#1e40af',
  '#000000', '#374151', '#6b7280', '#9ca3af', '#d1d5db', '#ffffff'
];

export function Toolbar() {
  const { state, actions } = useDrawing();

  const handleExport = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'aetherdraw-export.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const img = new Image();
        img.onload = () => {
          const canvas = document.querySelector('canvas');
          if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0);
              actions.saveToHistory();
            }
          }
        };
        img.src = URL.createObjectURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-6">
          {/* Tools */}
          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => actions.setTool(tool.id)}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    state.tool === tool.id
                      ? 'bg-blue-100 text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm'
                  }`}
                  title={tool.label}
                >
                  <Icon size={18} />
                </button>
              );
            })}
          </div>

          {/* Brush Size */}
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700">Size</label>
            <input
              type="range"
              min="1"
              max="50"
              value={state.brushSize}
              onChange={(e) => actions.setBrushSize(Number(e.target.value))}
              className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-sm text-gray-600 w-8">{state.brushSize}</span>
          </div>

          {/* Opacity */}
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700">Opacity</label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={state.opacity}
              onChange={(e) => actions.setOpacity(Number(e.target.value))}
              className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-sm text-gray-600 w-8">{Math.round(state.opacity * 100)}%</span>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          {/* Colors */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Color</span>
            <div className="flex items-center space-x-1 bg-gray-50 rounded-lg p-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => actions.setColor(color)}
                  className={`w-8 h-8 rounded-md border-2 transition-all duration-200 ${
                    state.color === color
                      ? 'border-gray-400 scale-110 shadow-md'
                      : 'border-gray-300 hover:border-gray-400 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
            <button
              onClick={actions.undo}
              className="p-2 text-gray-600 hover:bg-white hover:text-gray-900 rounded-md transition-all duration-200 hover:shadow-sm"
              title="Undo (Ctrl+Z)"
            >
              <RotateCcw size={18} />
            </button>
            <button
              onClick={actions.redo}
              className="p-2 text-gray-600 hover:bg-white hover:text-gray-900 rounded-md transition-all duration-200 hover:shadow-sm"
              title="Redo (Ctrl+Y)"
            >
              <RotateCw size={18} />
            </button>
            <div className="w-px h-6 bg-gray-300" />
            <button
              onClick={() => actions.setZoom(state.zoom * 1.2)}
              className="p-2 text-gray-600 hover:bg-white hover:text-gray-900 rounded-md transition-all duration-200 hover:shadow-sm"
              title="Zoom In (+)"
            >
              <ZoomIn size={18} />
            </button>
            <button
              onClick={() => actions.setZoom(state.zoom * 0.8)}
              className="p-2 text-gray-600 hover:bg-white hover:text-gray-900 rounded-md transition-all duration-200 hover:shadow-sm"
              title="Zoom Out (-)"
            >
              <ZoomOut size={18} />
            </button>
            <button
              onClick={actions.toggleGrid}
              className={`p-2 rounded-md transition-all duration-200 ${
                state.showGrid
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm'
              }`}
              title="Toggle Grid (G)"
            >
              <Grid3X3 size={18} />
            </button>
            <div className="w-px h-6 bg-gray-300" />
            <button
              onClick={handleImport}
              className="p-2 text-gray-600 hover:bg-white hover:text-gray-900 rounded-md transition-all duration-200 hover:shadow-sm"
              title="Import Image"
            >
              <Upload size={18} />
            </button>
            <button
              onClick={handleExport}
              className="p-2 text-gray-600 hover:bg-white hover:text-gray-900 rounded-md transition-all duration-200 hover:shadow-sm"
              title="Export as PNG"
            >
              <Download size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
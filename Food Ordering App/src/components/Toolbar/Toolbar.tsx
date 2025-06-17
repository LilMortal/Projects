import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  RotateCw,
  Download,
  Upload,
  Grid3X3,
  Layers,
} from 'lucide-react';
import { Button } from '../UI/Button';
import { ToolSelector } from './ToolSelector';
import { ColorPicker } from './ColorPicker';
import { BrushSettings } from './BrushSettings';
import { useToolStore } from '../../store/toolStore';
import { useCanvasStore } from '../../store/canvasStore';
import { useHistoryStore } from '../../store/historyStore';

interface ToolbarProps {
  onSave: () => void;
  onLoad: () => void;
  onToggleLayers: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onSave,
  onLoad,
  onToggleLayers,
}) => {
  const {
    currentTool,
    brushColor,
    brushSize,
    eraserSize,
    setCurrentTool,
    setBrushColor,
    setBrushSize,
    setEraserSize,
  } = useToolStore();

  const {
    zoom,
    showGrid,
    zoomIn,
    zoomOut,
    toggleGrid,
    resetView,
  } = useCanvasStore();

  const { undo, redo, canUndo, canRedo } = useHistoryStore();

  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div className="fixed left-4 top-4 bottom-4 w-64 flex flex-col gap-4 z-10">
      {/* Main Tools */}
      <ToolSelector
        currentTool={currentTool}
        onToolChange={setCurrentTool}
      />

      {/* Color Picker */}
      {currentTool !== 'eraser' && (
        <div className="relative">
          <div className="p-4 bg-white rounded-xl shadow-soft border border-neutral-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-neutral-700">Color</h3>
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="w-8 h-8 rounded-lg border-2 border-neutral-300"
                style={{ backgroundColor: brushColor }}
              />
            </div>
          </div>
          
          {showColorPicker && (
            <div className="absolute left-0 top-full mt-2 z-20">
              <ColorPicker
                selectedColor={brushColor}
                onColorChange={setBrushColor}
              />
            </div>
          )}
        </div>
      )}

      {/* Brush Settings */}
      <BrushSettings
        brushSize={brushSize}
        eraserSize={eraserSize}
        onBrushSizeChange={setBrushSize}
        onEraserSizeChange={setEraserSize}
        currentTool={currentTool}
      />

      {/* Canvas Controls */}
      <div className="p-4 bg-white rounded-xl shadow-soft border border-neutral-200">
        <h3 className="text-sm font-medium text-neutral-700 mb-3">Canvas</h3>
        
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button
              onClick={zoomIn}
              icon={ZoomIn}
              variant="ghost"
              size="sm"
              className="flex-1"
            >
              Zoom In
            </Button>
            <Button
              onClick={zoomOut}
              icon={ZoomOut}
              variant="ghost"
              size="sm"
              className="flex-1"
            >
              Zoom Out
            </Button>
          </div>
          
          <div className="text-center text-sm text-neutral-500">
            {Math.round(zoom * 100)}%
          </div>
          
          <Button
            onClick={resetView}
            variant="ghost"
            size="sm"
          >
            Reset View
          </Button>
          
          <Button
            onClick={toggleGrid}
            icon={Grid3X3}
            variant="ghost"
            size="sm"
            active={showGrid}
          >
            Grid
          </Button>
        </div>
      </div>

      {/* History Controls */}
      <div className="p-4 bg-white rounded-xl shadow-soft border border-neutral-200">
        <h3 className="text-sm font-medium text-neutral-700 mb-3">History</h3>
        
        <div className="flex gap-2">
          <Button
            onClick={undo}
            icon={RotateCcw}
            variant="ghost"
            size="sm"
            disabled={!canUndo()}
            className="flex-1"
          >
            Undo
          </Button>
          <Button
            onClick={redo}
            icon={RotateCw}
            variant="ghost"
            size="sm"
            disabled={!canRedo()}
            className="flex-1"
          >
            Redo
          </Button>
        </div>
      </div>

      {/* File Operations */}
      <div className="p-4 bg-white rounded-xl shadow-soft border border-neutral-200">
        <h3 className="text-sm font-medium text-neutral-700 mb-3">File</h3>
        
        <div className="flex flex-col gap-2">
          <Button
            onClick={onSave}
            icon={Download}
            variant="ghost"
            size="sm"
          >
            Save (Ctrl+S)
          </Button>
          <Button
            onClick={onLoad}
            icon={Upload}
            variant="ghost"
            size="sm"
          >
            Load (Ctrl+O)
          </Button>
          <Button
            onClick={onToggleLayers}
            icon={Layers}
            variant="ghost"
            size="sm"
          >
            Layers
          </Button>
        </div>
      </div>
    </div>
  );
};
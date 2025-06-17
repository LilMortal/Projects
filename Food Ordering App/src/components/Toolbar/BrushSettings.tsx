import React from 'react';
import { Slider } from '../UI/Slider';

interface BrushSettingsProps {
  brushSize: number;
  eraserSize: number;
  onBrushSizeChange: (size: number) => void;
  onEraserSizeChange: (size: number) => void;
  currentTool: string;
}

export const BrushSettings: React.FC<BrushSettingsProps> = ({
  brushSize,
  eraserSize,
  onBrushSizeChange,
  onEraserSizeChange,
  currentTool,
}) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-soft border border-neutral-200">
      <h3 className="text-sm font-medium text-neutral-700 mb-3">Size</h3>
      
      {currentTool === 'eraser' ? (
        <Slider
          label="Eraser Size"
          value={eraserSize}
          onChange={onEraserSizeChange}
          min={5}
          max={100}
          step={1}
        />
      ) : (
        <Slider
          label="Brush Size"
          value={brushSize}
          onChange={onBrushSizeChange}
          min={1}
          max={100}
          step={1}
        />
      )}
      
      <div className={`mt-3 mx-auto bg-current rounded-full ${
        currentTool === 'eraser' ? 'bg-neutral-400' : 'bg-black'
      }`}
        style={{
          width: `${Math.min(currentTool === 'eraser' ? eraserSize : brushSize, 40)}px`,
          height: `${Math.min(currentTool === 'eraser' ? eraserSize : brushSize, 40)}px`,
        }}
      />
    </div>
  );
};
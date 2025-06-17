import React from 'react';
import { 
  Brush, 
  Eraser, 
  Minus, 
  Square, 
  Circle, 
  PaintBucket, 
  MousePointer2,
  Move
} from 'lucide-react';
import { Button } from '../UI/Button';
import type { DrawingTool } from '../../types';

interface ToolSelectorProps {
  currentTool: DrawingTool;
  onToolChange: (tool: DrawingTool) => void;
}

const TOOLS = [
  { id: 'brush' as DrawingTool, icon: Brush, label: 'Brush (B)' },
  { id: 'eraser' as DrawingTool, icon: Eraser, label: 'Eraser (E)' },
  { id: 'line' as DrawingTool, icon: Minus, label: 'Line' },
  { id: 'rectangle' as DrawingTool, icon: Square, label: 'Rectangle' },
  { id: 'circle' as DrawingTool, icon: Circle, label: 'Circle' },
  { id: 'fill' as DrawingTool, icon: PaintBucket, label: 'Fill' },
  { id: 'select' as DrawingTool, icon: MousePointer2, label: 'Select' },
  { id: 'pan' as DrawingTool, icon: Move, label: 'Pan (Space)' },
];

export const ToolSelector: React.FC<ToolSelectorProps> = ({
  currentTool,
  onToolChange,
}) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-xl shadow-soft border border-neutral-200">
      <h3 className="text-sm font-medium text-neutral-700 mb-2">Tools</h3>
      
      <div className="grid grid-cols-2 gap-2">
        {TOOLS.map((tool) => (
          <Button
            key={tool.id}
            onClick={() => onToolChange(tool.id)}
            icon={tool.icon}
            variant="ghost"
            size="sm"
            active={currentTool === tool.id}
            className="justify-start"
            title={tool.label}
          >
            <span className="hidden sm:inline">{tool.label.split(' ')[0]}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
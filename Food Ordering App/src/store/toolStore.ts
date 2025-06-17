import { create } from 'zustand';
import type { DrawingTool, ToolSettings } from '../types';
import { TOOL_CONFIG, COLORS } from '../constants';

interface ToolStore extends ToolSettings {
  // Actions
  setCurrentTool: (tool: DrawingTool) => void;
  setBrushColor: (color: string) => void;
  setBrushSize: (size: number) => void;
  setEraserSize: (size: number) => void;
}

export const useToolStore = create<ToolStore>((set) => ({
  // State
  currentTool: 'brush',
  brushColor: COLORS[0],
  brushSize: TOOL_CONFIG.DEFAULT_BRUSH_SIZE,
  eraserSize: TOOL_CONFIG.DEFAULT_ERASER_SIZE,

  // Actions
  setCurrentTool: (currentTool) => set({ currentTool }),
  setBrushColor: (brushColor) => set({ brushColor }),
  setBrushSize: (brushSize) => set({ 
    brushSize: Math.max(TOOL_CONFIG.MIN_BRUSH_SIZE, Math.min(TOOL_CONFIG.MAX_BRUSH_SIZE, brushSize))
  }),
  setEraserSize: (eraserSize) => set({ 
    eraserSize: Math.max(TOOL_CONFIG.MIN_ERASER_SIZE, Math.min(TOOL_CONFIG.MAX_ERASER_SIZE, eraserSize))
  }),
}));
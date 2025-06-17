import { create } from 'zustand';
import type { CanvasState, Point } from '../types';
import { CANVAS_CONFIG } from '../constants';

interface CanvasStore extends CanvasState {
  isDrawing: boolean;
  lastPoint: Point | null;
  showGrid: boolean;
  
  // Actions
  setZoom: (zoom: number) => void;
  setPan: (panX: number, panY: number) => void;
  setCanvasSize: (width: number, height: number) => void;
  setIsDrawing: (isDrawing: boolean) => void;
  setLastPoint: (point: Point | null) => void;
  toggleGrid: () => void;
  resetView: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

export const useCanvasStore = create<CanvasStore>((set, get) => ({
  // State
  zoom: 1,
  panX: 0,
  panY: 0,
  width: CANVAS_CONFIG.DEFAULT_WIDTH,
  height: CANVAS_CONFIG.DEFAULT_HEIGHT,
  isDrawing: false,
  lastPoint: null,
  showGrid: false,

  // Actions
  setZoom: (zoom) => set({ 
    zoom: Math.max(CANVAS_CONFIG.MIN_ZOOM, Math.min(CANVAS_CONFIG.MAX_ZOOM, zoom))
  }),
  
  setPan: (panX, panY) => set({ panX, panY }),
  
  setCanvasSize: (width, height) => set({ width, height }),
  
  setIsDrawing: (isDrawing) => set({ isDrawing }),
  
  setLastPoint: (lastPoint) => set({ lastPoint }),
  
  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
  
  resetView: () => set({
    zoom: 1,
    panX: 0,
    panY: 0,
  }),
  
  zoomIn: () => {
    const { zoom } = get();
    set({ zoom: Math.min(CANVAS_CONFIG.MAX_ZOOM, zoom + CANVAS_CONFIG.ZOOM_STEP) });
  },
  
  zoomOut: () => {
    const { zoom } = get();
    set({ zoom: Math.max(CANVAS_CONFIG.MIN_ZOOM, zoom - CANVAS_CONFIG.ZOOM_STEP) });
  },
}));
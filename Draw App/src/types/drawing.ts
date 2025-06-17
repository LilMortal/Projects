export interface Point {
  x: number;
  y: number;
}

export interface DrawingState {
  tool: DrawingTool;
  brushSize: number;
  color: string;
  opacity: number;
  zoom: number;
  pan: Point;
  showGrid: boolean;
  layers: Layer[];
  currentLayerId: string;
  history: HistoryState[];
  historyIndex: number;
}

export interface Layer {
  id: string;
  name: string;
  visible: boolean;
  opacity: number;
  imageData?: ImageData;
}

export interface HistoryState {
  layers: Layer[];
  timestamp: number;
}

export type DrawingTool = 
  | 'brush' 
  | 'eraser' 
  | 'line' 
  | 'rectangle' 
  | 'circle' 
  | 'fill' 
  | 'pan';

export interface DrawingAction {
  type: string;
  payload?: any;
}
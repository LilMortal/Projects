import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { DrawingState, DrawingAction, Layer, HistoryState, Point } from '../types/drawing';

const initialState: DrawingState = {
  tool: 'brush',
  brushSize: 5,
  color: '#2563eb',
  opacity: 1,
  zoom: 1,
  pan: { x: 0, y: 0 },
  showGrid: false,
  layers: [
    {
      id: 'layer-1',
      name: 'Layer 1',
      visible: true,
      opacity: 1,
    }
  ],
  currentLayerId: 'layer-1',
  history: [],
  historyIndex: -1,
};

function drawingReducer(state: DrawingState, action: DrawingAction): DrawingState {
  switch (action.type) {
    case 'SET_TOOL':
      return { ...state, tool: action.payload };
    
    case 'SET_BRUSH_SIZE':
      return { ...state, brushSize: action.payload };
    
    case 'SET_COLOR':
      return { ...state, color: action.payload };
    
    case 'SET_OPACITY':
      return { ...state, opacity: action.payload };
    
    case 'SET_ZOOM':
      return { ...state, zoom: Math.max(0.1, Math.min(5, action.payload)) };
    
    case 'SET_PAN':
      return { ...state, pan: action.payload };
    
    case 'TOGGLE_GRID':
      return { ...state, showGrid: !state.showGrid };
    
    case 'ADD_LAYER':
      const newLayer: Layer = {
        id: `layer-${Date.now()}`,
        name: `Layer ${state.layers.length + 1}`,
        visible: true,
        opacity: 1,
      };
      return {
        ...state,
        layers: [...state.layers, newLayer],
        currentLayerId: newLayer.id,
      };
    
    case 'DELETE_LAYER':
      if (state.layers.length <= 1) return state;
      const remainingLayers = state.layers.filter(layer => layer.id !== action.payload);
      return {
        ...state,
        layers: remainingLayers,
        currentLayerId: remainingLayers[0]?.id || '',
      };
    
    case 'SET_CURRENT_LAYER':
      return { ...state, currentLayerId: action.payload };
    
    case 'TOGGLE_LAYER_VISIBILITY':
      return {
        ...state,
        layers: state.layers.map(layer =>
          layer.id === action.payload
            ? { ...layer, visible: !layer.visible }
            : layer
        ),
      };
    
    case 'SET_LAYER_OPACITY':
      return {
        ...state,
        layers: state.layers.map(layer =>
          layer.id === action.payload.id
            ? { ...layer, opacity: action.payload.opacity }
            : layer
        ),
      };
    
    case 'SAVE_TO_HISTORY':
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      const historyState: HistoryState = {
        layers: JSON.parse(JSON.stringify(state.layers)),
        timestamp: Date.now(),
      };
      
      return {
        ...state,
        history: [...newHistory, historyState],
        historyIndex: newHistory.length,
      };
    
    case 'UNDO':
      if (state.historyIndex > 0) {
        const prevState = state.history[state.historyIndex - 1];
        return {
          ...state,
          layers: prevState.layers,
          historyIndex: state.historyIndex - 1,
        };
      }
      return state;
    
    case 'REDO':
      if (state.historyIndex < state.history.length - 1) {
        const nextState = state.history[state.historyIndex + 1];
        return {
          ...state,
          layers: nextState.layers,
          historyIndex: state.historyIndex + 1,
        };
      }
      return state;
    
    default:
      return state;
  }
}

interface DrawingContextType {
  state: DrawingState;
  dispatch: React.Dispatch<DrawingAction>;
  actions: {
    setTool: (tool: string) => void;
    setBrushSize: (size: number) => void;
    setColor: (color: string) => void;
    setOpacity: (opacity: number) => void;
    setZoom: (zoom: number) => void;
    setPan: (pan: Point) => void;
    toggleGrid: () => void;
    addLayer: () => void;
    deleteLayer: (id: string) => void;
    setCurrentLayer: (id: string) => void;
    toggleLayerVisibility: (id: string) => void;
    setLayerOpacity: (id: string, opacity: number) => void;
    saveToHistory: () => void;
    undo: () => void;
    redo: () => void;
  };
}

const DrawingContext = createContext<DrawingContextType | null>(null);

export function DrawingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(drawingReducer, initialState);

  const actions = {
    setTool: useCallback((tool: string) => dispatch({ type: 'SET_TOOL', payload: tool }), []),
    setBrushSize: useCallback((size: number) => dispatch({ type: 'SET_BRUSH_SIZE', payload: size }), []),
    setColor: useCallback((color: string) => dispatch({ type: 'SET_COLOR', payload: color }), []),
    setOpacity: useCallback((opacity: number) => dispatch({ type: 'SET_OPACITY', payload: opacity }), []),
    setZoom: useCallback((zoom: number) => dispatch({ type: 'SET_ZOOM', payload: zoom }), []),
    setPan: useCallback((pan: Point) => dispatch({ type: 'SET_PAN', payload: pan }), []),
    toggleGrid: useCallback(() => dispatch({ type: 'TOGGLE_GRID' }), []),
    addLayer: useCallback(() => dispatch({ type: 'ADD_LAYER' }), []),
    deleteLayer: useCallback((id: string) => dispatch({ type: 'DELETE_LAYER', payload: id }), []),
    setCurrentLayer: useCallback((id: string) => dispatch({ type: 'SET_CURRENT_LAYER', payload: id }), []),
    toggleLayerVisibility: useCallback((id: string) => dispatch({ type: 'TOGGLE_LAYER_VISIBILITY', payload: id }), []),
    setLayerOpacity: useCallback((id: string, opacity: number) => 
      dispatch({ type: 'SET_LAYER_OPACITY', payload: { id, opacity } }), []),
    saveToHistory: useCallback(() => dispatch({ type: 'SAVE_TO_HISTORY' }), []),
    undo: useCallback(() => dispatch({ type: 'UNDO' }), []),
    redo: useCallback(() => dispatch({ type: 'REDO' }), []),
  };

  return (
    <DrawingContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </DrawingContext.Provider>
  );
}

export function useDrawing() {
  const context = useContext(DrawingContext);
  if (!context) {
    throw new Error('useDrawing must be used within a DrawingProvider');
  }
  return context;
}
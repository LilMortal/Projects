import { create } from 'zustand';
import type { Layer } from '../types';

interface LayerStore {
  layers: Layer[];
  activeLayerId: string;
  
  // Actions
  addLayer: (name?: string) => void;
  removeLayer: (id: string) => void;
  setActiveLayer: (id: string) => void;
  toggleLayerVisibility: (id: string) => void;
  renameLayer: (id: string, name: string) => void;
  setLayerOpacity: (id: string, opacity: number) => void;
  reorderLayers: (fromIndex: number, toIndex: number) => void;
}

const createLayer = (name: string): Layer => ({
  id: `layer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  name,
  visible: true,
  opacity: 1,
});

export const useLayerStore = create<LayerStore>((set, get) => ({
  // State
  layers: [createLayer('Background')],
  activeLayerId: '',

  // Actions
  addLayer: (name = `Layer ${get().layers.length + 1}`) => {
    const newLayer = createLayer(name);
    set((state) => ({
      layers: [...state.layers, newLayer],
      activeLayerId: newLayer.id,
    }));
  },

  removeLayer: (id) => set((state) => {
    if (state.layers.length <= 1) return state; // Keep at least one layer
    
    const newLayers = state.layers.filter(layer => layer.id !== id);
    const newActiveLayerId = state.activeLayerId === id 
      ? newLayers[newLayers.length - 1]?.id || ''
      : state.activeLayerId;

    return {
      layers: newLayers,
      activeLayerId: newActiveLayerId,
    };
  }),

  setActiveLayer: (activeLayerId) => set({ activeLayerId }),

  toggleLayerVisibility: (id) => set((state) => ({
    layers: state.layers.map(layer =>
      layer.id === id ? { ...layer, visible: !layer.visible } : layer
    ),
  })),

  renameLayer: (id, name) => set((state) => ({
    layers: state.layers.map(layer =>
      layer.id === id ? { ...layer, name } : layer
    ),
  })),

  setLayerOpacity: (id, opacity) => set((state) => ({
    layers: state.layers.map(layer =>
      layer.id === id ? { ...layer, opacity: Math.max(0, Math.min(1, opacity)) } : layer
    ),
  })),

  reorderLayers: (fromIndex, toIndex) => set((state) => {
    const newLayers = [...state.layers];
    const [movedLayer] = newLayers.splice(fromIndex, 1);
    newLayers.splice(toIndex, 0, movedLayer);
    return { layers: newLayers };
  }),
}));

// Initialize active layer
setTimeout(() => {
  const { layers, setActiveLayer } = useLayerStore.getState();
  if (layers.length > 0 && !useLayerStore.getState().activeLayerId) {
    setActiveLayer(layers[0].id);
  }
}, 0);
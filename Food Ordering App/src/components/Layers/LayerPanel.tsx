import React from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '../UI/Button';
import { LayerItem } from './LayerItem';
import { useLayerStore } from '../../store/layerStore';

interface LayerPanelProps {
  onClose: () => void;
}

export const LayerPanel: React.FC<LayerPanelProps> = ({ onClose }) => {
  const {
    layers,
    activeLayerId,
    addLayer,
    removeLayer,
    setActiveLayer,
    toggleLayerVisibility,
    renameLayer,
  } = useLayerStore();

  return (
    <div className="fixed right-4 top-4 bottom-4 w-80 bg-white rounded-xl shadow-strong border border-neutral-200 flex flex-col z-10">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200">
        <h2 className="text-lg font-semibold text-neutral-800">Layers</h2>
        <Button
          onClick={onClose}
          icon={X}
          variant="ghost"
          size="sm"
        />
      </div>

      {/* Add Layer Button */}
      <div className="p-4 border-b border-neutral-200">
        <Button
          onClick={() => addLayer()}
          icon={Plus}
          variant="primary"
          size="sm"
          className="w-full"
        >
          Add Layer
        </Button>
      </div>

      {/* Layers List */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {[...layers].reverse().map((layer) => (
            <LayerItem
              key={layer.id}
              layer={layer}
              isActive={layer.id === activeLayerId}
              onSelect={() => setActiveLayer(layer.id)}
              onToggleVisibility={() => toggleLayerVisibility(layer.id)}
              onDelete={() => removeLayer(layer.id)}
              onRename={(name) => renameLayer(layer.id, name)}
            />
          ))}
        </div>
      </div>

      {/* Layer Count */}
      <div className="p-4 border-t border-neutral-200 text-sm text-neutral-500">
        {layers.length} layer{layers.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
};
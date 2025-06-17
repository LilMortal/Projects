import React, { useState } from 'react';
import { Eye, EyeOff, Plus, Trash2, ChevronRight, ChevronDown } from 'lucide-react';
import { useDrawing } from '../context/DrawingContext';

export function LayersPanel() {
  const { state, actions } = useDrawing();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isCollapsed) {
    return (
      <div className="bg-white border-l border-gray-200 shadow-sm w-12 flex flex-col">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-3 text-gray-600 hover:bg-gray-50 border-b border-gray-200"
          title="Expand Layers Panel"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border-l border-gray-200 shadow-sm w-80 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Layers</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={actions.addLayer}
            className="p-1.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-all duration-200"
            title="Add Layer"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-all duration-200"
            title="Collapse Panel"
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-3 space-y-2">
          {state.layers.slice().reverse().map((layer) => (
            <div
              key={layer.id}
              className={`p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                state.currentLayerId === layer.id
                  ? 'border-blue-200 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
              }`}
              onClick={() => actions.setCurrentLayer(layer.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      actions.toggleLayerVisibility(layer.id);
                    }}
                    className="p-1 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    {layer.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <span className="font-medium text-gray-900">{layer.name}</span>
                </div>
                
                {state.layers.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      actions.deleteLayer(layer.id);
                    }}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                    title="Delete Layer"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              
              <div className="mt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Opacity</span>
                  <span className="text-sm text-gray-600">{Math.round(layer.opacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={layer.opacity}
                  onChange={(e) => {
                    e.stopPropagation();
                    actions.setLayerOpacity(layer.id, Number(e.target.value));
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500 space-y-1">
          <div>Active Layer: {state.layers.find(l => l.id === state.currentLayerId)?.name}</div>
          <div>Total Layers: {state.layers.length}</div>
        </div>
      </div>
    </div>
  );
}
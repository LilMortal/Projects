import React from 'react';
import { HistoryItem } from '../types/calculator';

interface DisplayProps {
  currentDisplay: string;
  history: HistoryItem[];
  angleMode: 'degrees' | 'radians';
  onToggleAngleMode: () => void;
}

const Display: React.FC<DisplayProps> = ({ 
  currentDisplay, 
  history, 
  angleMode, 
  onToggleAngleMode 
}) => {
  const formatDisplayText = (text: string) => {
    // Limit display length and add ellipsis if too long
    if (text.length > 15) {
      return '...' + text.slice(-12);
    }
    return text;
  };

  return (
    <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
      {/* History */}
      <div className="mb-4 h-20 overflow-y-auto">
        {history.slice(-3).map((item, index) => (
          <div key={item.timestamp} className="text-xs text-slate-400 mb-1 animate-fade-in">
            <div className="flex justify-between items-center">
              <span className="font-mono">{formatDisplayText(item.expression)}</span>
              <span className="text-slate-300">=</span>
            </div>
            <div className="text-right text-slate-300 -mt-1">
              {formatDisplayText(item.result)}
            </div>
          </div>
        ))}
      </div>

      {/* Current Display */}
      <div className="border-t border-slate-600/50 pt-4">
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={onToggleAngleMode}
            className="text-xs px-3 py-1 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 transition-colors duration-200"
          >
            {angleMode.toUpperCase()}
          </button>
          <div className="text-xs text-slate-400">
            Scientific Calculator
          </div>
        </div>
        
        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-600/30">
          <div className="text-right">
            <div className="text-2xl font-mono text-white min-h-[2rem] flex items-center justify-end">
              {formatDisplayText(currentDisplay || '0')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
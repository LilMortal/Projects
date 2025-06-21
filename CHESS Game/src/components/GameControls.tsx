import React from 'react';
import { GameMode } from '../types/chess';
import { 
  RotateCcw, 
  RefreshCw, 
  Users, 
  Bot, 
  Play, 
  Pause 
} from 'lucide-react';

interface GameControlsProps {
  gameMode: GameMode;
  canUndo: boolean;
  isTimerActive: boolean;
  onUndo: () => void;
  onReset: () => void;
  onSwitchMode: (mode: GameMode) => void;
  onStartTimer: () => void;
  onPauseTimer: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  gameMode,
  canUndo,
  isTimerActive,
  onUndo,
  onReset,
  onSwitchMode,
  onStartTimer,
  onPauseTimer
}) => {
  return (
    <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-lg p-4 space-y-4 border border-gray-700">
      <h3 className="text-amber-100 font-semibold text-lg">Game Controls</h3>
      
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onSwitchMode('pvp')}
          className={`
            flex items-center justify-center gap-2 py-2 px-3 rounded-lg
            transition-all duration-200 font-medium text-sm
            ${gameMode === 'pvp'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }
          `}
        >
          <Users className="w-4 h-4" />
          <span>PvP</span>
        </button>
        
        <button
          onClick={() => onSwitchMode('ai')}
          className={`
            flex items-center justify-center gap-2 py-2 px-3 rounded-lg
            transition-all duration-200 font-medium text-sm
            ${gameMode === 'ai'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }
          `}
        >
          <Bot className="w-4 h-4" />
          <span>vs AI</span>
        </button>
      </div>

      <div className="space-y-2">
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          <span>New Game</span>
        </button>
        
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`
            w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg
            transition-colors duration-200 font-medium
            ${canUndo
              ? 'bg-orange-600 text-white hover:bg-orange-700'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Undo</span>
        </button>
      </div>

      <div className="border-t border-gray-600 pt-4">
        <div className="flex gap-2">
          <button
            onClick={isTimerActive ? onPauseTimer : onStartTimer}
            className={`
              flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg
              transition-colors duration-200 font-medium
              ${isTimerActive
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-green-600 text-white hover:bg-green-700'
              }
            `}
          >
            {isTimerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isTimerActive ? 'Pause' : 'Start'} Timer</span>
          </button>
        </div>
      </div>
    </div>
  );
};
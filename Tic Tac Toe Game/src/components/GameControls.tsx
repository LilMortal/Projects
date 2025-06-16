import React from 'react';
import { RotateCcw, RefreshCw } from 'lucide-react';

interface GameControlsProps {
  onResetGame: () => void;
  onResetScores: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({ 
  onResetGame, 
  onResetScores 
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <button
        onClick={onResetGame}
        className="flex items-center gap-2 px-6 py-3 bg-sage-500 hover:bg-sage-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 font-medium"
      >
        <RotateCcw className="w-4 h-4" />
        New Game
      </button>
      <button
        onClick={onResetScores}
        className="flex items-center gap-2 px-6 py-3 bg-peach-500 hover:bg-peach-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 font-medium"
      >
        <RefreshCw className="w-4 h-4" />
        Reset Scores
      </button>
    </div>
  );
};
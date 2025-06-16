import React from 'react';
import { Trophy, Users, Cpu } from 'lucide-react';
import { GameState, GameMode } from '../types/game';

interface GameStatusProps {
  gameState: GameState;
  onGameModeChange: (mode: GameMode) => void;
}

export const GameStatus: React.FC<GameStatusProps> = ({ gameState, onGameModeChange }) => {
  const { currentPlayer, gameStatus, winner, gameMode } = gameState;

  const getStatusMessage = () => {
    if (gameStatus === 'won') {
      return (
        <div className="flex items-center gap-2 text-xl font-semibold text-sage-700 animate-slide-down">
          <Trophy className="w-6 h-6 text-amber-500" />
          Player {winner} Wins!
        </div>
      );
    }
    
    if (gameStatus === 'draw') {
      return (
        <div className="text-xl font-semibold text-peach-600 animate-slide-down">
          It's a Draw!
        </div>
      );
    }

    return (
      <div className="text-lg text-sage-600">
        Current Player: 
        <span className={`ml-2 font-bold text-2xl ${
          currentPlayer === 'X' ? 'text-sky-600' : 'text-peach-500'
        } animate-pulse-gentle`}>
          {currentPlayer}
        </span>
      </div>
    );
  };

  return (
    <div className="text-center space-y-4">
      {getStatusMessage()}
      
      <div className="flex items-center justify-center gap-2 text-sm text-sage-500">
        <span>Game Mode:</span>
        <div className="flex bg-white rounded-lg p-1 shadow-sm">
          <button
            onClick={() => onGameModeChange('pvp')}
            className={`flex items-center gap-1 px-3 py-1 rounded-md transition-all duration-200 ${
              gameMode === 'pvp' 
                ? 'bg-sage-100 text-sage-700 shadow-sm' 
                : 'text-sage-500 hover:bg-sage-50'
            }`}
          >
            <Users className="w-4 h-4" />
            Player vs Player
          </button>
          <button
            onClick={() => onGameModeChange('pve')}
            className={`flex items-center gap-1 px-3 py-1 rounded-md transition-all duration-200 ${
              gameMode === 'pve' 
                ? 'bg-sage-100 text-sage-700 shadow-sm' 
                : 'text-sage-500 hover:bg-sage-50'
            }`}
          >
            <Cpu className="w-4 h-4" />
            Player vs AI
          </button>
        </div>
      </div>
    </div>
  );
};
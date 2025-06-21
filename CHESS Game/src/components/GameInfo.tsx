import React from 'react';
import { GameState, GameMode } from '../types/chess';
import { Crown, Clock, AlertCircle, Trophy } from 'lucide-react';

interface GameInfoProps {
  gameState: GameState;
  gameMode: GameMode;
  whiteTime: number;
  blackTime: number;
  isTimerActive: boolean;
}

export const GameInfo: React.FC<GameInfoProps> = ({
  gameState,
  gameMode,
  whiteTime,
  blackTime,
  isTimerActive
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getGameStatus = (): { message: string; icon: React.ReactNode; color: string } => {
    if (gameState.isCheckmate) {
      return {
        message: `${gameState.turn === 'w' ? 'Black' : 'White'} wins by checkmate!`,
        icon: <Trophy className="w-5 h-5" />,
        color: 'text-yellow-400'
      };
    }
    if (gameState.isStalemate) {
      return {
        message: 'Game drawn by stalemate',
        icon: <AlertCircle className="w-5 h-5" />,
        color: 'text-gray-400'
      };
    }
    if (gameState.isDraw) {
      return {
        message: 'Game drawn',
        icon: <AlertCircle className="w-5 h-5" />,
        color: 'text-gray-400'
      };
    }
    if (gameState.isCheck) {
      return {
        message: `${gameState.turn === 'w' ? 'White' : 'Black'} is in check!`,
        icon: <AlertCircle className="w-5 h-5" />,
        color: 'text-red-400'
      };
    }
    return {
      message: `${gameState.turn === 'w' ? 'White' : 'Black'} to move`,
      icon: <Crown className="w-5 h-5" />,
      color: gameState.turn === 'w' ? 'text-amber-100' : 'text-gray-600'
    };
  };

  const status = getGameStatus();

  return (
    <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-lg p-6 space-y-4 border border-gray-700">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-amber-100 mb-2">Chess Game</h2>
        <div className={`flex items-center justify-center gap-2 ${status.color} font-semibold`}>
          {status.icon}
          <span>{status.message}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={`
          text-center p-3 rounded-lg border-2 transition-all duration-300
          ${gameState.turn === 'w' && !gameState.isCheckmate && !gameState.isStalemate && !gameState.isDraw
            ? 'border-amber-400 bg-amber-400 bg-opacity-20 shadow-lg' 
            : 'border-gray-600 bg-gray-700 bg-opacity-50'
          }
        `}>
          <div className="flex items-center justify-center gap-2 text-amber-100 font-semibold mb-1">
            <Crown className="w-4 h-4" />
            <span>White</span>
          </div>
          {isTimerActive && (
            <div className="flex items-center justify-center gap-1 text-sm text-gray-300">
              <Clock className="w-3 h-3" />
              <span>{formatTime(whiteTime)}</span>
            </div>
          )}
        </div>

        <div className={`
          text-center p-3 rounded-lg border-2 transition-all duration-300
          ${gameState.turn === 'b' && !gameState.isCheckmate && !gameState.isStalemate && !gameState.isDraw
            ? 'border-gray-400 bg-gray-400 bg-opacity-20 shadow-lg' 
            : 'border-gray-600 bg-gray-700 bg-opacity-50'
          }
        `}>
          <div className="flex items-center justify-center gap-2 text-gray-300 font-semibold mb-1">
            <Crown className="w-4 h-4" />
            <span>Black</span>
          </div>
          {isTimerActive && (
            <div className="flex items-center justify-center gap-1 text-sm text-gray-300">
              <Clock className="w-3 h-3" />
              <span>{formatTime(blackTime)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="text-center text-sm text-gray-400">
        <p>Move #{Math.floor(gameState.moves.length / 2) + 1}</p>
        <p className="capitalize">{gameMode === 'pvp' ? 'Player vs Player' : 'Player vs AI'}</p>
      </div>
    </div>
  );
};
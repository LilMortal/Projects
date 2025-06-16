import React from 'react';
import { GameState } from '../types/game';

interface GameBoardProps {
  gameState: GameState;
  onCellClick: (index: number) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ gameState, onCellClick }) => {
  const { board, gameStatus, winningCells } = gameState;

  const getCellClasses = (index: number) => {
    const isWinningCell = winningCells.includes(index);
    const hasValue = board[index];
    
    let classes = `
      w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 
      bg-white rounded-xl shadow-md 
      flex items-center justify-center 
      text-2xl sm:text-3xl md:text-4xl font-bold 
      cursor-pointer transition-all duration-200 
      hover:shadow-lg hover:scale-105 active:scale-95
      border-2 border-transparent
    `;

    if (hasValue) {
      classes += ' cursor-not-allowed';
      if (board[index] === 'X') {
        classes += ' text-sky-600';
      } else {
        classes += ' text-peach-500';
      }
    } else if (gameStatus === 'playing') {
      classes += ' hover:bg-sage-50 hover:border-sage-200';
    }

    if (isWinningCell) {
      classes += ' bg-gradient-to-br from-sage-100 to-sage-200 border-sage-400 animate-pulse-gentle';
    }

    return classes;
  };

  const handleCellClick = (index: number) => {
    if (gameStatus === 'playing' && !board[index]) {
      onCellClick(index);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 p-6 bg-gradient-to-br from-sage-50 to-sage-100 rounded-2xl shadow-lg">
      {board.map((cell, index) => (
        <div
          key={index}
          className={getCellClasses(index)}
          onClick={() => handleCellClick(index)}
        >
          <span className={`animate-scale-in ${cell ? 'animate-bounce-subtle' : ''}`}>
            {cell}
          </span>
        </div>
      ))}
    </div>
  );
};
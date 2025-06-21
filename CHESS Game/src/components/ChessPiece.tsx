import React from 'react';
import { ChessPiece as ChessPieceType } from '../types/chess';
import { pieceSymbols } from '../utils/chessLogic';

interface ChessPieceProps {
  piece: ChessPieceType;
  isSelected: boolean;
  onClick: () => void;
}

export const ChessPiece: React.FC<ChessPieceProps> = ({
  piece,
  isSelected,
  onClick
}) => {
  const pieceKey = piece.color + piece.type;
  const symbol = pieceSymbols[pieceKey];

  return (
    <div
      className={`
        w-full h-full flex items-center justify-center cursor-pointer
        text-4xl sm:text-5xl lg:text-6xl font-bold
        transition-all duration-200 ease-in-out
        hover:scale-110 hover:drop-shadow-lg
        ${isSelected ? 'scale-110 drop-shadow-xl' : ''}
        ${piece.color === 'w' ? 'text-amber-100' : 'text-gray-800'}
      `}
      onClick={onClick}
      style={{
        textShadow: piece.color === 'w' 
          ? '2px 2px 4px rgba(0,0,0,0.8)' 
          : '1px 1px 2px rgba(255,255,255,0.3)',
        filter: isSelected ? 'brightness(1.2)' : 'none'
      }}
    >
      {symbol}
    </div>
  );
};
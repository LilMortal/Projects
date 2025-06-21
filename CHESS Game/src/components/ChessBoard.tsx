import React from 'react';
import { ChessPiece } from './ChessPiece';
import { GameState } from '../types/chess';
import { getSquareNotation, parseSquareNotation } from '../utils/chessLogic';

interface ChessBoardProps {
  gameState: GameState;
  onSquareClick: (square: string) => void;
  onMove: (from: string, to: string) => void;
}

export const ChessBoard: React.FC<ChessBoardProps> = ({
  gameState,
  onSquareClick,
  onMove
}) => {
  const handleSquareClick = (row: number, col: number) => {
    const square = getSquareNotation(row, col);
    const piece = gameState.board[row][col];

    if (gameState.selectedSquare) {
      if (gameState.possibleMoves.includes(square)) {
        onMove(gameState.selectedSquare, square);
      } else if (piece && piece.color === gameState.turn) {
        onSquareClick(square);
      } else {
        onSquareClick('');
      }
    } else if (piece && piece.color === gameState.turn) {
      onSquareClick(square);
    }
  };

  const isSquareHighlighted = (row: number, col: number): boolean => {
    const square = getSquareNotation(row, col);
    return gameState.possibleMoves.includes(square);
  };

  const isSquareSelected = (row: number, col: number): boolean => {
    const square = getSquareNotation(row, col);
    return gameState.selectedSquare === square;
  };

  const isLastMove = (row: number, col: number): boolean => {
    if (!gameState.lastMove) return false;
    const square = getSquareNotation(row, col);
    return square === gameState.lastMove.from || square === gameState.lastMove.to;
  };

  const getSquareClasses = (row: number, col: number): string => {
    const isLight = (row + col) % 2 === 0;
    const isHighlighted = isSquareHighlighted(row, col);
    const isSelected = isSquareSelected(row, col);
    const isLastMoveSquare = isLastMove(row, col);

    let baseClasses = `
      relative flex items-center justify-center
      transition-all duration-200 ease-in-out
      border border-opacity-20
    `;

    if (isSelected) {
      baseClasses += ' bg-blue-400 bg-opacity-80 shadow-inner';
    } else if (isHighlighted) {
      baseClasses += ' bg-green-400 bg-opacity-60 shadow-inner';
    } else if (isLastMoveSquare) {
      baseClasses += isLight 
        ? ' bg-yellow-300 bg-opacity-40' 
        : ' bg-yellow-500 bg-opacity-40';
    } else {
      baseClasses += isLight 
        ? ' bg-amber-100 bg-opacity-90' 
        : ' bg-amber-900 bg-opacity-80';
    }

    return baseClasses;
  };

  return (
    <div className="grid grid-cols-8 gap-0 bg-amber-800 p-2 rounded-lg shadow-2xl border-4 border-amber-700">
      {gameState.board.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`
              aspect-square cursor-pointer
              ${getSquareClasses(rowIndex, colIndex)}
            `}
            onClick={() => handleSquareClick(rowIndex, colIndex)}
          >
            {piece && (
              <ChessPiece
                piece={piece}
                isSelected={isSquareSelected(rowIndex, colIndex)}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
              />
            )}
            
            {/* Coordinate labels */}
            {colIndex === 0 && (
              <div className="absolute left-1 top-1 text-xs font-bold text-amber-200 opacity-70">
                {8 - rowIndex}
              </div>
            )}
            {rowIndex === 7 && (
              <div className="absolute right-1 bottom-1 text-xs font-bold text-amber-200 opacity-70">
                {String.fromCharCode(97 + colIndex)}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};
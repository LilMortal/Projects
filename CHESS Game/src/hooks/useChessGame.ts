import { useState, useCallback } from 'react';
import { ChessGame } from '../utils/chessLogic';
import { GameState, GameMode } from '../types/chess';

export const useChessGame = () => {
  const [game] = useState(() => new ChessGame());
  const [gameState, setGameState] = useState<GameState>(game.getGameState());
  const [gameMode, setGameMode] = useState<GameMode>('pvp');
  const [whiteTime, setWhiteTime] = useState(600); // 10 minutes
  const [blackTime, setBlackTime] = useState(600);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const updateGameState = useCallback(() => {
    setGameState(game.getGameState());
  }, [game]);

  const selectSquare = useCallback((square: string) => {
    setGameState(prev => {
      if (prev.selectedSquare === square) {
        return {
          ...prev,
          selectedSquare: null,
          possibleMoves: []
        };
      }

      const possibleMoves = game.getPossibleMoves(square);
      return {
        ...prev,
        selectedSquare: square,
        possibleMoves
      };
    });
  }, [game]);

  const makeMove = useCallback((from: string, to: string) => {
    const success = game.makeMove(from, to);
    if (success) {
      updateGameState();
      setGameState(prev => ({
        ...prev,
        selectedSquare: null,
        possibleMoves: []
      }));

      // AI move for single player mode
      if (gameMode === 'ai' && game.getGameState().turn === 'b') {
        setTimeout(() => {
          if (game.makeRandomMove()) {
            updateGameState();
          }
        }, 500);
      }
    }
    return success;
  }, [game, gameMode, updateGameState]);

  const undoMove = useCallback(() => {
    if (gameMode === 'ai') {
      // Undo AI move first, then player move
      game.undoMove();
      game.undoMove();
    } else {
      game.undoMove();
    }
    updateGameState();
    setGameState(prev => ({
      ...prev,
      selectedSquare: null,
      possibleMoves: []
    }));
  }, [game, gameMode, updateGameState]);

  const resetGame = useCallback(() => {
    game.reset();
    updateGameState();
    setGameState(prev => ({
      ...prev,
      selectedSquare: null,
      possibleMoves: []
    }));
    setWhiteTime(600);
    setBlackTime(600);
    setIsTimerActive(false);
  }, [game, updateGameState]);

  const switchMode = useCallback((mode: GameMode) => {
    setGameMode(mode);
    resetGame();
  }, [resetGame]);

  const startTimer = useCallback(() => {
    setIsTimerActive(true);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsTimerActive(false);
  }, []);

  return {
    gameState,
    gameMode,
    whiteTime,
    blackTime,
    isTimerActive,
    selectSquare,
    makeMove,
    undoMove,
    resetGame,
    switchMode,
    startTimer,
    pauseTimer
  };
};
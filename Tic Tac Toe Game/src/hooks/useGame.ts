import { useState, useCallback } from 'react';
import { GameState, Player, GameMode, Scores } from '../types/game';
import { createEmptyBoard, checkWinner, checkDraw, makeAIMove } from '../utils/gameLogic';

const initialGameState: GameState = {
  board: createEmptyBoard(),
  currentPlayer: 'X',
  gameStatus: 'playing',
  winner: null,
  winningCells: [],
  gameMode: 'pvp',
};

const initialScores: Scores = {
  X: 0,
  O: 0,
  draws: 0,
};

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [scores, setScores] = useState<Scores>(initialScores);

  const makeMove = useCallback((cellIndex: number) => {
    if (gameState.board[cellIndex] || gameState.gameStatus !== 'playing') {
      return;
    }

    const newBoard = [...gameState.board];
    newBoard[cellIndex] = gameState.currentPlayer;

    const { winner, winningCells } = checkWinner(newBoard);
    const isDraw = !winner && checkDraw(newBoard);

    let newGameStatus: GameState['gameStatus'] = 'playing';
    let newScores = { ...scores };

    if (winner) {
      newGameStatus = 'won';
      newScores[winner]++;
    } else if (isDraw) {
      newGameStatus = 'draw';
      newScores.draws++;
    }

    const nextPlayer: Player = gameState.currentPlayer === 'X' ? 'O' : 'X';

    setGameState({
      ...gameState,
      board: newBoard,
      currentPlayer: nextPlayer,
      gameStatus: newGameStatus,
      winner,
      winningCells,
    });

    if (winner || isDraw) {
      setScores(newScores);
    }

    // AI move logic
    if (gameState.gameMode === 'pve' && !winner && !isDraw && nextPlayer === 'O') {
      setTimeout(() => {
        const aiMoveIndex = makeAIMove(newBoard);
        if (aiMoveIndex !== -1) {
          makeAIMove_(newBoard, aiMoveIndex, newScores);
        }
      }, 500);
    }
  }, [gameState, scores]);

  const makeAIMove_ = useCallback((currentBoard: typeof gameState.board, aiMoveIndex: number, currentScores: Scores) => {
    const newBoard = [...currentBoard];
    newBoard[aiMoveIndex] = 'O';

    const { winner, winningCells } = checkWinner(newBoard);
    const isDraw = !winner && checkDraw(newBoard);

    let newGameStatus: GameState['gameStatus'] = 'playing';
    let newScores = { ...currentScores };

    if (winner) {
      newGameStatus = 'won';
      newScores[winner]++;
    } else if (isDraw) {
      newGameStatus = 'draw';
      newScores.draws++;
    }

    setGameState(prevState => ({
      ...prevState,
      board: newBoard,
      currentPlayer: 'X',
      gameStatus: newGameStatus,
      winner,
      winningCells,
    }));

    if (winner || isDraw) {
      setScores(newScores);
    }
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      ...initialGameState,
      gameMode: gameState.gameMode,
    });
  }, [gameState.gameMode]);

  const resetScores = useCallback(() => {
    setScores(initialScores);
  }, []);

  const switchGameMode = useCallback((mode: GameMode) => {
    setGameState({
      ...initialGameState,
      gameMode: mode,
    });
  }, []);

  return {
    gameState,
    scores,
    makeMove,
    resetGame,
    resetScores,
    switchGameMode,
  };
};
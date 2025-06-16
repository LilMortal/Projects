import { Board, Player, Cell } from '../types/game';

export const createEmptyBoard = (): Board => Array(9).fill(null);

export const checkWinner = (board: Board): { winner: Player | null; winningCells: number[] } => {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, winningCells: combination };
    }
  }

  return { winner: null, winningCells: [] };
};

export const checkDraw = (board: Board): boolean => {
  return board.every(cell => cell !== null);
};

export const getAvailableMoves = (board: Board): number[] => {
  return board.reduce((moves: number[], cell: Cell, index: number) => {
    if (cell === null) moves.push(index);
    return moves;
  }, []);
};

export const makeAIMove = (board: Board): number => {
  const availableMoves = getAvailableMoves(board);
  
  if (availableMoves.length === 0) return -1;
  
  // Simple AI: Random move selection
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
};
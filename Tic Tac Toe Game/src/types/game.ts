export type Player = 'X' | 'O';
export type Cell = Player | null;
export type Board = Cell[];
export type GameMode = 'pvp' | 'pve';
export type GameStatus = 'playing' | 'won' | 'draw';

export interface GameState {
  board: Board;
  currentPlayer: Player;
  gameStatus: GameStatus;
  winner: Player | null;
  winningCells: number[];
  gameMode: GameMode;
}

export interface Scores {
  X: number;
  O: number;
  draws: number;
}
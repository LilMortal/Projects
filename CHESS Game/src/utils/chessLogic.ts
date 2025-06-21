import { Chess } from 'chess.js';
import { ChessPiece, GameState, Move } from '../types/chess';

export class ChessGame {
  private chess: Chess;

  constructor() {
    this.chess = new Chess();
  }

  getGameState(): GameState {
    const board = this.chess.board().map(row =>
      row.map(square => square ? {
        type: square.type,
        color: square.color
      } as ChessPiece : null)
    );

    return {
      board,
      turn: this.chess.turn(),
      isCheck: this.chess.inCheck(),
      isCheckmate: this.chess.isCheckmate(),
      isStalemate: this.chess.isStalemate(),
      isDraw: this.chess.isDraw(),
      moves: this.chess.history({ verbose: true }).map(move => ({
        from: move.from,
        to: move.to,
        piece: move.piece,
        captured: move.captured,
        promotion: move.promotion,
        san: move.san,
        fen: move.after
      })),
      selectedSquare: null,
      possibleMoves: [],
      lastMove: this.getLastMove()
    };
  }

  private getLastMove(): { from: string; to: string } | null {
    const history = this.chess.history({ verbose: true });
    if (history.length === 0) return null;
    const lastMove = history[history.length - 1];
    return { from: lastMove.from, to: lastMove.to };
  }

  getPossibleMoves(square: string): string[] {
    return this.chess.moves({ square, verbose: true }).map(move => move.to);
  }

  makeMove(from: string, to: string): boolean {
    try {
      const move = this.chess.move({ from, to, promotion: 'q' });
      return move !== null;
    } catch {
      return false;
    }
  }

  undoMove(): boolean {
    const undone = this.chess.undo();
    return undone !== null;
  }

  reset(): void {
    this.chess.reset();
  }

  getFen(): string {
    return this.chess.fen();
  }

  loadFen(fen: string): boolean {
    try {
      this.chess.load(fen);
      return true;
    } catch {
      return false;
    }
  }

  makeRandomMove(): boolean {
    const moves = this.chess.moves();
    if (moves.length === 0) return false;
    
    const randomIndex = Math.floor(Math.random() * moves.length);
    const move = this.chess.move(moves[randomIndex]);
    return move !== null;
  }
}

export const pieceSymbols: Record<string, string> = {
  'wp': '♙', 'bp': '♟',
  'wr': '♖', 'br': '♜',
  'wn': '♘', 'bn': '♞',
  'wb': '♗', 'bb': '♝',
  'wq': '♕', 'bq': '♛',
  'wk': '♔', 'bk': '♚'
};

export const getSquareNotation = (row: number, col: number): string => {
  return String.fromCharCode(97 + col) + (8 - row).toString();
};

export const parseSquareNotation = (notation: string): [number, number] => {
  const col = notation.charCodeAt(0) - 97;
  const row = 8 - parseInt(notation[1]);
  return [row, col];
};
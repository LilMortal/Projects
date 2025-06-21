import React from 'react';
import { ChessBoard } from './components/ChessBoard';
import { GameInfo } from './components/GameInfo';
import { MoveHistory } from './components/MoveHistory';
import { GameControls } from './components/GameControls';
import { useChessGame } from './hooks/useChessGame';

function App() {
  const {
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
  } = useChessGame();

  const handleSquareClick = (square: string) => {
    if (square === '') {
      selectSquare('');
    } else {
      selectSquare(square);
    }
  };

  const handleMove = (from: string, to: string) => {
    makeMove(from, to);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent mb-2">
            Royal Chess
          </h1>
          <p className="text-gray-300 text-lg">
            Master the art of strategic warfare
          </p>
        </div>

        {/* Main Game Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 max-w-7xl mx-auto">
          {/* Left Sidebar - Game Info & Controls */}
          <div className="xl:col-span-3 space-y-4">
            <GameInfo
              gameState={gameState}
              gameMode={gameMode}
              whiteTime={whiteTime}
              blackTime={blackTime}
              isTimerActive={isTimerActive}
            />
            <GameControls
              gameMode={gameMode}
              canUndo={gameState.moves.length > 0}
              isTimerActive={isTimerActive}
              onUndo={undoMove}
              onReset={resetGame}
              onSwitchMode={switchMode}
              onStartTimer={startTimer}
              onPauseTimer={pauseTimer}
            />
          </div>

          {/* Center - Chess Board */}
          <div className="xl:col-span-6 flex justify-center">
            <div className="w-full max-w-lg">
              <ChessBoard
                gameState={gameState}
                onSquareClick={handleSquareClick}
                onMove={handleMove}
              />
            </div>
          </div>

          {/* Right Sidebar - Move History */}
          <div className="xl:col-span-3">
            <MoveHistory moves={gameState.moves} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p className="text-sm">
            Built with React, TypeScript, and Chess.js
          </p>
          <p className="text-xs mt-1">
            Click pieces to select, then click destination to move
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
import React from 'react';
import { useGame } from './hooks/useGame';
import { GameBoard } from './components/GameBoard';
import { GameStatus } from './components/GameStatus';
import { Scoreboard } from './components/Scoreboard';
import { GameControls } from './components/GameControls';

function App() {
  const { 
    gameState, 
    scores, 
    makeMove, 
    resetGame, 
    resetScores, 
    switchGameMode 
  } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-sky-50 to-peach-50 py-8 px-4">
      <div className="max-w-md mx-auto space-y-8">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-bold text-sage-700 mb-2">
            Tic Tac Toe
          </h1>
          <p className="text-sage-500">
            Modern • Beautiful • Fun
          </p>
        </div>

        {/* Game Status */}
        <div className="animate-fade-in">
          <GameStatus 
            gameState={gameState} 
            onGameModeChange={switchGameMode}
          />
        </div>

        {/* Game Board */}
        <div className="flex justify-center animate-scale-in">
          <GameBoard 
            gameState={gameState} 
            onCellClick={makeMove}
          />
        </div>

        {/* Scoreboard */}
        <div className="animate-fade-in">
          <Scoreboard scores={scores} />
        </div>

        {/* Game Controls */}
        <div className="animate-fade-in">
          <GameControls 
            onResetGame={resetGame}
            onResetScores={resetScores}
          />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-sage-400 animate-fade-in">
          <p>Built with React & TypeScript</p>
        </div>
      </div>
    </div>
  );
}

export default App;
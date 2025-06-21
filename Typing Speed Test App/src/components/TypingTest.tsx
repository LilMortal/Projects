import React, { useEffect } from 'react';
import { TimerDuration } from '../types';
import { useTypingTest } from '../hooks/useTypingTest';
import { TextDisplay } from './TextDisplay';
import { StatsDisplay } from './StatsDisplay';
import { Countdown } from './Countdown';
import { RotateCcw, Play } from 'lucide-react';

interface TypingTestProps {
  duration: TimerDuration;
}

export const TypingTest: React.FC<TypingTestProps> = ({ duration }) => {
  const { text, gameState, stats, startTest, resetTest, handleKeyPress } = useTypingTest(duration);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent default behavior for typing keys
      if (event.key.length === 1 || event.key === 'Backspace') {
        event.preventDefault();
        handleKeyPress(event.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  const timeRemaining = gameState.duration - gameState.currentTime;

  return (
    <div className="space-y-6">
      {/* Test Controls */}
      <div className="flex justify-center gap-4">
        {!gameState.isActive && !gameState.isFinished && (
          <button
            onClick={startTest}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-xl font-medium hover:from-orange-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-orange-200 hover:scale-105"
          >
            <Play className="w-5 h-5" />
            Start Test
          </button>
        )}
        
        <button
          onClick={resetTest}
          className="flex items-center gap-2 px-6 py-3 bg-white/70 hover:bg-white/90 text-gray-700 rounded-xl font-medium transition-all duration-200 border border-orange-200/50 shadow-sm hover:scale-105"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </button>
      </div>

      {/* Stats Display */}
      <StatsDisplay
        stats={stats}
        timeRemaining={timeRemaining}
        duration={gameState.duration}
      />

      {/* Text Display */}
      <TextDisplay
        text={text}
        userInput={gameState.userInput}
        currentIndex={gameState.currentIndex}
        errors={gameState.errors}
        isActive={gameState.isActive}
      />

      {/* Instructions */}
      {!gameState.isActive && !gameState.isFinished && (
        <div className="text-center text-gray-600 text-sm">
          Click "Start Test" or just start typing to begin!
        </div>
      )}

      {/* Final Results */}
      {gameState.isFinished && (
        <div className="bg-gradient-to-r from-orange-50/80 to-pink-50/80 backdrop-blur-sm rounded-2xl p-8 border border-orange-200/50 shadow-xl shadow-orange-100/50">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Test Complete!</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">{stats.wpm}</div>
                <div className="text-sm text-gray-600">Words per minute</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-500 mb-2">{stats.cpm}</div>
                <div className="text-sm text-gray-600">Characters per minute</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-500 mb-2">{stats.accuracy}%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">{stats.errors}</div>
                <div className="text-sm text-gray-600">Errors</div>
              </div>
            </div>
            
            <div className="text-gray-600 text-sm">
              Great job! Your result has been saved to your history.
            </div>
          </div>
        </div>
      )}

      {/* Countdown Overlay */}
      {gameState.showCountdown && <Countdown value={gameState.countdownValue} />}
    </div>
  );
};
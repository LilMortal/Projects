import React from 'react';
import { Scores } from '../types/game';

interface ScoreboardProps {
  scores: Scores;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ scores }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-sage-700 mb-4 text-center">Scoreboard</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-sky-600">{scores.X}</div>
          <div className="text-sm text-sage-500">Player X</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-sage-400">{scores.draws}</div>
          <div className="text-sm text-sage-500">Draws</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-peach-500">{scores.O}</div>
          <div className="text-sm text-sage-500">Player O</div>
        </div>
      </div>
    </div>
  );
};
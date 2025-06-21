import React from 'react';
import { Move } from '../types/chess';
import { History, ChevronRight } from 'lucide-react';

interface MoveHistoryProps {
  moves: Move[];
}

export const MoveHistory: React.FC<MoveHistoryProps> = ({ moves }) => {
  const groupedMoves = [];
  for (let i = 0; i < moves.length; i += 2) {
    groupedMoves.push({
      moveNumber: Math.floor(i / 2) + 1,
      white: moves[i],
      black: moves[i + 1] || null
    });
  }

  return (
    <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
      <div className="flex items-center gap-2 text-amber-100 font-semibold mb-4">
        <History className="w-5 h-5" />
        <h3>Move History</h3>
      </div>
      
      <div className="space-y-1 max-h-64 overflow-y-auto custom-scrollbar">
        {groupedMoves.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">No moves yet</p>
        ) : (
          groupedMoves.map(({ moveNumber, white, black }) => (
            <div
              key={moveNumber}
              className="grid grid-cols-8 gap-2 py-1 px-2 rounded hover:bg-gray-700 hover:bg-opacity-50 transition-colors duration-200"
            >
              <div className="col-span-1 text-gray-400 text-sm font-mono">
                {moveNumber}.
              </div>
              <div className="col-span-3 text-amber-100 text-sm font-mono">
                {white.san}
              </div>
              <div className="col-span-1 flex justify-center">
                {black && <ChevronRight className="w-3 h-3 text-gray-500" />}
              </div>
              <div className="col-span-3 text-gray-300 text-sm font-mono">
                {black?.san || ''}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
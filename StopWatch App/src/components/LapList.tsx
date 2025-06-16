import React from 'react';
import { Trophy, Clock } from 'lucide-react';
import { formatTime } from '../utils/timeFormatter';

interface Lap {
  id: number;
  lapTime: number;
  totalTime: number;
}

interface LapListProps {
  laps: Lap[];
}

const LapList: React.FC<LapListProps> = ({ laps }) => {
  // Find fastest and slowest laps
  const fastestLap = laps.reduce((fastest, current) => 
    current.lapTime < fastest.lapTime ? current : fastest, laps[0]);
  const slowestLap = laps.reduce((slowest, current) => 
    current.lapTime > slowest.lapTime ? current : slowest, laps[0]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-8 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
          <Clock className="w-6 h-6 mr-2" />
          Lap Times
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {laps.length} lap{laps.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="max-h-96 overflow-y-auto custom-scrollbar">
        <div className="space-y-3">
          {laps.map((lap, index) => {
            const lapNumber = laps.length - index;
            const isFastest = lap.id === fastestLap.id && laps.length > 1;
            const isSlowest = lap.id === slowestLap.id && laps.length > 1;
            
            return (
              <div
                key={lap.id}
                className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:shadow-md ${
                  isFastest
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : isSlowest
                    ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                    : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${
                    isFastest
                      ? 'bg-green-500 text-white'
                      : isSlowest
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200'
                  }`}>
                    {isFastest && laps.length > 1 ? (
                      <Trophy className="w-4 h-4" />
                    ) : (
                      lapNumber
                    )}
                  </div>
                  
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white">
                      Lap {lapNumber}
                    </div>
                    {(isFastest || isSlowest) && laps.length > 1 && (
                      <div className={`text-xs ${
                        isFastest ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {isFastest ? 'Fastest' : 'Slowest'}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-lg text-gray-800 dark:text-white">
                    {formatTime(lap.lapTime)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Total: {formatTime(lap.totalTime)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Statistics */}
      {laps.length > 1 && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">Average</div>
              <div className="font-mono font-bold text-blue-800 dark:text-blue-300">
                {formatTime(laps.reduce((sum, lap) => sum + lap.lapTime, 0) / laps.length)}
              </div>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="text-sm text-green-600 dark:text-green-400 mb-1">Fastest</div>
              <div className="font-mono font-bold text-green-800 dark:text-green-300">
                {formatTime(fastestLap.lapTime)}
              </div>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
              <div className="text-sm text-red-600 dark:text-red-400 mb-1">Slowest</div>
              <div className="font-mono font-bold text-red-800 dark:text-red-300">
                {formatTime(slowestLap.lapTime)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LapList;
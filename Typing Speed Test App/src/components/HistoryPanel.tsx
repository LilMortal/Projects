import React, { useState, useEffect } from 'react';
import { TestResult } from '../types';
import { History, Calendar, Zap, Target, AlertCircle } from 'lucide-react';

export const HistoryPanel: React.FC = () => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedResults = JSON.parse(localStorage.getItem('typingTestResults') || '[]');
    setResults(savedResults);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getAverageWPM = () => {
    if (results.length === 0) return 0;
    return Math.round(results.reduce((sum, result) => sum + result.wpm, 0) / results.length);
  };

  const getBestWPM = () => {
    if (results.length === 0) return 0;
    return Math.max(...results.map(result => result.wpm));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/70 hover:bg-white/90 rounded-lg transition-colors border border-orange-200/50 shadow-sm text-gray-700"
      >
        <History className="w-4 h-4" />
        History ({results.length})
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 rounded-2xl p-6 border border-orange-200/50 shadow-2xl shadow-orange-200/50 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Test History</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-800 text-xl"
              >
                ×
              </button>
            </div>

            {results.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No test results yet. Start typing to see your progress!
              </div>
            ) : (
              <>
                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl p-4 border border-orange-200/50">
                    <div className="text-sm text-gray-600 mb-1">Tests Completed</div>
                    <div className="text-2xl font-bold text-gray-800">{results.length}</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 border border-pink-200/50">
                    <div className="text-sm text-gray-600 mb-1">Average WPM</div>
                    <div className="text-2xl font-bold text-gray-800">{getAverageWPM()}</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200/50">
                    <div className="text-sm text-gray-600 mb-1">Best WPM</div>
                    <div className="text-2xl font-bold text-gray-800">{getBestWPM()}</div>
                  </div>
                </div>

                {/* Results List */}
                <div className="space-y-3">
                  {results.map((result) => (
                    <div
                      key={result.id}
                      className="bg-white/50 rounded-xl p-4 border border-orange-200/30 hover:bg-white/70 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">
                            {formatDate(result.date)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {result.duration}s
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-1">
                            <Zap className="w-4 h-4 text-orange-500" />
                            <span className="text-sm text-gray-800 font-medium">
                              {result.wpm} WPM
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Target className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-gray-800">
                              {result.accuracy}%
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            <span className="text-sm text-gray-800">
                              {result.errors}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-2 text-xs text-gray-500 truncate">
                        {result.text}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
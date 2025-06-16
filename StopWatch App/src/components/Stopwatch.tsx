import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw, Flag, Trash2 } from 'lucide-react';
import LapList from './LapList';
import { formatTime } from '../utils/timeFormatter';

interface Lap {
  id: number;
  lapTime: number;
  totalTime: number;
}

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [lastLapTime, setLastLapTime] = useState(0);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const elapsedTimeRef = useRef<number>(0);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('stopwatch-data');
    if (savedData) {
      try {
        const { time: savedTime, laps: savedLaps, lastLapTime: savedLastLapTime } = JSON.parse(savedData);
        setTime(savedTime || 0);
        setLaps(savedLaps || []);
        setLastLapTime(savedLastLapTime || 0);
        elapsedTimeRef.current = savedTime || 0;
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data whenever state changes
  useEffect(() => {
    const dataToSave = {
      time,
      laps,
      lastLapTime
    };
    localStorage.setItem('stopwatch-data', JSON.stringify(dataToSave));
  }, [time, laps, lastLapTime]);

  const updateTime = useCallback(() => {
    const now = performance.now();
    const elapsed = elapsedTimeRef.current + (now - startTimeRef.current);
    setTime(elapsed);
  }, []);

  const start = useCallback(() => {
    setIsRunning(true);
    startTimeRef.current = performance.now();
    intervalRef.current = setInterval(updateTime, 10);
  }, [updateTime]);

  const pause = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    elapsedTimeRef.current = time;
  }, [time]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    setLastLapTime(0);
    elapsedTimeRef.current = 0;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const addLap = useCallback(() => {
    if (time > 0) {
      const lapTime = time - lastLapTime;
      const newLap: Lap = {
        id: Date.now(),
        lapTime,
        totalTime: time
      };
      setLaps(prev => [newLap, ...prev]);
      setLastLapTime(time);
    }
  }, [time, lastLapTime]);

  const clearLaps = useCallback(() => {
    setLaps([]);
    setLastLapTime(0);
  }, []);

  // Keyboard event handling
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Prevent handling if user is typing in an input field
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.code) {
        case 'Space':
          event.preventDefault();
          if (isRunning) {
            pause();
          } else {
            start();
          }
          break;
        case 'KeyR':
          event.preventDefault();
          reset();
          break;
        case 'KeyL':
          if (isRunning || time > 0) {
            event.preventDefault();
            addLap();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRunning, time, start, pause, reset, addLap]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Timer Display */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 mb-8 transition-all duration-300">
        <div className="text-center mb-8">
          <div className="text-6xl md:text-8xl font-mono font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {formatTime(time)}
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              isRunning ? 'bg-green-500 animate-pulse' : time > 0 ? 'bg-yellow-500' : 'bg-gray-300'
            }`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {isRunning ? 'Running' : time > 0 ? 'Paused' : 'Ready'}
            </span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={isRunning ? pause : start}
            className={`flex items-center space-x-2 px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
              isRunning
                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
            }`}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{isRunning ? 'Pause' : 'Start'}</span>
          </button>

          <button
            onClick={reset}
            className="flex items-center space-x-2 px-8 py-4 rounded-2xl font-semibold text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset</span>
          </button>

          <button
            onClick={addLap}
            disabled={time === 0}
            className="flex items-center space-x-2 px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            <Flag className="w-5 h-5" />
            <span>Lap</span>
          </button>

          {laps.length > 0 && (
            <button
              onClick={clearLaps}
              className="flex items-center space-x-2 px-8 py-4 rounded-2xl font-semibold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <Trash2 className="w-5 h-5" />
              <span>Clear Laps</span>
            </button>
          )}
        </div>

        {/* Keyboard Shortcuts */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Keyboard shortcuts: <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Space</kbd> Start/Pause · <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">R</kbd> Reset · <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">L</kbd> Lap</p>
        </div>
      </div>

      {/* Lap List */}
      {laps.length > 0 && <LapList laps={laps} />}
    </div>
  );
};

export default Stopwatch;
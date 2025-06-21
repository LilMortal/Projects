import { useState, useEffect, useCallback } from 'react';
import { GameState, TypingStats, TimerDuration, TestResult } from '../types';
import { calculateStats } from '../utils/typing';
import { getRandomText } from '../data/texts';

export const useTypingTest = (duration: TimerDuration) => {
  const [text, setText] = useState(getRandomText());
  const [gameState, setGameState] = useState<GameState>({
    isActive: false,
    isFinished: false,
    startTime: null,
    currentTime: 0,
    duration,
    currentIndex: 0,
    userInput: '',
    errors: new Set(),
    showCountdown: false,
    countdownValue: 3,
  });

  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    cpm: 0,
    accuracy: 100,
    errors: 0,
    totalCharacters: 0,
    correctCharacters: 0,
  });

  // Update duration when prop changes
  useEffect(() => {
    setGameState(prev => ({ ...prev, duration }));
  }, [duration]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (gameState.isActive && !gameState.isFinished) {
      interval = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - (gameState.startTime || now)) / 1000);
        
        if (elapsed >= gameState.duration) {
          setGameState(prev => ({ ...prev, isActive: false, isFinished: true }));
          saveResult();
        } else {
          setGameState(prev => ({ ...prev, currentTime: elapsed }));
        }
      }, 100);
    }

    return () => clearInterval(interval);
  }, [gameState.isActive, gameState.isFinished, gameState.startTime, gameState.duration]);

  // Countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (gameState.showCountdown && gameState.countdownValue > 0) {
      interval = setInterval(() => {
        setGameState(prev => {
          if (prev.countdownValue <= 1) {
            return {
              ...prev,
              showCountdown: false,
              countdownValue: 0,
              isActive: true,
              startTime: Date.now(),
            };
          }
          return { ...prev, countdownValue: prev.countdownValue - 1 };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gameState.showCountdown, gameState.countdownValue]);

  // Calculate stats when input changes
  useEffect(() => {
    if (gameState.isActive) {
      const timeElapsed = gameState.currentTime || 0.1;
      const newStats = calculateStats(text, gameState.userInput, gameState.errors, timeElapsed);
      setStats(newStats);
    }
  }, [gameState.userInput, gameState.errors, gameState.currentTime, text, gameState.isActive]);

  const startTest = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showCountdown: true,
      countdownValue: 3,
      isFinished: false,
      currentIndex: 0,
      userInput: '',
      errors: new Set(),
      currentTime: 0,
    }));
  }, []);

  const resetTest = useCallback(() => {
    setText(getRandomText());
    setGameState({
      isActive: false,
      isFinished: false,
      startTime: null,
      currentTime: 0,
      duration,
      currentIndex: 0,
      userInput: '',
      errors: new Set(),
      showCountdown: false,
      countdownValue: 3,
    });
    setStats({
      wpm: 0,
      cpm: 0,
      accuracy: 100,
      errors: 0,
      totalCharacters: 0,
      correctCharacters: 0,
    });
  }, [duration]);

  const handleKeyPress = useCallback((key: string) => {
    if (!gameState.isActive || gameState.isFinished) return;

    if (key === 'Backspace') {
      setGameState(prev => {
        const newInput = prev.userInput.slice(0, -1);
        const newErrors = new Set(prev.errors);
        newErrors.delete(newInput.length);
        
        return {
          ...prev,
          userInput: newInput,
          currentIndex: Math.max(0, prev.currentIndex - 1),
          errors: newErrors,
        };
      });
      return;
    }

    if (key.length === 1) {
      setGameState(prev => {
        const newInput = prev.userInput + key;
        const newErrors = new Set(prev.errors);
        
        if (key !== text[prev.currentIndex]) {
          newErrors.add(prev.currentIndex);
        }
        
        return {
          ...prev,
          userInput: newInput,
          currentIndex: prev.currentIndex + 1,
          errors: newErrors,
        };
      });
    }
  }, [gameState.isActive, gameState.isFinished, text]);

  const saveResult = useCallback(() => {
    const result: TestResult = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      duration: gameState.duration,
      wpm: stats.wpm,
      cpm: stats.cpm,
      accuracy: stats.accuracy,
      errors: stats.errors,
      text: text.substring(0, 50) + '...',
    };

    const existingResults = JSON.parse(localStorage.getItem('typingTestResults') || '[]');
    const newResults = [result, ...existingResults].slice(0, 10); // Keep only last 10 results
    localStorage.setItem('typingTestResults', JSON.stringify(newResults));
  }, [gameState.duration, stats, text]);

  return {
    text,
    gameState,
    stats,
    startTest,
    resetTest,
    handleKeyPress,
  };
};
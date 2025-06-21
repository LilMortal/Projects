import { TypingStats } from '../types';

export const calculateWPM = (correctCharacters: number, timeElapsed: number): number => {
  if (timeElapsed === 0) return 0;
  const minutes = timeElapsed / 60;
  const words = correctCharacters / 5; // Standard: 5 characters = 1 word
  return Math.round(words / minutes);
};

export const calculateCPM = (correctCharacters: number, timeElapsed: number): number => {
  if (timeElapsed === 0) return 0;
  const minutes = timeElapsed / 60;
  return Math.round(correctCharacters / minutes);
};

export const calculateAccuracy = (correctCharacters: number, totalCharacters: number): number => {
  if (totalCharacters === 0) return 100;
  return Math.round((correctCharacters / totalCharacters) * 100);
};

export const calculateStats = (
  text: string,
  userInput: string,
  errors: Set<number>,
  timeElapsed: number
): TypingStats => {
  const totalCharacters = userInput.length;
  const correctCharacters = totalCharacters - errors.size;
  
  return {
    wpm: calculateWPM(correctCharacters, timeElapsed),
    cpm: calculateCPM(correctCharacters, timeElapsed),
    accuracy: calculateAccuracy(correctCharacters, totalCharacters),
    errors: errors.size,
    totalCharacters,
    correctCharacters,
  };
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
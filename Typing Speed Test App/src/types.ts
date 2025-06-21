export interface TypingStats {
  wpm: number;
  cpm: number;
  accuracy: number;
  errors: number;
  totalCharacters: number;
  correctCharacters: number;
}

export interface TestResult {
  id: string;
  date: string;
  duration: number;
  wpm: number;
  cpm: number;
  accuracy: number;
  errors: number;
  text: string;
}

export interface GameState {
  isActive: boolean;
  isFinished: boolean;
  startTime: number | null;
  currentTime: number;
  duration: number;
  currentIndex: number;
  userInput: string;
  errors: Set<number>;
  showCountdown: boolean;
  countdownValue: number;
}

export type TimerDuration = 15 | 30 | 60 | 120;
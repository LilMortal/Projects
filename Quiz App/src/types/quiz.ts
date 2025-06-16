export interface QuizQuestion {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'boolean';
  options: string[];
  correctAnswers: number[];
  explanation?: string;
  timeLimit?: number; // in seconds
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  timeLimit?: number; // total time limit in minutes
  passingScore: number; // percentage
}

export interface QuizAttempt {
  quizId: string;
  answers: { [questionId: string]: number[] };
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  startTime: Date;
  endTime?: Date;
  timeSpent: number; // in seconds
}

export interface QuizSettings {
  showTimer: boolean;
  randomizeQuestions: boolean;
  showFeedback: boolean;
}
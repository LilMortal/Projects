import React, { useState } from 'react';
import { StartScreen } from './components/StartScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { sampleQuizzes } from './data/quizzes';
import { Quiz, QuizAttempt, QuizSettings } from './types/quiz';

type AppState = 'start' | 'quiz' | 'results';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('start');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizSettings, setQuizSettings] = useState<QuizSettings>({
    showTimer: true,
    randomizeQuestions: true,
    showFeedback: true
  });
  const [quizResults, setQuizResults] = useState<QuizAttempt | null>(null);

  const handleStartQuiz = (quiz: Quiz, settings: QuizSettings) => {
    setSelectedQuiz(quiz);
    setQuizSettings(settings);
    setCurrentState('quiz');
  };

  const handleQuizComplete = (results: QuizAttempt) => {
    setQuizResults(results);
    setCurrentState('results');
  };

  const handleRestartQuiz = () => {
    setCurrentState('quiz');
  };

  const handleBackToHome = () => {
    setCurrentState('start');
    setSelectedQuiz(null);
    setQuizResults(null);
  };

  if (currentState === 'start') {
    return (
      <StartScreen
        quizzes={sampleQuizzes}
        onStartQuiz={handleStartQuiz}
      />
    );
  }

  if (currentState === 'quiz' && selectedQuiz) {
    return (
      <QuizScreen
        quiz={selectedQuiz}
        settings={quizSettings}
        onQuizComplete={handleQuizComplete}
        onBackToHome={handleBackToHome}
      />
    );
  }

  if (currentState === 'results' && quizResults && selectedQuiz) {
    return (
      <ResultsScreen
        results={quizResults}
        quiz={selectedQuiz}
        onRestartQuiz={handleRestartQuiz}
        onBackToHome={handleBackToHome}
      />
    );
  }

  return null;
}

export default App;
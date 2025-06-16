import React from 'react';
import { Quiz, QuizSettings } from '../types/quiz';
import { useQuiz } from '../hooks/useQuiz';
import { Question } from './Question';
import { ProgressBar } from './ProgressBar';
import { Timer } from './Timer';
import { ArrowRight, Home } from 'lucide-react';

interface QuizScreenProps {
  quiz: Quiz;
  settings: QuizSettings;
  onQuizComplete: (results: any) => void;
  onBackToHome: () => void;
}

export function QuizScreen({ quiz, settings, onQuizComplete, onBackToHome }: QuizScreenProps) {
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    answers,
    timeRemaining,
    questionTimeRemaining,
    showFeedback,
    isQuizCompleted,
    handleAnswer,
    handleNextQuestion,
    calculateResults,
    progress
  } = useQuiz(quiz, settings);

  React.useEffect(() => {
    if (isQuizCompleted) {
      const results = calculateResults();
      if (results) {
        onQuizComplete(results);
      }
    }
  }, [isQuizCompleted, calculateResults, onQuizComplete]);

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  const canAdvance = answers[currentQuestion.id] && answers[currentQuestion.id].length > 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBackToHome}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </button>

          <div className="flex items-center space-x-4">
            {settings.showTimer && currentQuestion.timeLimit && (
              <Timer
                timeRemaining={questionTimeRemaining}
                label="Question"
                isWarning={questionTimeRemaining <= 10}
              />
            )}
            
            {settings.showTimer && quiz.timeLimit && timeRemaining > 0 && (
              <Timer
                timeRemaining={timeRemaining}
                label="Total"
                isWarning={timeRemaining <= 60}
              />
            )}
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{quiz.title}</h1>
          <ProgressBar
            progress={progress}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
          />
        </div>

        <div className="mb-8">
          <Question
            question={currentQuestion}
            onAnswer={(selectedOptions) => handleAnswer(currentQuestion.id, selectedOptions)}
            showFeedback={showFeedback}
            userAnswers={answers[currentQuestion.id] || []}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNextQuestion}
            disabled={!canAdvance}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              canAdvance
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>{isLastQuestion ? 'Finish Quiz' : 'Next Question'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
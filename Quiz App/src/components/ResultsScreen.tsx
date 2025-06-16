import React from 'react';
import { QuizAttempt, Quiz } from '../types/quiz';
import { Trophy, Clock, CheckCircle, XCircle, RotateCcw, Home } from 'lucide-react';

interface ResultsScreenProps {
  results: QuizAttempt;
  quiz: Quiz;
  onRestartQuiz: () => void;
  onBackToHome: () => void;
}

export function ResultsScreen({ results, quiz, onRestartQuiz, onBackToHome }: ResultsScreenProps) {
  const passed = results.score >= quiz.passingScore;
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreColor = () => {
    if (results.score >= 90) return 'text-green-600';
    if (results.score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = () => {
    if (results.score >= 90) return 'bg-green-100';
    if (results.score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-xl shadow-2xl p-8 animate-slideIn">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
              passed ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {passed ? (
                <Trophy className="w-10 h-10 text-green-600" />
              ) : (
                <XCircle className="w-10 h-10 text-red-600" />
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Quiz Complete!
            </h1>
            
            <p className="text-gray-600 mb-6">
              {quiz.title}
            </p>

            <div className={`inline-block px-6 py-3 rounded-full ${getScoreBgColor()}`}>
              <span className={`text-4xl font-bold ${getScoreColor()}`}>
                {results.score}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{results.correctAnswers}</div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {results.totalQuestions - results.correctAnswers}
              </div>
              <div className="text-sm text-gray-600">Incorrect</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-600 mr-2" />
                <span className="text-sm text-gray-600">Time Spent:</span>
              </div>
              <span className="font-semibold text-gray-900">
                {formatTime(results.timeSpent)}
              </span>
            </div>
          </div>

          <div className={`p-4 rounded-lg mb-8 ${
            passed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <p className={`text-center font-medium ${
              passed ? 'text-green-800' : 'text-red-800'
            }`}>
              {passed 
                ? `Congratulations! You passed with a score of ${results.score}% (required: ${quiz.passingScore}%)`
                : `You scored ${results.score}%, but need ${quiz.passingScore}% to pass. Try again!`
              }
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={onRestartQuiz}
              className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Retake Quiz</span>
            </button>

            <button
              onClick={onBackToHome}
              className="flex-1 flex items-center justify-center space-x-2 bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
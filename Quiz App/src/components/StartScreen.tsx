import React, { useState } from 'react';
import { Quiz, QuizSettings } from '../types/quiz';
import { Play, Clock, BarChart3, Settings, CheckSquare } from 'lucide-react';

interface StartScreenProps {
  quizzes: Quiz[];
  onStartQuiz: (quiz: Quiz, settings: QuizSettings) => void;
}

export function StartScreen({ quizzes, onStartQuiz }: StartScreenProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [settings, setSettings] = useState<QuizSettings>({
    showTimer: true,
    randomizeQuestions: true,
    showFeedback: true
  });
  const [showSettings, setShowSettings] = useState(false);

  const handleStartQuiz = () => {
    if (selectedQuiz) {
      onStartQuiz(selectedQuiz, settings);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <CheckSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            QuizMaster Pro
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test your knowledge with our comprehensive quiz platform. Choose from various topics and challenge yourself!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              onClick={() => setSelectedQuiz(quiz)}
              className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-[1.02] ${
                selectedQuiz?.id === quiz.id 
                  ? 'ring-2 ring-blue-500 border-blue-500' 
                  : 'border border-gray-200'
              }`}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {quiz.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {quiz.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <BarChart3 className="w-4 h-4 mr-1" />
                    {quiz.questions.length} questions
                  </div>
                  {quiz.timeLimit && (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {quiz.timeLimit} min
                    </div>
                  )}
                </div>
                <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                  Pass: {quiz.passingScore}%
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedQuiz && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-slideIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Quiz Settings</h3>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                <Settings className="w-4 h-4 mr-1" />
                {showSettings ? 'Hide' : 'Show'} Settings
              </button>
            </div>

            {showSettings && (
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.showTimer}
                    onChange={(e) => setSettings(prev => ({ ...prev, showTimer: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Show Timer</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.randomizeQuestions}
                    onChange={(e) => setSettings(prev => ({ ...prev, randomizeQuestions: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Randomize Questions</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.showFeedback}
                    onChange={(e) => setSettings(prev => ({ ...prev, showFeedback: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Show Feedback</span>
                </label>
              </div>
            )}

            <button
              onClick={handleStartQuiz}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Play className="w-5 h-5" />
              <span>Start Quiz</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
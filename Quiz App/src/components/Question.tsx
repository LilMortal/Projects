import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types/quiz';
import { CheckCircle, XCircle, Info } from 'lucide-react';

interface QuestionProps {
  question: QuizQuestion;
  onAnswer: (selectedOptions: number[]) => void;
  showFeedback: boolean;
  userAnswers: number[];
}

export function Question({ question, onAnswer, showFeedback, userAnswers }: QuestionProps) {
  const [selectedOptions, setSelectedOptions] = useState<number[]>(userAnswers || []);

  useEffect(() => {
    setSelectedOptions(userAnswers || []);
  }, [userAnswers, question.id]);

  const handleOptionSelect = (optionIndex: number) => {
    let newSelected: number[];

    if (question.type === 'single' || question.type === 'boolean') {
      newSelected = [optionIndex];
    } else {
      newSelected = selectedOptions.includes(optionIndex)
        ? selectedOptions.filter(i => i !== optionIndex)
        : [...selectedOptions, optionIndex];
    }

    setSelectedOptions(newSelected);
    onAnswer(newSelected);
  };

  const isCorrectAnswer = (optionIndex: number) => {
    return question.correctAnswers.includes(optionIndex);
  };

  const getOptionClassName = (optionIndex: number) => {
    const baseClasses = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
    
    if (!showFeedback) {
      const isSelected = selectedOptions.includes(optionIndex);
      return `${baseClasses} ${
        isSelected 
          ? 'border-blue-500 bg-blue-50 text-blue-900' 
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`;
    }

    // Show feedback colors
    const isSelected = selectedOptions.includes(optionIndex);
    const isCorrect = isCorrectAnswer(optionIndex);

    if (isCorrect) {
      return `${baseClasses} border-green-500 bg-green-50 text-green-900`;
    } else if (isSelected && !isCorrect) {
      return `${baseClasses} border-red-500 bg-red-50 text-red-900`;
    } else {
      return `${baseClasses} border-gray-200 bg-gray-50 text-gray-600`;
    }
  };

  const getOptionIcon = (optionIndex: number) => {
    if (!showFeedback) return null;

    const isSelected = selectedOptions.includes(optionIndex);
    const isCorrect = isCorrectAnswer(optionIndex);

    if (isCorrect) {
      return <CheckCircle className="w-5 h-5 text-green-600 ml-2" />;
    } else if (isSelected && !isCorrect) {
      return <XCircle className="w-5 h-5 text-red-600 ml-2" />;
    }

    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 animate-fadeIn">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {question.question}
        </h2>
        
        {question.type === 'multiple' && (
          <p className="text-sm text-gray-600 mb-4">
            Select all correct answers
          </p>
        )}
      </div>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showFeedback && handleOptionSelect(index)}
            disabled={showFeedback}
            className={getOptionClassName(index)}
            aria-pressed={selectedOptions.includes(index)}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {getOptionIcon(index)}
            </div>
          </button>
        ))}
      </div>

      {showFeedback && question.explanation && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg animate-slideIn">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">Explanation</h4>
              <p className="text-sm text-blue-800">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
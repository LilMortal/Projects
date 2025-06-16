import { useState, useEffect, useCallback } from 'react';
import { Quiz, QuizQuestion, QuizAttempt, QuizSettings } from '../types/quiz';
import { shuffleQuestions } from '../utils/shuffle';

export function useQuiz(quiz: Quiz | null, settings: QuizSettings) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<{ [questionId: string]: number[] }>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [questionTimeRemaining, setQuestionTimeRemaining] = useState(0);
  const [quizStartTime, setQuizStartTime] = useState<Date | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Initialize quiz
  useEffect(() => {
    if (quiz) {
      const quizQuestions = settings.randomizeQuestions 
        ? shuffleQuestions(quiz.questions)
        : quiz.questions;
      
      setQuestions(quizQuestions);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setShowFeedback(false);
      setIsQuizCompleted(false);
      setQuizStartTime(new Date());
      
      if (quiz.timeLimit && settings.showTimer) {
        setTimeRemaining(quiz.timeLimit * 60);
      }
      
      if (quizQuestions[0]?.timeLimit && settings.showTimer) {
        setQuestionTimeRemaining(quizQuestions[0].timeLimit);
      }
    }
  }, [quiz, settings]);

  // Quiz timer
  useEffect(() => {
    if (!settings.showTimer || timeRemaining <= 0 || isQuizCompleted) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsQuizCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, settings.showTimer, isQuizCompleted]);

  // Question timer
  useEffect(() => {
    if (!settings.showTimer || questionTimeRemaining <= 0 || isQuizCompleted) return;

    const timer = setInterval(() => {
      setQuestionTimeRemaining(prev => {
        if (prev <= 1) {
          // Auto-advance to next question
          handleNextQuestion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questionTimeRemaining, settings.showTimer, isQuizCompleted, currentQuestionIndex]);

  const handleAnswer = useCallback((questionId: string, selectedOptions: number[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOptions
    }));

    if (settings.showFeedback) {
      setShowFeedback(true);
    }
  }, [settings.showFeedback]);

  const handleNextQuestion = useCallback(() => {
    setShowFeedback(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      
      // Set timer for next question
      if (questions[nextIndex]?.timeLimit && settings.showTimer) {
        setQuestionTimeRemaining(questions[nextIndex].timeLimit);
      }
    } else {
      setIsQuizCompleted(true);
    }
  }, [currentQuestionIndex, questions, settings.showTimer]);

  const calculateResults = useCallback((): QuizAttempt | null => {
    if (!quiz || !quizStartTime) return null;

    let correctAnswers = 0;
    const totalQuestions = questions.length;

    questions.forEach(question => {
      const userAnswers = answers[question.id] || [];
      const correctAnswerSet = new Set(question.correctAnswers);
      const userAnswerSet = new Set(userAnswers);

      if (correctAnswerSet.size === userAnswerSet.size &&
          [...correctAnswerSet].every(answer => userAnswerSet.has(answer))) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const timeSpent = Math.floor((new Date().getTime() - quizStartTime.getTime()) / 1000);

    return {
      quizId: quiz.id,
      answers,
      score,
      totalQuestions,
      correctAnswers,
      startTime: quizStartTime,
      endTime: new Date(),
      timeSpent
    };
  }, [quiz, questions, answers, quizStartTime]);

  return {
    currentQuestion: questions[currentQuestionIndex],
    currentQuestionIndex,
    totalQuestions: questions.length,
    answers,
    timeRemaining,
    questionTimeRemaining,
    showFeedback,
    isQuizCompleted,
    handleAnswer,
    handleNextQuestion,
    calculateResults,
    progress: questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0
  };
}
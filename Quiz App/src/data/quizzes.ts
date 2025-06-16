import { Quiz } from '../types/quiz';

export const sampleQuizzes: Quiz[] = [
  {
    id: 'web-development',
    title: 'Web Development Fundamentals',
    description: 'Test your knowledge of HTML, CSS, JavaScript, and modern web technologies.',
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: 'q1',
        question: 'Which of the following are valid HTML5 semantic elements?',
        type: 'multiple',
        options: ['<header>', '<article>', '<div>', '<section>', '<span>'],
        correctAnswers: [0, 1, 3],
        explanation: 'HTML5 semantic elements like <header>, <article>, and <section> provide meaning to the structure of web content.',
        timeLimit: 30
      },
      {
        id: 'q2',
        question: 'What does CSS stand for?',
        type: 'single',
        options: [
          'Computer Style Sheets',
          'Cascading Style Sheets',
          'Creative Style Sheets',
          'Colorful Style Sheets'
        ],
        correctAnswers: [1],
        explanation: 'CSS stands for Cascading Style Sheets, which describes how HTML elements should be displayed.',
        timeLimit: 20
      },
      {
        id: 'q3',
        question: 'JavaScript is a compiled language.',
        type: 'boolean',
        options: ['True', 'False'],
        correctAnswers: [1],
        explanation: 'JavaScript is an interpreted language, not a compiled language. It is executed directly by the browser or runtime environment.',
        timeLimit: 15
      },
      {
        id: 'q4',
        question: 'Which CSS property is used to control the spacing between elements?',
        type: 'single',
        options: ['margin', 'padding', 'border', 'spacing'],
        correctAnswers: [0],
        explanation: 'The margin property controls the space outside an element, creating spacing between elements.',
        timeLimit: 25
      },
      {
        id: 'q5',
        question: 'Select all JavaScript data types:',
        type: 'multiple',
        options: ['string', 'number', 'boolean', 'array', 'object'],
        correctAnswers: [0, 1, 2, 4],
        explanation: 'JavaScript has primitive types (string, number, boolean) and reference types (object). Arrays are actually objects in JavaScript.',
        timeLimit: 30
      }
    ]
  },
  {
    id: 'react-basics',
    title: 'React Fundamentals',
    description: 'Assess your understanding of React components, hooks, and state management.',
    passingScore: 75,
    timeLimit: 12,
    questions: [
      {
        id: 'r1',
        question: 'What is JSX?',
        type: 'single',
        options: [
          'A JavaScript library',
          'A syntax extension for JavaScript',
          'A CSS framework',
          'A database query language'
        ],
        correctAnswers: [1],
        explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like syntax in your JavaScript code.',
        timeLimit: 20
      },
      {
        id: 'r2',
        question: 'React components must always return a single element.',
        type: 'boolean',
        options: ['True', 'False'],
        correctAnswers: [1],
        explanation: 'React components can return multiple elements using fragments (<></>) or arrays, not just a single element.',
        timeLimit: 15
      },
      {
        id: 'r3',
        question: 'Which hooks are built into React?',
        type: 'multiple',
        options: ['useState', 'useEffect', 'useRouter', 'useContext', 'useQuery'],
        correctAnswers: [0, 1, 3],
        explanation: 'useState, useEffect, and useContext are built-in React hooks. useRouter and useQuery are from external libraries.',
        timeLimit: 25
      },
      {
        id: 'r4',
        question: 'What is the virtual DOM?',
        type: 'single',
        options: [
          'A backup copy of the DOM',
          'A JavaScript representation of the real DOM',
          'A CSS framework',
          'A browser extension'
        ],
        correctAnswers: [1],
        explanation: 'The virtual DOM is a JavaScript representation of the real DOM that React uses to optimize updates and improve performance.',
        timeLimit: 30
      }
    ]
  }
];
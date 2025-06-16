# QuizMaster Pro 🧠

A modern, comprehensive quiz application built with React, TypeScript, and Tailwind CSS. Features a beautiful, accessible interface with support for multiple question types, timers, and detailed analytics.

![QuizMaster Pro Screenshot](https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=1200)

## ✨ Features

### Core Functionality
- **Multiple Question Types**: Support for single-choice, multiple-choice, and true/false questions
- **Smart Scoring System**: Automatic calculation of scores with detailed breakdowns
- **Progress Tracking**: Visual progress bar showing completion status
- **Randomized Questions**: Optional question randomization for each quiz attempt
- **Timer Support**: Configurable timers for individual questions and overall quiz
- **Immediate Feedback**: Optional instant feedback with detailed explanations
- **Results Analytics**: Comprehensive results screen with time tracking and performance metrics

### User Experience
- **Intuitive Interface**: Clean, modern design with smooth animations and transitions
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **Accessibility First**: WCAG 2.1 compliant with keyboard navigation and screen reader support
- **Progressive Disclosure**: Settings and advanced options revealed on demand
- **Visual Feedback**: Color-coded answers and clear success/error states

### Technical Features
- **TypeScript**: Full type safety and enhanced developer experience
- **Modular Architecture**: Clean component structure with custom hooks
- **Performance Optimized**: Efficient rendering and state management
- **Error Handling**: Comprehensive error boundaries and input validation
- **Extensible Data**: Easy-to-modify quiz data structure

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Building for Production

```bash
npm run build
npm run preview
```

## 📱 How to Use

### Taking a Quiz

1. **Select a Quiz**: Choose from available quizzes on the home screen
2. **Configure Settings**: 
   - Toggle timer display
   - Enable/disable question randomization
   - Choose whether to show immediate feedback
3. **Start Quiz**: Click "Start Quiz" to begin
4. **Answer Questions**: 
   - Single-choice: Select one answer
   - Multiple-choice: Select all correct answers
   - True/False: Choose true or false
5. **Navigate**: Use "Next Question" to proceed or let the timer auto-advance
6. **View Results**: See your score, time taken, and detailed breakdown

### Keyboard Navigation

- **Tab**: Navigate between interactive elements
- **Space/Enter**: Select answers and buttons
- **Arrow Keys**: Navigate between options
- **Escape**: Return to previous screen (where applicable)

## 🎨 Design Philosophy

### Visual Design
- **Modern Aesthetic**: Clean lines, subtle gradients, and thoughtful spacing
- **Color Psychology**: Blue for trust and focus, green for success, red for errors
- **Typography**: Clear hierarchy with readable fonts and appropriate sizing
- **Micro-interactions**: Subtle animations that provide feedback without distraction

### User Experience
- **Progressive Disclosure**: Advanced settings hidden by default to avoid overwhelming users
- **Consistent Patterns**: Similar interactions behave the same way throughout the app
- **Error Prevention**: Clear labeling and validation to prevent user mistakes
- **Feedback Loops**: Immediate visual feedback for all user actions

### Accessibility
- **WCAG 2.1 AA Compliance**: Meets accessibility standards
- **Color Contrast**: All text meets 4.5:1 contrast ratio requirements
- **Focus Management**: Clear focus indicators and logical tab order
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Motor Accessibility**: Large click targets and keyboard alternatives

## 📊 Adding or Updating Quiz Data

Quiz data is stored in `src/data/quizzes.ts`. Each quiz follows this structure:

```typescript
{
  id: 'unique-quiz-id',
  title: 'Quiz Title',
  description: 'Brief description of the quiz content',
  passingScore: 70, // Percentage required to pass
  timeLimit: 15, // Total time limit in minutes (optional)
  questions: [
    {
      id: 'question-id',
      question: 'What is the question?',
      type: 'single' | 'multiple' | 'boolean',
      options: ['Option 1', 'Option 2', 'Option 3'],
      correctAnswers: [1], // Array of correct option indices
      explanation: 'Explanation of the correct answer',
      timeLimit: 30 // Question time limit in seconds (optional)
    }
  ]
}
```

### Question Types

1. **Single Choice** (`type: 'single'`):
   - User selects one answer
   - `correctAnswers` array should contain one index

2. **Multiple Choice** (`type: 'multiple'`):
   - User can select multiple answers
   - `correctAnswers` array contains all correct indices

3. **True/False** (`type: 'boolean'`):
   - Two options: True (index 0) or False (index 1)
   - `correctAnswers` contains [0] for true or [1] for false

## 🏗️ Architecture

### Project Structure
```
src/
├── components/          # React components
│   ├── StartScreen.tsx  # Quiz selection and settings
│   ├── QuizScreen.tsx   # Main quiz interface
│   ├── Question.tsx     # Individual question component
│   ├── ProgressBar.tsx  # Progress tracking
│   ├── Timer.tsx        # Timer component
│   └── ResultsScreen.tsx # Results display
├── hooks/              # Custom React hooks
│   └── useQuiz.ts      # Quiz logic and state management
├── types/              # TypeScript type definitions
│   └── quiz.ts         # Quiz-related interfaces
├── data/               # Static data
│   └── quizzes.ts      # Quiz content
├── utils/              # Utility functions
│   └── shuffle.ts      # Array shuffling utilities
└── App.tsx             # Main application component
```

### Key Technologies
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type safety and enhanced developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Vite**: Fast build tool and development server
- **Lucide React**: Beautiful, customizable icons

## 🧪 Testing & Quality Assurance

### Manual Testing Checklist
- [ ] All question types work correctly
- [ ] Timer functionality operates as expected
- [ ] Score calculations are accurate
- [ ] Responsive design works on all screen sizes
- [ ] Keyboard navigation functions properly
- [ ] Screen reader compatibility verified
- [ ] Settings persist throughout quiz session
- [ ] Error states display appropriately

### Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔧 Customization

### Styling
Colors and styling can be customized in `tailwind.config.js` and `src/index.css`. The app uses a consistent design system with CSS custom properties for easy theming.

### Adding Features
The modular architecture makes it easy to add new features:
1. Create new components in the `components/` directory
2. Add new types to `types/quiz.ts`
3. Extend the `useQuiz` hook for new functionality
4. Update the main App component to integrate new features

### Performance Optimization
- Components use React.memo where appropriate
- State updates are batched for efficiency
- Large lists use key props for optimal rendering
- Images are optimized and served from CDN

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Vercel
1. Connect your GitHub repository
2. Vercel will automatically detect the Vite configuration
3. Deploy with zero configuration

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add deployment script to package.json
3. Run: `npm run deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit with descriptive messages
5. Push to your fork and submit a pull request

## 🔮 Future Enhancements

- [ ] User authentication and progress saving
- [ ] Quiz creation interface for non-technical users
- [ ] Advanced analytics and reporting
- [ ] Social features (sharing results, leaderboards)
- [ ] Offline mode support
- [ ] Multi-language support
- [ ] Advanced question types (drag-and-drop, image-based)
- [ ] Integration with learning management systems

## 📞 Support

If you encounter any issues or have questions:
1. Check the GitHub Issues page
2. Review the documentation above
3. Create a new issue with detailed information

---

Built with ❤️ using React, TypeScript, and Tailwind CSS

# SpeedType - Modern Typing Speed Test App

A beautifully designed, responsive typing speed test application built with React, TypeScript, and TailwindCSS. Test your typing speed and accuracy with real-time feedback and track your progress over time.

![SpeedType App](https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## 🚀 Features

### Core Functionality
- **Multiple Timer Options**: Choose from 15s, 30s, 60s, or 120s test durations
- **Real-time Statistics**: Track WPM, CPM, accuracy percentage, and error count
- **Visual Feedback**: Instant color-coded feedback for correct/incorrect keystrokes
- **Auto-start Timer**: Test begins automatically when you start typing
- **Countdown Timer**: 3-2-1 countdown before each test begins
- **Progress Tracking**: Visual progress bar showing completion status

### Advanced Features
- **Test History**: View your last 10 test results with detailed statistics
- **Performance Analytics**: Track average WPM, best WPM, and improvement over time
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Persistent Storage**: Results automatically saved to local storage
- **Random Text Generation**: Variety of engaging text samples for practice
- **Character Highlighting**: Current character and word highlighting for focus

### User Experience
- **Modern Dark Theme**: Elegant dark interface with neon purple/blue accents
- **Smooth Animations**: Fluid transitions and hover effects
- **Typing Cursor**: Animated cursor showing current position
- **Error Highlighting**: Clear visual indication of mistakes
- **Completion Celebration**: Beautiful results display upon test completion

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: TailwindCSS with custom gradients and animations
- **Icons**: Lucide React for beautiful, consistent icons
- **Fonts**: JetBrains Mono for typing area, Inter for UI elements
- **State Management**: React hooks with custom hook patterns
- **Storage**: Browser localStorage for persistent data
- **Build Tool**: Vite for fast development and optimized builds

## 🎯 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/speedtype.git
   cd speedtype
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start using the app

### Building for Production

```bash
npm run build
npm run preview
```

## 🎮 How to Use

1. **Choose Your Duration**: Select from 15s, 30s, 60s, or 120s test options
2. **Start the Test**: Click "Start Test" or simply begin typing
3. **Type Away**: Follow the text displayed, with real-time feedback on accuracy
4. **View Results**: See your WPM, CPM, accuracy, and error count
5. **Track Progress**: Check your history to see improvement over time
6. **Practice More**: Reset and try again with different text samples

## 📊 Statistics Explained

- **WPM (Words Per Minute)**: Standard typing speed measurement (5 characters = 1 word)
- **CPM (Characters Per Minute)**: Raw character typing speed
- **Accuracy**: Percentage of correctly typed characters
- **Errors**: Total number of incorrect keystrokes

## 🎨 Design Philosophy

SpeedType follows modern UI/UX principles:

- **Minimalist Interface**: Clean, distraction-free design focused on the typing experience
- **Dark Theme**: Reduces eye strain during extended practice sessions
- **Gradient Accents**: Purple-to-blue gradients for visual appeal and brand consistency
- **Responsive Layout**: Seamless experience across all device sizes
- **Accessibility**: High contrast ratios and keyboard navigation support

## 🔧 Project Structure

```
src/
├── components/          # React components
│   ├── TextDisplay.tsx     # Text rendering and highlighting
│   ├── StatsDisplay.tsx    # Real-time statistics
│   ├── TimerSettings.tsx   # Duration selection
│   ├── HistoryPanel.tsx    # Results history
│   ├── Countdown.tsx       # Pre-test countdown
│   └── TypingTest.tsx      # Main test component
├── hooks/              # Custom React hooks
│   └── useTypingTest.ts    # Core typing test logic
├── utils/              # Utility functions
│   └── typing.ts           # Calculation helpers
├── data/               # Static data
│   └── texts.ts            # Sample text collection
├── types.ts            # TypeScript type definitions
└── App.tsx             # Main application component
```

## 🚀 Future Enhancements

### Planned Features
- **Multiplayer Mode**: Real-time typing races with friends
- **Custom Text Input**: Upload your own text files for practice
- **Difficulty Levels**: Beginner, intermediate, and advanced text samples
- **Themes**: Multiple color schemes and customization options
- **Sound Effects**: Optional audio feedback for keystrokes
- **Detailed Analytics**: WPM over time graphs and detailed progress tracking

### Technical Improvements
- **User Accounts**: Cloud sync for cross-device progress tracking
- **Leaderboards**: Global and friend leaderboards
- **API Integration**: Quote APIs for dynamic content
- **PWA Support**: Offline functionality and app-like experience
- **Accessibility Enhancements**: Screen reader support and improved keyboard navigation

## 🤝 Contributing

We welcome contributions to SpeedType! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and patterns
- Add TypeScript types for new features
- Ensure responsive design for all screen sizes
- Test thoroughly across different browsers
- Update documentation for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Text Samples**: Curated collection of educational and engaging content
- **Icons**: Beautiful icons provided by [Lucide React](https://lucide.dev)
- **Fonts**: JetBrains Mono and Inter for optimal readability
- **Inspiration**: Classic typing test tools with modern design principles
- **Community**: Thanks to all contributors and users for feedback and improvements

---

**Happy Typing!** 🎯

Built with ❤️ using React, TypeScript, and TailwindCSS

[Live Demo](https://speedtype-demo.netlify.app) • [Report Bug](https://github.com/yourusername/speedtype/issues) • [Request Feature](https://github.com/yourusername/speedtype/issues)
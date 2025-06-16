# Modern Tic Tac Toe

A beautiful, responsive, and fully featured Tic Tac Toe game built with React, TypeScript, and Tailwind CSS. This game offers both Player vs Player and Player vs AI modes with elegant animations and a modern light theme design.

![Tic Tac Toe Preview](https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)

## 🎮 Game Features

### Core Gameplay
- **3x3 Interactive Grid**: Large, tappable cells optimized for all devices
- **Two Game Modes**: 
  - Player vs Player (local multiplayer)
  - Player vs AI (easy difficulty with random move logic)
- **Smart Game Logic**: 
  - Win detection with visual highlighting of winning combinations
  - Draw detection and handling
  - Prevention of invalid moves (occupied cells)
- **Current Player Indicator**: Visual feedback showing whose turn it is
- **Game State Management**: Comprehensive tracking of game progress

### Scoring & Progress
- **Live Scoreboard**: Tracks wins for Player X, Player O, and draws
- **Persistent Score Tracking**: Scores maintain across multiple games
- **Reset Functionality**: 
  - New Game button to restart current game
  - Reset Scores button to clear all statistics

### User Experience
- **Smooth Animations**: 
  - Piece placement with scale and bounce effects
  - Winning combination highlighting with gentle pulsing
  - Hover states and micro-interactions
  - Smooth transitions between game states
- **Responsive Design**: Optimized layouts for mobile, tablet, and desktop
- **Accessibility**: High contrast ratios and keyboard navigation support

## 🎨 Design & UI/UX

### Visual Design Philosophy
The game employs a **modern light theme** with careful attention to visual hierarchy and user experience:

- **Color Palette**: 
  - Primary: Sage Green (#647864) - calming, natural
  - Secondary: Soft Peach (#f59e52) - warm, inviting  
  - Accent: Sky Blue (#0ea5e9) - fresh, modern
  - Background: Gradient blend of all three for visual depth

### Design Elements
- **Typography**: Inter font family for modern, readable text
- **Rounded Corners**: Consistent 12px radius for friendly, approachable feel
- **Shadows & Depth**: Subtle layering with soft shadows
- **Spacing**: 8px grid system for consistent visual rhythm
- **Interactive States**: Hover, active, and focus states with smooth transitions

### Responsive Breakpoints
- **Mobile** (< 768px): Compact layout with touch-optimized controls
- **Tablet** (768px - 1024px): Balanced layout with medium-sized elements  
- **Desktop** (> 1024px): Spacious layout with larger interactive elements

## 🛠 Technologies Used

### Frontend Stack
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first styling with custom color extensions
- **Lucide React** - Beautiful, consistent iconography

### Development Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and formatting
- **PostCSS & Autoprefixer** - CSS processing and browser compatibility

### Architecture Patterns
- **Custom Hooks** - Centralized game logic with `useGame` hook
- **Component Composition** - Modular, reusable UI components
- **TypeScript Interfaces** - Strong typing for game state and logic
- **Separation of Concerns** - Clear division between UI, logic, and utilities

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd modern-tic-tac-toe
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:5173` to play the game

### Build for Production

1. **Create production build**:
   ```bash
   npm run build
   ```

2. **Preview production build**:
   ```bash
   npm run preview
   ```

The built files will be in the `dist` directory, ready for deployment.

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── GameBoard.tsx   # 3x3 game grid with cell interactions
│   ├── GameStatus.tsx  # Current player & game mode display
│   ├── Scoreboard.tsx  # Score tracking and display
│   └── GameControls.tsx # Game reset and control buttons
├── hooks/              # Custom React hooks
│   └── useGame.ts      # Centralized game state management
├── types/              # TypeScript type definitions
│   └── game.ts         # Game-related interfaces and types
├── utils/              # Pure utility functions
│   └── gameLogic.ts    # Core game logic and AI
└── App.tsx             # Main application component
```

## 🧠 Game Logic & AI

### Win Detection Algorithm
The game uses an efficient win detection system that checks all possible winning combinations:
- **Rows**: 3 horizontal lines
- **Columns**: 3 vertical lines  
- **Diagonals**: 2 diagonal lines

### AI Implementation
The AI opponent uses a simple random move selection strategy:
- Identifies all available (empty) cells
- Randomly selects one available position
- Makes the move after a 500ms delay for natural pacing

### Edge Cases Handled
- **Invalid Moves**: Clicking occupied cells is prevented
- **Game Over States**: No moves allowed after win/draw
- **AI Timing**: Proper delays prevent overwhelming the user
- **State Consistency**: All game state updates are atomic

## 🎯 Future Enhancements

### Potential Features
- **Advanced AI**: Minimax algorithm for challenging gameplay
- **Game History**: Move-by-move replay functionality
- **Themes**: Multiple color schemes and visual themes
- **Sound Effects**: Audio feedback for moves and wins
- **Multiplayer**: Online multiplayer with WebSocket support
- **Tournaments**: Best-of-N game series
- **Statistics**: Detailed gameplay analytics

### Technical Improvements
- **PWA Support**: Offline gameplay capability
- **Internationalization**: Multi-language support
- **Accessibility**: Enhanced screen reader support
- **Performance**: Code splitting and lazy loading

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Vercel will automatically deploy on every push

### Netlify
1. Run `npm run build`
2. Upload `dist` folder to Netlify
3. Configure build settings: Build command: `npm run build`, Publish directory: `dist`

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json: `"homepage": "https://yourusername.github.io/modern-tic-tac-toe"`
3. Add deploy script: `"deploy": "gh-pages -d dist"`
4. Run: `npm run build && npm run deploy`

## 📝 Development Notes

### Code Quality
- **TypeScript**: 100% type coverage for better maintainability
- **ESLint**: Enforced coding standards and best practices
- **Component Architecture**: Small, focused, reusable components
- **Performance**: Optimized re-renders with proper dependency arrays

### Browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **CSS Grid**: Fallbacks for older browser support
- **Flexbox**: Cross-browser layout compatibility

### Testing Considerations
While not implemented in this version, the codebase is structured for easy testing:
- **Pure Functions**: Game logic separated from UI components
- **Mocked Dependencies**: AI and utility functions can be easily mocked
- **Component Testing**: Each component has clear props and responsibilities

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

---

**Enjoy playing Modern Tic Tac Toe!** 🎮✨
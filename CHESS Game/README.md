# Royal Chess ♛

A beautiful, fully-featured chess game built with React, TypeScript, and modern web technologies. Experience the timeless game of chess with elegant design, smooth animations, and professional-grade functionality.

![Royal Chess Screenshot](https://images.pexels.com/photos/5638471/pexels-photo-5638471.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## ✨ Features

### 🎮 Core Gameplay
- **Complete Chess Implementation**: All standard chess rules with legal move validation
- **Intuitive Controls**: Click-to-select piece movement with highlighted available moves
- **Game State Detection**: Automatic detection of check, checkmate, stalemate, and draw conditions
- **Turn-Based Logic**: Proper alternating turns between white and black pieces

### 🎯 Game Modes
- **Player vs Player**: Local multiplayer on the same device
- **Player vs AI**: Challenge a basic AI opponent with random move logic
- **Easy Mode Switching**: Seamlessly switch between game modes

### 🕒 Advanced Features
- **Move History**: Complete game notation with standard algebraic notation (SAN)
- **Undo Functionality**: Take back moves (single or double for AI mode)
- **Game Timer**: Optional chess clock with customizable time controls
- **Last Move Highlighting**: Visual indication of the most recent move
- **Coordinate System**: Board coordinates for easy reference

### 🎨 Design Excellence
- **Dark Elegant Theme**: Sophisticated color scheme with warm gradients
- **Smooth Animations**: Hover effects, piece selection, and movement transitions
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Professional Typography**: Clean, readable fonts with proper hierarchy
- **Modern UI Components**: Polished interface with subtle shadows and effects

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd royal-chess
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
   Navigate to `http://localhost:5173` to start playing!

### Building for Production

```bash
npm run build
```

The built application will be available in the `dist` directory.

## 🎲 How to Play

1. **Select a Piece**: Click on any of your pieces to select it
2. **View Available Moves**: Selected pieces show highlighted possible move squares
3. **Make a Move**: Click on a highlighted square to move your piece
4. **Game Modes**: Switch between Player vs Player and Player vs AI modes
5. **Use Controls**: Access undo, reset, and timer controls from the sidebar

### Game Controls
- **New Game**: Reset the board to start fresh
- **Undo**: Take back the last move (or two moves in AI mode)
- **Timer**: Start/pause the game clock for timed matches
- **Mode Switch**: Toggle between PvP and AI modes

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Chess Logic**: Chess.js library for game rules and validation
- **Icons**: Lucide React for beautiful, consistent iconography
- **Build Tool**: Vite for fast development and optimized builds
- **State Management**: React hooks with custom game logic

## 📱 Responsive Design

Royal Chess is designed to work seamlessly across all devices:

- **Mobile (< 768px)**: Optimized touch interface with larger pieces
- **Tablet (768px - 1024px)**: Balanced layout with clear visibility
- **Desktop (> 1024px)**: Full-featured layout with sidebar panels

## 🔧 Project Structure

```
src/
├── components/          # React components
│   ├── ChessBoard.tsx   # Main game board
│   ├── ChessPiece.tsx   # Individual piece component
│   ├── GameInfo.tsx     # Game status and player info
│   ├── GameControls.tsx # Control buttons and settings
│   └── MoveHistory.tsx  # Move notation display
├── hooks/               # Custom React hooks
│   └── useChessGame.ts  # Main game logic hook
├── types/               # TypeScript type definitions
│   └── chess.ts         # Chess-related types
├── utils/               # Utility functions
│   └── chessLogic.ts    # Chess game logic and helpers
├── App.tsx              # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and animations
```

## 🎯 Future Enhancements

This chess application provides a solid foundation for additional features:

### 🌐 Multiplayer Features
- **Online Multiplayer**: Real-time games with WebSocket integration
- **Room System**: Create and join private game rooms
- **Spectator Mode**: Watch games in progress
- **Player Profiles**: User accounts and game statistics

### 🤖 Enhanced AI
- **Difficulty Levels**: Multiple AI strength options
- **Chess Engine Integration**: Stockfish or similar engine integration
- **Opening Book**: Database of standard chess openings
- **Position Analysis**: Computer evaluation of positions

### 📊 Analytics & Features
- **Game Analysis**: Post-game analysis with best moves
- **Puzzle Mode**: Daily chess puzzles and tactics
- **Tournament Mode**: Bracket-style competitions
- **Game Database**: Save and replay games
- **PGN Import/Export**: Standard chess notation support

### 🎵 Audio & Visual
- **Sound Effects**: Move sounds, capture sounds, check alerts
- **Piece Animation**: Smooth piece movement animations
- **Board Themes**: Multiple visual themes and piece sets
- **3D Board Option**: Three-dimensional chess board view

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
- Follow the existing code style and structure
- Add TypeScript types for new features
- Ensure responsive design compatibility
- Test on multiple devices and browsers
- Update documentation as needed

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Chess.js**: Excellent chess game logic library
- **Lucide React**: Beautiful icon set
- **Tailwind CSS**: Utility-first CSS framework
- **React Team**: Amazing frontend framework
- **Vite**: Lightning-fast build tool

## 📸 Screenshots

### Desktop View
The full-featured desktop layout with sidebar panels for game information, controls, and move history.

### Mobile View
Touch-optimized interface with larger pieces and responsive layout that works perfectly on smartphones.

### Game Features
- Elegant piece highlighting and move validation
- Professional move notation display
- Intuitive game controls and mode switching
- Beautiful dark theme with smooth animations

---

**Ready to master the royal game?** Start playing Royal Chess today and experience chess like never before! ♛
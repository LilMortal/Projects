# AetherDraw

A professional, feature-rich drawing application built with React, TypeScript, and HTML5 Canvas. AetherDraw provides a clean, intuitive interface for digital art creation with advanced tools and layer management.

![AetherDraw Interface](https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## ✨ Features

### 🎨 Drawing Tools
- **Freehand Brush** - Smooth, pressure-sensitive drawing with customizable size and opacity
- **Eraser Tool** - Clean erasing with adjustable size
- **Shape Tools** - Line, rectangle, and circle drawing tools
- **Fill Tool** - Flood fill with color matching algorithm
- **Pan Tool** - Navigate large canvases effortlessly

### 🎛️ Advanced Controls
- **Zoom & Pan** - Smooth zooming (10%-500%) with mouse wheel support
- **Infinite Canvas** - Large, scrollable workspace for extensive projects
- **Grid Overlay** - Optional grid for precise alignment
- **Brush Customization** - Size (1-50px) and opacity (10%-100%) controls
- **Color Palette** - 18 carefully selected colors plus custom color picker

### 📚 Layer Management
- **Multiple Layers** - Add, delete, and organize layers
- **Layer Visibility** - Show/hide individual layers
- **Layer Opacity** - Adjust transparency per layer
- **Active Layer Indicator** - Clear visual feedback

### ⚡ Productivity Features
- **Undo/Redo** - Full history management with keyboard shortcuts
- **Keyboard Shortcuts** - Complete set of hotkeys for power users
- **Export/Import** - Save as PNG/JPEG, load existing images
- **Responsive Design** - Works seamlessly on desktop and mobile

## 🎹 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `B` | Brush Tool |
| `E` | Eraser Tool |
| `L` | Line Tool |
| `R` | Rectangle Tool |
| `C` | Circle Tool |
| `F` | Fill Tool |
| `H` | Pan Tool |
| `G` | Toggle Grid |
| `Ctrl+Z` | Undo |
| `Ctrl+Y` / `Ctrl+Shift+Z` | Redo |
| `+` | Zoom In |
| `-` | Zoom Out |
| `0` | Reset Zoom |

## 🏗️ Architecture

### Component Structure
```
src/
├── components/
│   ├── Canvas.tsx          # Main drawing canvas
│   ├── Toolbar.tsx         # Tool selection and controls
│   └── LayersPanel.tsx     # Layer management interface
├── context/
│   └── DrawingContext.tsx  # Global state management
├── hooks/
│   └── useKeyboardShortcuts.ts # Keyboard shortcut handling
├── types/
│   └── drawing.ts          # TypeScript interfaces
├── utils/
│   └── canvasUtils.ts      # Canvas drawing utilities
└── App.tsx                 # Main application component
```

### State Management
AetherDraw uses React Context with useReducer for predictable state management:
- **Drawing State**: Tools, colors, brush settings
- **Canvas State**: Zoom, pan, grid visibility
- **Layer State**: Layer management and visibility
- **History State**: Undo/redo functionality

### Canvas Rendering
- HTML5 Canvas API for high-performance drawing
- Efficient rendering with proper state management
- Smooth brush strokes using bezier curves
- Proper handling of device pixel ratios

## 🎨 Design Philosophy

AetherDraw follows modern design principles:
- **Light Theme**: Clean, professional appearance
- **Soft Shadows**: Subtle depth and hierarchy
- **Rounded Corners**: Friendly, modern aesthetics
- **Smooth Transitions**: Polished micro-interactions
- **Pastel Accents**: Calming, creative color palette

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/aetherdraw.git

# Navigate to project directory
cd aetherdraw

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production
```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

## 🔧 Technical Details

### Technologies Used
- **React 18** - Modern React with hooks and context
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful, consistent icons
- **HTML5 Canvas** - High-performance drawing surface

### Performance Optimizations
- **Memoized Components** - Prevent unnecessary re-renders
- **Efficient Event Handling** - Optimized mouse/touch events
- **Canvas State Management** - Minimal redraws
- **Image Data Caching** - Smart layer rendering

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Guidelines
- Follow TypeScript best practices
- Maintain component modularity (< 300 lines)
- Use proper semantic HTML
- Ensure accessibility compliance
- Write comprehensive tests

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons provided by [Lucide](https://lucide.dev/)
- Color palette inspired by modern design systems
- Canvas utilities adapted from HTML5 Canvas best practices

## 📞 Support

For support, please open an issue on GitHub or contact our team at support@aetherdraw.com.

---

Built with ❤️ 

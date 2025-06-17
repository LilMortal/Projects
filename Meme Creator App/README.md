# MemeMuse - Create Amazing Memes

A beautiful, lightweight meme generator built with React, TypeScript, and Tailwind CSS. Create professional-quality memes with an intuitive drag-and-drop interface.

![MemeMuse](https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=600)

## ✨ Features

### 🖼️ Image Management
- **Upload Custom Images**: Drag and drop or click to upload JPG, PNG, GIF files
- **Meme Templates**: Choose from popular meme templates to get started quickly
- **Responsive Canvas**: 600x500 canvas optimized for meme creation

### ✍️ Text Editing
- **Top & Bottom Text**: Classic meme-style text positioning
- **Drag & Drop**: Click and drag text anywhere on the canvas
- **Font Customization**:
  - 8 different font families including Impact, Arial, Georgia
  - Font sizes from 16px to 80px with live preview
  - Color picker with preset colors
  - Text stroke for better readability

### 🎨 User Interface
- **Light Theme**: Clean, modern interface with soft pastels
- **Responsive Design**: Works perfectly on mobile and desktop
- **Smooth Animations**: Gentle transitions and hover effects
- **Intuitive Controls**: Easy-to-use text selection and editing

### 🚀 Export & Reset
- **High-Quality Export**: Download memes as PNG files
- **One-Click Reset**: Clear canvas and start fresh
- **Real-Time Preview**: See changes instantly as you edit

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Full type safety and better developer experience
- **Tailwind CSS** - Custom light theme with beautiful gradients
- **HTML5 Canvas** - Native canvas rendering for high-quality output
- **Vite** - Lightning-fast development and build tool

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mememuse.git
   cd mememuse
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
   Navigate to `http://localhost:5173` to start creating memes!

### Build for Production

```bash
npm run build
```

The optimized build will be available in the `dist` directory.

## 🎯 How to Use

### 1. Choose Your Image
- **Upload**: Drag and drop your own image or click to browse
- **Templates**: Select from popular meme templates

### 2. Edit Text
- **Select**: Click on "Top Text" or "Bottom Text" buttons
- **Edit**: Type your text in the input field
- **Customize**: Choose font, size, and color
- **Position**: Click and drag text on the canvas

### 3. Export
- **Download**: Click the download button to save as PNG
- **Reset**: Start over with the reset button

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Top navigation with logo and actions
│   ├── ImageUploader.tsx   # Image upload and template selection
│   ├── TextControls.tsx    # Text editing controls panel
│   └── MemeCanvas.tsx      # Interactive canvas component
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
└── index.css              # Global styles and custom CSS
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#0ea5e9 to #3b82f6)
- **Secondary**: Purple gradient (#d946ef to #8b5cf6)
- **Accent**: Orange tones (#f97316)
- **Success**: Green tones (#22c55e)
- **Background**: Soft gradient from blue to purple to pink

### Typography
- **Display Font**: Poppins for headings and brand elements
- **Body Font**: Inter for readable text and UI elements
- **Meme Fonts**: Impact, Arial, Georgia, Comic Sans MS, and more

### Interactions
- **Hover Effects**: Gentle scale transforms and color transitions
- **Drag & Drop**: Smooth text repositioning with visual feedback
- **Selection**: Dashed border indicators for selected text
- **Animations**: Fade-in effects and smooth transitions

## 🌟 Key Features Explained

### Canvas Interaction
- **Text Selection**: Click any text element to select and edit
- **Drag & Drop**: Click and drag selected text to reposition
- **Boundary Detection**: Text stays within canvas bounds
- **Visual Feedback**: Selected text shows dashed border outline

### Text Rendering
- **High Quality**: Canvas-based rendering for crisp text
- **Text Stroke**: Black outline for better readability on any background
- **Font Loading**: Web-safe fonts with fallbacks
- **Real-time Updates**: Changes appear instantly on canvas

### Responsive Design
- **Mobile First**: Optimized for touch devices
- **Flexible Layout**: Adapts from mobile to desktop
- **Touch Friendly**: Large buttons and touch targets
- **Smooth Scrolling**: Optimized for all screen sizes

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Quality
- **TypeScript**: Full type safety throughout the application
- **ESLint**: Configured with React and TypeScript rules
- **Zero Warnings**: Clean build with no warnings or errors
- **Modern React**: Uses hooks and functional components

## 🎯 Browser Support

- **Chrome**: 88+ (Recommended)
- **Firefox**: 85+
- **Safari**: 14+
- **Edge**: 88+

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. Follow the existing TypeScript patterns
2. Maintain the light theme design system
3. Ensure responsive design works across all breakpoints
4. Test on multiple browsers
5. Keep code clean and well-commented

## 🐛 Known Limitations

- Images are processed locally (no cloud storage)
- Canvas export quality depends on browser implementation
- Text positioning is relative to canvas center

## 🚀 Future Enhancements

- [ ] More text styling options (bold, italic, underline)
- [ ] Additional meme templates
- [ ] Text rotation and scaling handles
- [ ] Undo/Redo functionality
- [ ] Social media sharing
- [ ] Custom font uploads

---

**Happy Meme Making! 🎉**

Create something amazing with MemeMuse - where simplicity meets creativity.
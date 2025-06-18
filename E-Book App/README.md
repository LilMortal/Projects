# 📚 BookVault - Modern eBook Reader App

A beautiful, feature-rich eBook reader application built with React, TypeScript, and Tailwind CSS. BookVault provides an intuitive and customizable reading experience with modern design aesthetics.

## 🚀 Live Demo

[Coming Soon - Deployment Link]

## 🖼️ Screenshots

![Library Dashboard](https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800)

*Beautiful library dashboard with featured books carousel*

![Book Reader](https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=800)

*Customizable reading experience with multiple themes*

![Search & Filter](https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?auto=compress&cs=tinysrgb&w=800)

*Advanced search and filtering capabilities*

## ⚙️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Context + useReducer
- **Development**: ESLint + TypeScript ESLint

## 🎯 Features

### 📚 Core Features
- **Library Dashboard**: Browse books with cover thumbnails, titles, authors, and descriptions
- **Advanced Search**: Full-text search across titles, authors, descriptions, and tags
- **Genre Filtering**: Organize and filter books by categories (Fiction, Technology, Self-Help, etc.)
- **Featured Books**: Carousel showcasing highly-rated and popular books
- **Reading Progress**: Track and resume reading progress across all books

### 📖 eBook Reader
- **Customizable Reading Experience**: 
  - Adjustable font size (12px - 24px)
  - Variable line height (1.2 - 2.0)
  - Multiple font families (Serif, Sans-serif)
  - Reading themes (Light, Sepia, Dark)
  - Configurable page margins
- **Bookmarking System**: Save and organize favorite pages
- **Text Highlighting**: Highlight text with multiple colors and save notes
- **Page Navigation**: Smooth page transitions with progress tracking

### 🎨 User Interface
- **Modern Design**: Clean, minimalist interface with soft gradients
- **Dark/Light Mode**: Comprehensive theming system
- **Mobile-First**: Responsive design optimized for all devices
- **Accessibility**: High contrast ratios and readable typography
- **Smooth Animations**: Subtle micro-interactions and transitions

### 🔐 User Management
- **Authentication**: Sign up/sign in functionality (demo mode available)
- **Profile Management**: User stats, reading history, and preferences
- **Personal Library**: Track reading progress, bookmarks, and highlights
- **Settings**: Customize reading preferences and app appearance

### 📊 Analytics & Tracking
- **Reading Statistics**: Pages read, books started, completion rates
- **Bookmark Management**: Organize and quick-access saved pages
- **Highlight Collection**: Review and manage text highlights
- **Progress Visualization**: Visual progress bars and completion percentages

## 🛠️ Installation & Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup
```bash
# Clone the repository
git clone [repository-url]
cd bookvault

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Development Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── BookCard.tsx    # Individual book display card
│   ├── BookDetailModal.tsx # Book information modal
│   ├── BookGrid.tsx    # Grid layout for books
│   ├── BookReader.tsx  # Main reading interface
│   ├── ContinueReading.tsx # Reading progress dashboard
│   ├── FeaturedBooks.tsx # Featured books carousel
│   ├── GenreFilter.tsx # Genre filtering component
│   ├── Layout.tsx      # Main app layout wrapper
│   ├── Navigation.tsx  # Sidebar navigation
│   ├── ReadingSettings.tsx # Reading customization panel
│   └── SearchBar.tsx   # Search input component
├── pages/              # Page components
│   ├── Library.tsx     # Main library page
│   ├── SearchPage.tsx  # Search results page
│   ├── BookmarksPage.tsx # Bookmarks management
│   ├── ProfilePage.tsx # User profile & stats
│   └── SettingsPage.tsx # App settings
├── context/            # State management
│   └── AppContext.tsx  # Global app state
├── data/               # Mock data & types
│   └── mockBooks.ts    # Sample book data
├── types/              # TypeScript definitions
│   └── index.ts        # Type definitions
└── App.tsx             # Root component
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```bash
VITE_APP_NAME=BookVault
VITE_APP_VERSION=1.0.0
```

### Customization
- **Theme Colors**: Modify `tailwind.config.js` for custom color schemes
- **Fonts**: Update font families in reading settings
- **Book Data**: Replace mock data in `src/data/mockBooks.ts`

## 🧪 Testing

```bash
# Unit tests (when implemented)
npm run test

# E2E tests (when implemented)
npm run test:e2e
```

## 🚀 Deployment

### Netlify
```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
# or connect your GitHub repository to Netlify for automatic deployments
```

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts to configure your deployment
```

### GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "gh-pages -d dist"

# Deploy
npm run build && npm run deploy
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and conventions
- Write meaningful commit messages
- Add comments for complex logic
- Ensure responsive design compatibility
- Test across different browsers and devices

### Code Style
- Use TypeScript for all new files
- Follow React hooks best practices
- Maintain component modularity
- Use Tailwind CSS utility classes
- Implement proper error handling

## 📝 Roadmap

- [ ] **PDF/EPUB Support**: Real document parsing and rendering
- [ ] **Cloud Sync**: Sync reading progress across devices
- [ ] **Social Features**: Book recommendations and sharing
- [ ] **Offline Reading**: PWA capabilities for offline access
- [ ] **Audio Support**: Text-to-speech functionality
- [ ] **Advanced Search**: Full-text search within books
- [ ] **Library Import**: Import books from various sources
- [ ] **Reading Analytics**: Detailed reading insights and statistics

## 🐛 Known Issues

- Search functionality is currently limited to metadata (title, author, description)
- Page turning simulation (actual content pagination not implemented)
- Mock authentication system (replace with real authentication)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern eReader applications and Apple's design principles
- **Icons**: [Lucide React](https://lucide.dev/) for beautiful, consistent icons
- **Images**: [Pexels](https://pexels.com/) for high-quality stock photos
- **Typography**: System fonts and web-safe font stacks for optimal performance

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/bookvault/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information including:
   - Browser and version
   - Operating system
   - Steps to reproduce the issue
   - Expected vs actual behavior

---

**Made with ❤️ by [Your Name]**

*Enjoy your reading journey with BookVault!* 📖✨
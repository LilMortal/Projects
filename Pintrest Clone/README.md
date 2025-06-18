# Aesthetic Pinterest Clone App

A beautifully designed, fully functional Pinterest clone built with modern web technologies. Features a responsive masonry layout, smooth animations, dark mode support, and comprehensive user functionality.

## ✨ Features

### 👤 User Authentication
- **Sign up/Log in** with email and password
- **Profile management** with avatar, bio, and user stats
- **Persistent sessions** with secure authentication
- **Demo account** available for testing

### 🏠 Home Feed
- **Masonry-style grid layout** that adapts to all screen sizes
- **Infinite scroll** for seamless content discovery
- **Lazy loading images** for optimal performance
- **Smooth hover effects** with action buttons

### 📌 Pin Creation
- **Image upload** via drag-and-drop or file picker
- **URL-based image** addition support
- **Rich pin details** including title, description, and destination links
- **Board organization** for pin categorization
- **Form validation** with real-time feedback

### 📂 Board Management
- **Create and organize** personal boards
- **Public/private** board visibility options
- **Pin management** within boards
- **Visual board covers** and pin counts

### 🔍 Search & Discovery
- **Global search** across pins, users, and boards
- **Real-time search** with responsive results
- **Category filtering** and tag-based organization
- **Related pins** suggestions

### 👥 Social Features
- **Like and save** pins with instant feedback
- **Follow/unfollow** users and track relationships
- **Comments system** with threaded discussions
- **Share functionality** with native web sharing

### 🎨 Design & UX
- **Pinterest-inspired** color scheme with signature red (#E60023)
- **Light/dark mode** toggle with system preference detection
- **Smooth animations** and micro-interactions
- **Mobile-first** responsive design
- **Accessibility features** with proper ARIA labels

### 🛡️ Error Handling
- **Comprehensive validation** using Zod schemas
- **Graceful error states** with user-friendly messages
- **Loading indicators** for async operations
- **Offline support** with cached content

## 🌐 Live Demo

[View Live Demo](https://your-demo-url.com) *(placeholder)*

## ⚙️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom theme
- **State Management**: Zustand for global state
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router DOM
- **UI Components**: Custom components with Lucide React icons
- **Build Tool**: Vite for fast development and building
- **Type Safety**: Full TypeScript implementation

## 🧑‍💻 Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Git for version control

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/aesthetic-pinterest-clone.git
cd aesthetic-pinterest-clone
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🗂️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── layout/          # Header, navigation components
│   ├── pins/            # Pin-related components
│   └── modals/          # Modal dialogs
├── store/               # Zustand state management
├── hooks/               # Custom React hooks
├── data/                # Mock data and API utilities
├── types/               # TypeScript type definitions
└── App.tsx              # Main application component
```

## 🎨 Theme & Design

### Color Palette
- **Primary**: #E60023 (Pinterest Red)
- **Secondary**: #F9FAFB (Light Gray)
- **Background**: #FFFFFF (Light) / #121212 (Dark)
- **Accent Colors**: Success, warning, and error states

### Typography
- **Font Family**: System font stack for optimal performance
- **Font Weights**: Regular (400), Medium (500), Bold (700)
- **Line Heights**: 150% for body text, 120% for headings

### Layout System
- **8px spacing** system for consistent alignment
- **Responsive breakpoints**: Mobile (< 768px), Tablet (768-1024px), Desktop (> 1024px)
- **Masonry grid**: 1-5 columns based on screen size

## 🖼 Screenshots

### Home Feed
![Home Feed](screenshots/home-feed.png) *(placeholder)*

### Pin Details
![Pin Details](screenshots/pin-details.png) *(placeholder)*

### Create Pin
![Create Pin](screenshots/create-pin.png) *(placeholder)*

### Dark Mode
![Dark Mode](screenshots/dark-mode.png) *(placeholder)*

## 🚀 Deployment Guide

### Deploy to Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Deploy** with automatic deployments on push

### Deploy to Netlify

1. **Build the project**
```bash
npm run build
```

2. **Deploy the `dist` folder** to Netlify
3. **Configure redirects** for SPA routing

### Environment Variables

```env
VITE_API_URL=your_api_url
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

## 🧪 Testing

Run the development server and test the following:

- **Authentication flow** (sign up, log in, log out)
- **Pin interactions** (like, save, share)
- **Responsive design** across different screen sizes
- **Dark mode toggle** functionality
- **Form validation** with edge cases
- **Infinite scroll** behavior

## 📋 Development Roadmap

- [ ] Real backend integration with Supabase
- [ ] Image optimization and CDN integration
- [ ] Advanced search filters and sorting
- [ ] User profile pages with portfolio view
- [ ] Board collaboration features
- [ ] Push notifications for interactions
- [ ] PWA support with offline functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Pinterest** for design inspiration
- **Pexels** for high-quality stock photos
- **Lucide** for beautiful icons
- **Tailwind CSS** for utility-first styling
- **React community** for excellent tooling and libraries

---

Built with ❤️ using modern web technologies. Perfect for learning React patterns, state management, and responsive design principles.
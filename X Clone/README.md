# 🐦 Chirp - Modern Twitter Clone

Chirp is a beautiful, modern social media platform inspired by Twitter/X, built with React, TypeScript, and Tailwind CSS. Experience seamless social interactions with a clean, light-themed interface designed for optimal user engagement.

![Chirp Preview](https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## ✨ Features

### 🧵 **Social Interactions**
- **Home Feed**: Real-time chronological timeline of chirps
- **Compose Chirps**: Create posts with text and optional images
- **Engagement**: Like, rechirp (retweet), and comment on posts
- **User Profiles**: Comprehensive profile pages with bio and chirp history
- **Follow System**: Follow/unfollow users to curate your feed

### 🔍 **Discovery**
- **Explore Page**: Discover trending chirps and suggested users
- **User Suggestions**: Smart recommendations for new people to follow
- **Trending Content**: Algorithm-based trending chirp discovery

### 📱 **User Experience**
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Light Theme Only**: Beautiful, accessible light color scheme
- **Smooth Animations**: Elegant transitions and micro-interactions
- **Mobile Navigation**: Fixed bottom navigation for mobile users
- **Real-time Updates**: Instant feedback on all interactions

### 💾 **Data Persistence**
- **Local Storage**: All data persists across browser sessions
- **Mock Data**: Pre-populated with realistic sample content
- **User Management**: Complete user profile and relationship management

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chirp-twitter-clone
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
   Navigate to `http://localhost:5173`

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern React with hooks and context
- **TypeScript** - Type-safe development
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first styling with custom theme

### **Development**
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing

### **State Management**
- **React Context API** - Global state management
- **Local Storage Hook** - Persistent data storage

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Layout.tsx       # Main layout wrapper
│   ├── Header.tsx       # Desktop navigation header
│   ├── BottomNav.tsx    # Mobile bottom navigation
│   ├── ChirpComposer.tsx # Tweet composition form
│   ├── ChirpCard.tsx    # Individual chirp display
│   └── UserCard.tsx     # User profile card
├── pages/               # Main application pages
│   ├── Home.tsx         # Home feed timeline
│   ├── Explore.tsx      # Discovery and trending
│   └── Profile.tsx      # User profile pages
├── context/             # Global state management
│   └── ChirpContext.tsx # Social media data and actions
├── hooks/               # Custom React hooks
│   └── useLocalStorage.ts # Persistent storage hook
├── types/               # TypeScript definitions
│   └── chirp.ts         # Social media interfaces
├── data/                # Mock data and content
│   └── mockData.ts      # Sample users and chirps
└── App.tsx              # Main application component
```

## 🎯 Key Features Explained

### **Chirp Composer**
- **Rich Text Input**: Multi-line text composition with character counter
- **Image Support**: Add images via URL input
- **Real-time Validation**: Character limit enforcement and visual feedback
- **Instant Publishing**: Immediate chirp creation and timeline updates

### **Social Interactions**
- **Like System**: Heart-based appreciation with visual feedback
- **Rechirp Feature**: Share others' content with attribution
- **Comment Threads**: Nested conversation support
- **User Following**: Build personalized social networks

### **Responsive Navigation**
- **Desktop Header**: Fixed top navigation with brand and main links
- **Mobile Bottom Nav**: Touch-friendly bottom navigation bar
- **Active States**: Clear visual indication of current page
- **User Avatar**: Quick access to profile from navigation

### **Profile Management**
- **Rich Profiles**: Display name, username, bio, and join date
- **Verification Badges**: Visual trust indicators for verified users
- **Follow Statistics**: Follower and following counts
- **Personal Timeline**: User-specific chirp history

## 🎨 Design System

### **Color Palette**
- **Primary (Sky)**: Main brand color and primary actions
- **Secondary (Violet)**: Secondary actions and accents
- **Accent (Emerald)**: Success states and positive feedback
- **Supporting Colors**: Rose, Amber for various UI states

### **Typography**
- **Font Family**: Inter (clean, modern, highly readable)
- **Hierarchy**: Clear font sizes and weights for content organization
- **Line Height**: Optimized for readability (relaxed spacing)

### **Layout Principles**
- **Card-Based Design**: Consistent card components with soft shadows
- **Generous Spacing**: Comfortable white space for visual breathing room
- **Rounded Corners**: Friendly, modern aesthetic throughout
- **Gradient Accents**: Subtle gradients for visual interest

## 🔧 Configuration

### **Tailwind Customization**
The app uses an extensive Tailwind configuration with:
- Custom color palettes for brand consistency
- Extended animations and transitions
- Custom box shadows and gradients
- Responsive breakpoint system

### **TypeScript Configuration**
- Strict type checking enabled
- Modern ES2020 target
- Optimized for React development

## 📦 Build & Deployment

### **Development Build**
```bash
npm run dev
```

### **Production Build**
```bash
npm run build
```

### **Preview Production Build**
```bash
npm run preview
```

### **Linting**
```bash
npm run lint
```

## 🌟 Features in Detail

### **Home Feed**
- Chronological timeline of all chirps
- Real-time updates when new chirps are posted
- Infinite scroll-ready architecture
- Engagement metrics display

### **Explore Page**
- Trending chirps based on engagement
- User discovery and suggestions
- Algorithmic content curation
- Social network expansion tools

### **User Profiles**
- Comprehensive user information display
- Personal chirp timeline
- Follow/unfollow functionality
- Social statistics and verification status

### **Chirp Interactions**
- Like/unlike with visual feedback
- Rechirp with attribution
- Comment threads with nested replies
- Share functionality (UI ready)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Images**: High-quality photos from [Pexels](https://pexels.com)
- **Icons**: Beautiful icons from [Lucide React](https://lucide.dev)
- **Fonts**: Inter font family from [Google Fonts](https://fonts.google.com)
- **Inspiration**: Twitter/X and modern social media platforms

---

**Built with ❤️ by the Chirp team**

Connect, share, and discover with Chirp - where every voice matters! 🐦✨
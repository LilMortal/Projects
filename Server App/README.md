# WaveSpace 🌊

A modern, minimal workspace communication app inspired by Discord and Notion. Built with React, TypeScript, and Tailwind CSS.

![WaveSpace Preview](https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## ✨ Features

### Core Functionality
- **Multiple Workspaces**: Organize teams into different servers/workspaces
- **Channel Management**: Create, organize, and delete text channels within each workspace
- **Real-time Messaging**: Send and receive messages with timestamps
- **Message Management**: Delete your own messages
- **User Avatars**: Beautiful avatar system with user initials and status indicators
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### User Experience
- **Intuitive Navigation**: Easy switching between workspaces and channels
- **Clean Interface**: Minimal, uncluttered design with thoughtful spacing
- **Smooth Animations**: Subtle hover effects and transitions
- **Local Persistence**: Data saved to localStorage for persistent sessions
- **Status Indicators**: Online, away, and offline status for team members

## 🎨 Design Philosophy

WaveSpace follows a **light, minimal aesthetic** with:
- Custom pastel color palette (soft blues, greens, warm neutrals)
- Rounded UI elements with subtle shadows
- Clean typography with proper hierarchy
- Intentional white space for reduced cognitive load
- Smooth micro-interactions and hover states

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wavespace.git
   cd wavespace
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

### Build for Production

```bash
npm run build
npm run preview
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom color palette
- **Routing**: React Router DOM
- **State Management**: React Context API with local storage persistence
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Development**: ESLint for code quality

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (single panel view)
- **Tablet**: 768px - 1024px (two panel view)
- **Desktop**: > 1024px (full three panel view)

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Avatar.tsx      # User avatar component
│   ├── ChannelList.tsx # Channel sidebar
│   ├── Layout.tsx      # Main layout wrapper
│   ├── MessageInput.tsx# Message input component
│   ├── MessagePanel.tsx# Main chat area
│   └── ServerList.tsx  # Server/workspace sidebar
├── contexts/           # React contexts
│   └── AppContext.tsx  # Global app state
├── data/              # Mock data
│   └── mockData.ts    # Sample servers and messages
├── types/             # TypeScript interfaces
│   └── index.ts       # Type definitions
├── App.tsx            # Main app component
├── main.tsx          # App entry point
└── index.css         # Global styles
```

## 🎯 Key Features Explained

### Workspace Management
- Switch between different teams/projects
- Each workspace has its own channels and members
- Visual server icons with hover effects

### Channel System
- Create new channels with names and descriptions
- Delete channels (with protection for the last channel)
- Real-time channel switching

### Messaging System
- Send messages with automatic timestamps
- Message grouping by date
- Delete your own messages
- Automatic scroll to latest messages

### Data Persistence
- All data stored in localStorage
- Automatic save on state changes
- Preserves user session across browser restarts

## 🎨 Customization

### Color Palette
The app uses a custom Tailwind color palette defined in `tailwind.config.js`:

- **Primary**: Soft blues for main actions and highlights
- **Secondary**: Fresh greens for success states and accents  
- **Accent**: Warm oranges for notifications and warnings
- **Neutral**: Comprehensive grayscale for text and backgrounds

### Adding New Features

1. **New Components**: Add to `src/components/`
2. **State Management**: Extend `AppContext.tsx`
3. **Types**: Update `src/types/index.ts`
4. **Styling**: Use Tailwind classes with custom color palette

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from Discord and Notion
- Icons by [Lucide](https://lucide.dev/)
- Typography by [Inter](https://rsms.me/inter/)
- Stock photos from [Pexels](https://pexels.com/)

---

**Built with ❤️ for modern team communication**

For questions or support, please open an issue on GitHub.
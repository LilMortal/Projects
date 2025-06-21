# ActivityFlow - Modern User Activity Tracker

A beautiful, responsive, and feature-rich activity tracking application built with React, TypeScript, and modern web technologies. Track your daily activities, visualize your productivity patterns, and gain insights into how you spend your time.

![ActivityFlow Dashboard](https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## 🌟 Features

### Core Functionality
- **Activity Logging**: Track different types of activities (work, exercise, study, break, personal, meeting)
- **Comprehensive Data**: Record title, type, duration, date, tags, and optional descriptions
- **Smart Dashboard**: View summary statistics with visual analytics
- **Activity Management**: Edit, delete, and organize your activities
- **Advanced Filtering**: Filter by date range, activity type, tags, and search terms
- **Flexible Sorting**: Sort by recency, duration, or activity type

### Visual Analytics
- **Interactive Charts**: Beautiful bar charts and pie charts for data visualization
- **Time Distribution**: See how your time is allocated across different activities
- **Activity Trends**: Track patterns and trends over time
- **Statistics Cards**: Quick overview of total time, activity count, and averages

### Design & UX
- **Modern Aesthetics**: Soft pastel colors with glassmorphism effects
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Intuitive Interface**: Clean, minimalist design with excellent usability

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/activityflow.git
   cd activityflow
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
   Navigate to `http://localhost:5173` to see the application

### Building for Production

```bash
npm run build
npm run preview
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion
- **State Management**: Zustand with persistence
- **Charts**: Recharts for data visualization
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Code Quality**: ESLint + TypeScript

## 📱 Screenshots

### Dashboard View
![Dashboard](https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)
*Clean dashboard with statistics cards and interactive charts*

### Activity List
![Activity List](https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)
*Organized activity cards with filtering and search capabilities*

### Activity Form
![Activity Form](https://images.pexels.com/photos/3184640/pexels-photo-3184640.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)
*Intuitive form for adding and editing activities*

## 🎨 Design Philosophy

ActivityFlow embraces a **modern, soft, and minimalist** design approach:

- **Glassmorphism Effects**: Subtle transparency and backdrop blur for depth
- **Soft Color Palette**: Carefully chosen pastel colors for visual comfort
- **Smooth Animations**: Subtle transitions that enhance user experience
- **Typography**: Inter font family for excellent readability
- **Responsive Grid**: Flexible layouts that adapt to any screen size
- **Micro-interactions**: Thoughtful hover states and button animations

## 📊 Data Storage

- **Local Storage**: All data is stored locally in your browser
- **Persistent State**: Activities and preferences are automatically saved
- **Export Capability**: Built-in CSV export functionality (future feature)
- **No Backend Required**: Runs entirely in the browser

## 🔧 Customization

### Adding New Activity Types
Edit `src/types/activity.ts` to add new activity types:

```typescript
export type ActivityType = 'work' | 'exercise' | 'study' | 'break' | 'personal' | 'meeting' | 'your-new-type';
```

### Customizing Colors
Modify `tailwind.config.js` to adjust the color scheme:

```javascript
colors: {
  primary: {
    // Your custom primary colors
  },
  // ... other color definitions
}
```

### Adding New Chart Types
Create new chart components in `src/components/Dashboard/` using Recharts.

## 🚀 Future Enhancements

### Planned Features
- **Data Export**: CSV and JSON export functionality
- **Streak Tracking**: Daily and weekly activity streaks
- **Goal Setting**: Set and track activity goals
- **Time Blocking**: Calendar integration for time blocking
- **Team Features**: Share activities with team members
- **Mobile App**: React Native version for iOS and Android

### Backend Integration
- **Cloud Sync**: Synchronize data across devices
- **User Authentication**: Secure user accounts
- **Data Analytics**: Advanced analytics and insights
- **API Integration**: Connect with other productivity tools

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow the existing code style
4. **Add tests**: Ensure your changes are well tested
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use semantic commit messages
- Add JSDoc comments for complex functions
- Ensure responsive design works across devices
- Test thoroughly before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern productivity apps and design systems
- **Icons**: [Lucide React](https://lucide.dev/) for beautiful, consistent icons
- **Charts**: [Recharts](https://recharts.org/) for powerful data visualization
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for smooth animations
- **Images**: [Pexels](https://www.pexels.com/) for high-quality stock photos

## 📞 Support

If you encounter any issues or have questions:

1. **Check the documentation** in this README
2. **Search existing issues** in the GitHub repository
3. **Create a new issue** with detailed information
4. **Join our community** discussions

---

**Built with ❤️ by the ActivityFlow team**

*Track your time, enhance your productivity, achieve your goals.*
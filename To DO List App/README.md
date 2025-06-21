# TaskFlow - Beautiful Todo List App

A modern, feature-rich todo list application built with React, TypeScript, and Tailwind CSS. TaskFlow combines elegant design with powerful functionality to help you stay organized and productive.

![TaskFlow Screenshot](https://images.pexels.com/photos/4475524/pexels-photo-4475524.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## ✨ Features

### Core Functionality
- **Task Management**: Create, edit, delete, and toggle task completion
- **Rich Task Details**: Add titles, descriptions, due dates, and priority levels
- **Advanced Filtering**: Filter tasks by status (all/completed/incomplete), priority level, and custom tags
- **Flexible Sorting**: Sort by creation date, due date, priority, or alphabetically
- **Tag System**: Organize tasks with custom tags and labels
- **Data Persistence**: All tasks are automatically saved to localStorage

### User Experience
- **Beautiful UI**: Clean, modern design with soft gradients and smooth animations
- **Dark/Light Mode**: Toggle between themes with automatic preference saving
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Task Statistics**: Real-time overview of total, completed, and high-priority tasks
- **Smart Date Handling**: Intelligent date formatting and overdue task highlighting
- **Quick Actions**: Bulk operations like clearing completed tasks

### Visual Design
- **Soft Pastel Theme**: Calming color palette with gradient backgrounds
- **Micro-interactions**: Smooth hover effects, transitions, and animations
- **Typography**: Clean Inter font for excellent readability
- **Card-based Layout**: Organized content in elegant rounded cards
- **Contextual Colors**: Priority-based color coding and status indicators

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🛠️ Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom theme configuration
- **Icons**: Lucide React icon library
- **Build Tool**: Vite for fast development and building
- **State Management**: Custom React hooks with localStorage persistence
- **Development Tools**: ESLint, TypeScript compiler, PostCSS

## 📱 Usage Guide

### Creating Tasks
1. Click the "Add Task" button in the header
2. Fill in the task details:
   - **Title**: Required field for the task name
   - **Description**: Optional detailed description
   - **Due Date**: Optional deadline
   - **Priority**: Choose from Low, Medium, or High
   - **Tags**: Add custom tags for organization

### Managing Tasks
- **Complete**: Click the circle icon to mark tasks as done
- **Edit**: Click the edit icon when hovering over a task
- **Delete**: Click the trash icon (requires confirmation)
- **Filter**: Use the filter bar to show specific task types
- **Sort**: Organize tasks by different criteria

### Keyboard Shortcuts
- **Enter**: Submit forms and add tags
- **Escape**: Close modals and forms

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── FilterBar.tsx   # Filtering and sorting controls
│   ├── TaskForm.tsx    # Task creation/editing form
│   ├── TaskItem.tsx    # Individual task display
│   ├── TaskList.tsx    # Task list container
│   └── ThemeToggle.tsx # Dark/light mode switcher
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.ts # localStorage abstraction
│   └── useTasks.ts     # Task management logic
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared interfaces and enums
├── utils/              # Utility functions
│   └── taskUtils.ts    # Task filtering, sorting, and formatting
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎨 Customization

### Themes
The application supports custom theming through Tailwind CSS. You can modify the color palette in `tailwind.config.js`:

```javascript
colors: {
  primary: { /* Custom primary colors */ },
  secondary: { /* Custom secondary colors */ },
}
```

### Adding New Features
The modular architecture makes it easy to extend functionality:

1. **New Task Properties**: Update the `Task` interface in `src/types/index.ts`
2. **Custom Filters**: Extend the filtering logic in `src/utils/taskUtils.ts`
3. **UI Components**: Add new components following the existing patterns

## 🔮 Future Enhancements

- **User Authentication**: Multi-user support with cloud sync
- **Team Collaboration**: Shared task lists and assignments
- **Notifications**: Browser notifications for due dates
- **Import/Export**: Backup and restore functionality
- **Advanced Analytics**: Productivity insights and trends
- **Mobile App**: Native iOS and Android applications
- **Integrations**: Calendar sync and third-party service connections

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- **Icons**: [Lucide React](https://lucide.dev/) for beautiful, consistent icons
- **Fonts**: [Inter](https://rsms.me/inter/) for excellent typography
- **Images**: [Pexels](https://pexels.com/) for high-quality stock photos
- **Inspiration**: Modern productivity apps and design systems

## 📞 Support

If you have any questions or run into issues, please:

1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Reach out via the project's discussion board

---

**Made with ❤️ using React, TypeScript, and Tailwind CSS**

Enjoy staying organized with TaskFlow! 🚀
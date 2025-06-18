# 📁 FileShare - Aesthetic File Sharing App

A beautiful, secure, and feature-rich file sharing application built with modern web technologies. Upload, share, and manage your files with advanced security features and elegant design.

![FileShare Banner](https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1200&h=300&fit=crop)

## 🌟 Key Features

- **🔐 Secure Authentication** - Email/password login with password reset functionality
- **📤 Advanced File Upload** - Drag-and-drop interface with progress tracking and validation
- **🗂️ File Management** - Comprehensive dashboard with search, sort, and filtering options
- **🔗 Smart Sharing** - Generate secure links with optional password protection and expiry dates
- **📊 Analytics Dashboard** - Track downloads, view statistics, and monitor file performance
- **🎨 Beautiful UI/UX** - Modern design with dark mode support and smooth animations
- **📱 Responsive Design** - Optimized for all devices from mobile to desktop
- **⚡ Real-time Updates** - Live progress tracking and instant feedback

## 🌐 Live Demo

[View Live Demo](https://your-demo-link.com) *(placeholder)*

## ⚙️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **Zustand** - Lightweight state management

### Form & Validation
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation

### UI Components & Icons
- **Lucide React** - Beautiful SVG icons
- **React Hot Toast** - Elegant toast notifications
- **React Dropzone** - File upload functionality

### Utilities
- **QRCode.js** - QR code generation
- **date-fns** - Modern date utility library
- **copy-to-clipboard** - Clipboard functionality

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fileshare-app.git
   cd fileshare-app
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
   Navigate to `http://localhost:5173` to see the app in action.

### Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🧪 Testing

```bash
# Run linting
npm run lint

# Run tests (when implemented)
npm test
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Auth/            # Authentication components
│   ├── Dashboard/       # File management components
│   ├── Layout/          # Layout components
│   ├── Share/           # File sharing components
│   ├── Upload/          # File upload components
│   └── ErrorBoundary.tsx
├── stores/              # Zustand state stores
│   ├── authStore.ts     # Authentication state
│   ├── fileStore.ts     # File management state
│   └── themeStore.ts    # Theme state
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
│   ├── formatBytes.ts   # File size formatting
│   └── qrCode.ts        # QR code generation
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## 🖼️ Screenshots

### Authentication
![Login Screen](https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)

### File Dashboard
![Dashboard](https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)

### File Upload
![Upload Interface](https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)

### Analytics
![Analytics Dashboard](https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to Netlify via their web interface or CLI.

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🎨 Customization

### Theme Colors

The app uses a custom color palette defined in `tailwind.config.js`:

- **Primary**: Indigo (#6366F1)
- **Accent**: Emerald (#10B981)
- **Background**: Light Gray (#F9FAFB) / Dark Slate (#0F172A)

### Adding New Features

1. **Create new components** in the appropriate directory
2. **Add state management** using Zustand stores
3. **Update routing** in `App.tsx` if needed
4. **Add proper TypeScript types** in `src/types/`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and patterns
- Add TypeScript types for all new code
- Include proper error handling
- Test your changes thoroughly
- Update documentation as needed

## 📝 Environment Variables

Create a `.env` file in the root directory for environment-specific settings:

```env
# API Configuration
VITE_API_URL=your_api_url
VITE_STORAGE_BUCKET=your_storage_bucket

# Authentication
VITE_JWT_SECRET=your_jwt_secret

# File Upload
VITE_MAX_FILE_SIZE=104857600  # 100MB
```

## 🔒 Security Features

- **File Validation** - Client and server-side validation
- **Password Protection** - Optional password protection for shared files
- **Expiry Dates** - Automatic file expiration
- **Download Limits** - Control access with download limits
- **Secure Links** - Unique, non-guessable share URLs
- **Error Boundaries** - Graceful error handling

## 📈 Performance

- **Code Splitting** - Lazy loading for optimal performance
- **Image Optimization** - Efficient loading and caching
- **Bundle Analysis** - Optimized build size
- **Responsive Images** - Adaptive images for different devices

## 🐛 Known Issues & Roadmap

### Current Limitations
- File storage is currently mocked (integration with real storage pending)
- Authentication is simulated (backend integration needed)

### Upcoming Features
- [ ] Real backend integration with Supabase/Firebase
- [ ] File preview functionality
- [ ] Bulk operations (select multiple files)
- [ ] Team collaboration features
- [ ] API documentation
- [ ] Mobile app development

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Lead Developer** - [Your Name](https://github.com/yourusername)
- **UI/UX Designer** - [Designer Name](https://github.com/designer)

## 🙏 Acknowledgments

- [Pexels](https://pexels.com) for beautiful stock photos
- [Lucide](https://lucide.dev) for the amazing icon set
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Framer Motion](https://framer.com/motion) for smooth animations

## 📞 Support

If you encounter any issues or have questions:

- **Create an issue** on GitHub
- **Email**: support@fileshare.com
- **Documentation**: [docs.fileshare.com](https://docs.fileshare.com)

---

**Built with ❤️ using modern web technologies**

*FileShare - Making file sharing beautiful, secure, and simple.*
# YumBasket 🍽️

YumBasket is a modern, responsive food ordering application built with React and TypeScript. Designed with a beautiful custom light theme, it provides an intuitive and delightful user experience for browsing menus, managing cart items, and placing orders.

---

## 🚀 Features

### Core Functionality
- **🏠 Homepage**: Hero section with restaurant information and featured categories
- **📋 Menu Display**: Organized food categories with detailed item cards
- **🔍 Real-time Search**: Filter menu items by name, description, or ingredients
- **🧾 Dish Details**: Modal view with ingredients, ratings, and preparation time
- **🛒 Shopping Cart**: Persistent cart with quantity management
- **🧾 Checkout Flow**: Customer information form with order summary
- **✅ Order Confirmation**: Order tracking with status updates
- **📱 Order History**: View past orders and reorder functionality

### User Experience
- **Responsive Design**: Mobile-first approach with perfect tablet and desktop layouts
- **Smooth Animations**: Micro-interactions and transitions throughout
- **Real-time Updates**: Live cart updates and order status tracking
- **Intuitive Navigation**: Clean routing between all sections
- **Search & Filter**: Category filtering with live search functionality

---

## 🎨 Design System

### Color Palette
- **Primary**: Orange (#f97316) - Warm, appetizing orange for main actions
- **Secondary**: Green (#22c55e) - Fresh green for success states
- **Accent**: Yellow (#eab308) - Bright yellow for highlights
- **Neutrals**: Carefully crafted gray scale for text and backgrounds

### Typography
- **Font**: Inter - Clean, modern sans-serif for excellent readability
- **Hierarchy**: Consistent scale from headings to body text
- **Weights**: 300, 400, 500, 600, 700 for proper emphasis

### UI Elements
- **Rounded Corners**: Soft, modern feel with consistent border radius
- **Shadows**: Layered shadow system (soft, medium, strong)
- **Spacing**: 8px grid system for consistent layouts
- **Animations**: Smooth transitions with meaningful motion

---

## 🧰 Tech Stack

### Frontend
- **React 18**: Latest React with hooks and concurrent features
- **TypeScript**: Full type safety throughout the application
- **React Router**: Client-side routing for seamless navigation
- **Zustand**: Lightweight state management for cart, menu, and orders

### Styling
- **TailwindCSS**: Utility-first CSS with custom design system
- **Custom Theme**: Fully customized light theme with consistent colors
- **Responsive Design**: Mobile-first approach with perfect breakpoints

### Development Tools
- **Vite**: Fast build tool with hot module replacement
- **ESLint**: Code quality and consistency enforcement
- **TypeScript**: Static typing for better developer experience

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/yumbasket.git
cd yumbasket

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Build for Production
```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Cart/            # Cart-related components
│   ├── Layout/          # Header, Footer, Navigation
│   ├── Menu/            # Menu display and filtering
│   └── UI/              # Base UI components (Button, Modal, etc.)
├── data/                # Mock data and constants
├── pages/               # Route components
├── store/               # Zustand stores for state management
├── types/               # TypeScript type definitions
└── utils/               # Helper functions and utilities
```

---

## 🎯 Key Features Explained

### State Management
- **Cart Store**: Manages cart items, quantities, and totals
- **Menu Store**: Handles menu items, categories, and filtering
- **Order Store**: Tracks order history and status updates

### Responsive Design
- **Mobile**: Optimized touch interfaces and navigation
- **Tablet**: Balanced layouts with proper spacing
- **Desktop**: Full-width layouts with optimal content density

### User Experience
- **Smooth Animations**: All interactions have delightful micro-animations
- **Loading States**: Proper feedback during async operations
- **Error Handling**: Graceful error states and fallbacks
- **Accessibility**: Keyboard navigation and screen reader support

---

## 🌟 Component Highlights

### MenuItemCard
- Beautiful food photography with overlay badges
- Hover effects and smooth transitions
- Quick add-to-cart functionality
- Rating and preparation time display

### CartSidebar
- Slide-in panel with smooth animations
- Quantity controls with instant updates
- Real-time total calculations
- Empty state with call-to-action

### Checkout Flow
- Clean form design with proper validation
- Order summary with item details
- Responsive layout for all screen sizes
- Smooth submission with loading states

---

## 🔄 Order Flow

1. **Browse Menu**: Users explore categories and search for items
2. **Add to Cart**: Items are added with quantity selection
3. **Review Cart**: Cart sidebar shows all items and totals
4. **Checkout**: User provides delivery information
5. **Confirmation**: Order is confirmed with tracking details
6. **Order History**: Users can view past orders and reorder

---

## 🎨 Design Philosophy

YumBasket follows modern design principles:

- **Minimalism**: Clean layouts with purposeful whitespace
- **Consistency**: Unified design language throughout
- **Accessibility**: WCAG-compliant color contrasts and navigation
- **Performance**: Optimized images and smooth interactions
- **Mobile-First**: Designed for touch interfaces, enhanced for desktop

---

## 📱 Mobile Experience

- **Touch-Friendly**: Large tap targets and intuitive gestures
- **Fast Loading**: Optimized images and code splitting
- **Offline Support**: Graceful handling of network issues
- **PWA Ready**: Service worker and manifest for app-like experience

---

## 🚀 Performance Optimizations

- **Image Optimization**: WebP format with proper sizing
- **Code Splitting**: Route-based lazy loading
- **State Optimization**: Efficient re-renders with Zustand
- **Bundle Optimization**: Tree shaking and minification

---

## 🛠️ Development Guidelines

### Code Style
- **TypeScript**: Strict typing for all components and functions
- **ESLint**: Enforced code quality rules
- **Component Structure**: Consistent patterns for props and state
- **File Organization**: Clear separation of concerns

### Testing Strategy
- **Unit Tests**: Component and utility function testing
- **Integration Tests**: User flow testing
- **E2E Tests**: Complete user journey validation

---

## 🌍 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+
- **Progressive Enhancement**: Graceful degradation for older browsers

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on:

- Code of conduct
- Development process
- Pull request guidelines
- Bug reporting

---

## 📞 Support

For support and questions:
- 📧 Email: support@yumbasket.com
- 💬 Issues: GitHub Issues page
- 📚 Documentation: In-code comments and README

---

**Made with ❤️ for food lovers everywhere!** 🍕🍔🍰
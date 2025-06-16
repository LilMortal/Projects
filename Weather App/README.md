# Modern Weather App

A beautiful, responsive weather application built with React, TypeScript, and Tailwind CSS. Get real-time weather information with stunning visuals that adapt to current weather conditions.

![Weather App Screenshot](https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## ✨ Features

### Core Weather Features
- **Real-time Weather Data**: Current temperature, humidity, wind speed, pressure, and visibility
- **Location-based Weather**: Automatic detection using geolocation API
- **City Search**: Search for weather in any city worldwide
- **Temperature Units**: Toggle between Celsius and Fahrenheit
- **24-Hour Forecast**: Detailed hourly weather predictions
- **7-Day Forecast**: Weekly weather outlook with high/low temperatures
- **Weather Icons**: Beautiful weather condition icons from OpenWeatherMap

### User Experience Features
- **Dynamic Backgrounds**: Gradient backgrounds that change based on weather conditions and time of day
- **Smooth Animations**: Elegant transitions and micro-interactions throughout the app
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewing
- **Dark/Light Mode**: Theme toggle for different lighting preferences
- **Offline Caching**: Stores recent weather data in localStorage for offline access
- **Error Handling**: Comprehensive error states with helpful messages and retry options
- **Loading States**: Beautiful loading animations during data fetching

### Technical Features
- **TypeScript**: Full type safety and better developer experience
- **Modular Architecture**: Clean, maintainable code structure with separated components
- **Custom Hooks**: Reusable logic for weather data and geolocation
- **Local Storage**: Persistent user preferences and cached weather data
- **API Error Handling**: Graceful handling of network issues and API limitations

## 🎨 Design Philosophy

The app follows modern design principles with:

- **Glass-morphism Effects**: Subtle backdrop blur and transparency for depth
- **Dynamic Color Palette**: Weather-responsive gradients and color schemes
- **Clean Typography**: Readable fonts with proper hierarchy and spacing
- **Intuitive Navigation**: Clear visual cues and accessible interface elements
- **Micro-interactions**: Hover states, transitions, and feedback animations

### Color System
- **Primary Blues**: Clear sky conditions (`from-blue-400 to-blue-600`)
- **Storm Grays**: Cloudy and stormy weather (`from-gray-700 to-gray-900`)
- **Rain Slates**: Rainy conditions (`from-slate-400 to-slate-600`)
- **Snow Blues**: Winter weather (`from-blue-200 to-blue-400`)
- **Night Purples**: Evening and night themes (`from-indigo-900 to-purple-900`)

## 🛠️ Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **Weather API**: OpenWeatherMap API for reliable weather data
- **Build Tool**: Vite for fast development and optimized builds
- **State Management**: React hooks and custom hook patterns
- **Storage**: Browser localStorage for persistence

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager
- OpenWeatherMap API key (free account required)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd modern-weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Get your OpenWeatherMap API key**
   - Visit [OpenWeatherMap API](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key
   - Add it to your `.env` file:
     ```
     VITE_OPENWEATHER_API_KEY=your_api_key_here
     ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Allow location access for automatic weather detection

## 📱 Usage Guide

### Getting Weather Information
1. **Automatic Location**: Click the location pin icon to use your current location
2. **Manual Search**: Type a city name in the search bar and press Enter
3. **Temperature Toggle**: Click the °C/°F toggle to switch temperature units
4. **Refresh Data**: Use the refresh button to get the latest weather information

### Understanding the Interface
- **Main Weather Card**: Displays current conditions, temperature, and key metrics
- **Hourly Forecast**: Scroll horizontally through the next 24 hours
- **Weekly Forecast**: See the 7-day outlook with precipitation chances
- **Weather Details**: Wind, humidity, pressure, visibility, sunrise, and sunset times

## 🔧 Configuration

### Environment Variables
```bash
VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key
```

### API Rate Limits
- Free tier: 1,000 calls/day, 60 calls/minute
- Weather data updates every 10 minutes
- App includes intelligent caching to minimize API calls

## 🚨 Error Handling

The app gracefully handles various error scenarios:

### Network Issues
- **No Internet**: Shows offline message with cached data when available
- **API Timeout**: Retry mechanism with exponential backoff
- **Rate Limiting**: Clear messaging about API limits

### User Input Errors
- **Invalid City**: "City not found" message with suggestions
- **Empty Search**: Prompts user to enter a city name
- **Special Characters**: Proper encoding of international city names

### Location Services
- **Permission Denied**: Alternative manual search options
- **Location Unavailable**: Fallback to IP-based location
- **GPS Timeout**: Clear timeout messaging with retry option

## 📦 Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview the build**
   ```bash
   npm run preview
   ```

3. **Deploy to your hosting platform**
   - The `dist` folder contains all static assets
   - Configure your hosting to serve `index.html` for all routes

## 🌐 Deployment Options

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add your `VITE_OPENWEATHER_API_KEY` environment variable
3. Deploy automatically on every push

### Netlify
1. Drag and drop the `dist` folder to Netlify
2. Or connect your Git repository for continuous deployment
3. Set environment variables in Netlify dashboard

### GitHub Pages
1. Build the project locally
2. Push the `dist` folder to a `gh-pages` branch
3. Enable GitHub Pages in repository settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenWeatherMap** for providing reliable weather data API
- **Lucide** for beautiful, consistent icons
- **Tailwind CSS** for the utility-first CSS framework
- **Pexels** for high-quality stock photos used in documentation

## 🐛 Bug Reports & Feature Requests

Please use the GitHub Issues tab to report bugs or request new features. When reporting bugs, please include:

- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Console error messages (if any)

## 📊 Performance Notes

- **Initial Load**: ~200KB gzipped (including all assets)
- **API Response Time**: Typically <500ms for weather data
- **Cache Duration**: 10 minutes for weather data, persistent for user preferences
- **Offline Support**: Basic functionality available with cached data

---

**Enjoy using Modern Weather App!** 🌤️

For questions or support, please open an issue on GitHub.
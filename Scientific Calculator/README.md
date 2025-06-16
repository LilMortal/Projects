# Scientific Calculator

A modern, feature-rich scientific calculator built with React, TypeScript, and Tailwind CSS. This calculator provides all the functionality you'd expect from a professional scientific calculator with a beautiful, intuitive user interface.

![Scientific Calculator](https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=800)

## Overview

This scientific calculator application combines powerful mathematical functionality with a sleek, modern design. Built using React with TypeScript for type safety and Tailwind CSS for styling, it offers a responsive interface that works seamlessly across all device types.

The calculator features a sophisticated expression evaluation engine that handles complex mathematical operations, proper operator precedence, and nested parentheses. The UI includes smooth animations, visual feedback, and an intuitive layout that makes advanced calculations feel effortless.

## Features

### Basic Operations
- **Arithmetic Operations**: Addition (+), Subtraction (−), Multiplication (×), Division (÷)
- **Decimal Support**: Full decimal number support with proper formatting
- **Parentheses**: Support for nested parentheses and complex expressions
- **Clear Functions**: Clear last entry (C) and All Clear (AC)

### Advanced Mathematical Functions
- **Trigonometric Functions**: 
  - sin, cos, tan (sine, cosine, tangent)
  - asin, acos, atan (inverse trigonometric functions)
  - Support for both degrees and radians modes
- **Logarithmic Functions**:
  - log (base-10 logarithm)
  - ln (natural logarithm)
  - exp (exponential function)
- **Power and Root Functions**:
  - x² (square)
  - xʸ (power)
  - √ (square root)
- **Special Functions**:
  - x! (factorial)
  - % (percentage)

### Constants
- **π (Pi)**: Mathematical constant pi (3.14159...)
- **e (Euler's Number)**: Mathematical constant e (2.71828...)

### Memory Functions
- **M+**: Add current value to memory
- **M−**: Subtract current value from memory  
- **MR**: Recall value from memory
- **MC**: Clear memory
- **Memory Indicator**: Visual indicator when memory contains a value

### Angle Mode Support
- **Degrees Mode**: Trigonometric calculations in degrees
- **Radians Mode**: Trigonometric calculations in radians
- **Easy Toggle**: One-click switching between modes

### User Interface Features
- **Calculation History**: Shows the last 3 calculations with results
- **Real-time Display**: Live expression building and formatting
- **Error Handling**: Graceful error handling with clear error messages
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Visual Feedback**: Smooth animations and hover effects
- **Accessibility**: Keyboard-friendly interface with proper focus management

## How to Use

### Basic Calculations
1. Click number buttons to enter values
2. Click operation buttons (+, −, ×, ÷) for basic arithmetic
3. Press = to calculate the result
4. Use C to clear the last entry or AC to clear everything

### Scientific Functions
1. **Trigonometric**: Click sin, cos, or tan, then enter a value and close with )
2. **Inverse Trigonometric**: Use asin, acos, atan for inverse functions
3. **Logarithms**: Click log or ln, enter value, and close with )
4. **Powers**: Use x² for squares or xʸ for custom powers
5. **Roots**: Click √, enter value, and close with )

### Using Constants
- Click π to insert pi (3.14159...)
- Click e to insert Euler's number (2.71828...)

### Memory Operations
1. Enter a calculation or result
2. Click M+ to add to memory or M− to subtract from memory
3. Click MR to recall the memory value
4. Click MC to clear memory
5. Memory indicator appears when memory contains a non-zero value

### Angle Mode
- Click the DEG/RAD button in the display area to toggle between degrees and radians
- The current mode is always visible in the display
- Affects all trigonometric function calculations

### Complex Expressions
The calculator supports complex expressions with proper operator precedence:
- `2 + 3 × 4` = 14 (multiplication before addition)
- `(2 + 3) × 4` = 20 (parentheses first)
- `sin(30) + cos(60)` (in degrees mode)
- `ln(e^2)` = 2

## Design and UI Choices

### Visual Design Philosophy
The calculator features a modern **glassmorphism-inspired design** with the following key elements:

- **Dark Theme**: A sophisticated dark color scheme that's easy on the eyes
- **Gradient Backgrounds**: Subtle gradients create depth and visual interest
- **Translucent Elements**: Backdrop blur effects for a modern, layered appearance
- **Color-Coded Buttons**: Different button types use distinct colors for intuitive operation
  - Numbers: Neutral gray tones
  - Operators: Orange gradient
  - Functions: Blue gradient  
  - Memory: Purple gradient
  - Constants: Green gradient
  - Control: Red gradient
  - Equals: Indigo gradient

### User Experience Decisions
- **Responsive Grid Layout**: Buttons automatically adjust to screen size
- **Visual Feedback**: Buttons scale and lift on interaction
- **Smart Display**: Shows calculation history and current expression
- **Error Prevention**: Input validation prevents invalid expressions
- **Progressive Disclosure**: Advanced functions are organized logically
- **Consistent Spacing**: 8px design system for visual harmony

### Accessibility Features
- High contrast color combinations for readability
- Proper focus indicators for keyboard navigation
- Semantic HTML structure for screen readers
- Consistent interaction patterns throughout the interface

## Technical Implementation

### Architecture
The application follows a clean, modular architecture:

```
src/
├── components/
│   ├── Calculator.tsx    # Main calculator logic and state management
│   ├── Display.tsx       # Display component with history
│   └── Button.tsx        # Reusable button component
├── utils/
│   └── calculator.ts     # Mathematical functions and expression evaluation
├── types/
│   └── calculator.ts     # TypeScript type definitions
└── App.tsx              # Main application component
```

### Key Technologies
- **React 18**: Modern React with hooks for state management
- **TypeScript**: Full type safety and enhanced developer experience  
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Vite**: Fast build tool and development server
- **Lucide React**: Beautiful, customizable icons

### Performance Optimizations
- **React.useCallback**: Prevents unnecessary re-renders
- **Efficient State Management**: Minimal state updates and smart batching
- **Expression Evaluation**: Custom parser for safe mathematical evaluation
- **Memory Management**: Limited history storage to prevent memory leaks

## Installation and Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Build for Production

```bash
# Create an optimized production build
npm run build

# Preview the production build locally
npm run preview
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checking

## Dependencies

### Production Dependencies
- **react** (^18.3.1): Core React library
- **react-dom** (^18.3.1): React DOM rendering
- **lucide-react** (^0.344.0): Icon library

### Development Dependencies
- **@vitejs/plugin-react** (^4.3.1): Vite React plugin
- **typescript** (^5.5.3): TypeScript compiler
- **tailwindcss** (^3.4.1): CSS framework
- **eslint**: Code linting and quality
- **autoprefixer**: CSS vendor prefixing

## Testing and Error Handling

### Input Validation
- **Expression Validation**: Checks for balanced parentheses and valid syntax
- **Number Validation**: Handles edge cases like division by zero, invalid inputs
- **Range Checking**: Prevents overflow errors and invalid mathematical operations

### Error Handling
- **Mathematical Errors**: Graceful handling of domain errors (e.g., sqrt of negative numbers)
- **Parsing Errors**: Clear error messages for invalid expressions
- **Memory Management**: Safe memory operations with bounds checking
- **Display Formatting**: Automatic scientific notation for very large/small numbers

### Edge Cases Handled
- Very large numbers (automatic scientific notation)
- Very small numbers (rounds to zero when appropriate)
- Invalid mathematical operations (displays "Error")
- Factorial of large numbers (prevents overflow)
- Division by zero
- Invalid trigonometric inputs (e.g., asin(2))

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design works on all screen sizes
- Progressive enhancement for optimal performance

## Contributing

This calculator is designed to be easily extensible. To add new features:

1. **New Mathematical Functions**: Add to the `functionMap` in `calculator.ts`
2. **New Button Types**: Extend the `ButtonType` union in `calculator.ts`
3. **UI Enhancements**: Modify components while maintaining the design system
4. **Additional Features**: Follow the existing patterns for state management

---

Built with ❤️ using React, TypeScript, and Tailwind CSS

import React from 'react';

interface TextDisplayProps {
  text: string;
  userInput: string;
  currentIndex: number;
  errors: Set<number>;
  isActive: boolean;
}

export const TextDisplay: React.FC<TextDisplayProps> = ({
  text,
  userInput,
  currentIndex,
  errors,
  isActive,
}) => {
  const renderCharacter = (char: string, index: number) => {
    let className = 'relative ';
    
    if (index < userInput.length) {
      // Already typed
      if (errors.has(index)) {
        className += 'text-red-600 bg-red-100 ';
      } else {
        className += 'text-emerald-600 ';
      }
    } else if (index === currentIndex && isActive) {
      // Current character
      className += 'text-gray-800 bg-gradient-to-r from-orange-400 to-pink-400 text-white animate-pulse ';
    } else {
      // Not yet typed
      className += 'text-gray-400 ';
    }

    return (
      <span key={index} className={className}>
        {char}
        {index === currentIndex && isActive && (
          <span className="absolute -top-1 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-pink-400 animate-pulse rounded-full" />
        )}
      </span>
    );
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-orange-200/50 shadow-xl shadow-orange-100/50">
      <div className="text-lg leading-relaxed font-mono tracking-wide select-none">
        {text.split('').map((char, index) => renderCharacter(char, index))}
      </div>
      
      {/* Progress bar */}
      <div className="mt-6 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-orange-400 to-pink-400 transition-all duration-300 ease-out"
          style={{ width: `${Math.min((currentIndex / text.length) * 100, 100)}%` }}
        />
      </div>
      
      <div className="mt-2 text-sm text-gray-600 text-center">
        {currentIndex} / {text.length} characters
      </div>
    </div>
  );
};
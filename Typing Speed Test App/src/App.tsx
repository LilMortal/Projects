import React, { useState } from 'react';
import { TimerDuration } from './types';
import { TypingTest } from './components/TypingTest';
import { TimerSettings } from './components/TimerSettings';
import { HistoryPanel } from './components/HistoryPanel';
import { Keyboard, Zap } from 'lucide-react';

function App() {
  const [duration, setDuration] = useState<TimerDuration>(60);
  const [isTestActive, setIsTestActive] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-100">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-100/20 to-orange-100/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl shadow-lg shadow-orange-200">
              <Keyboard className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Speed<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Type</span>
            </h1>
          </div>
          
          <p className="text-gray-600 text-lg mb-8">
            Test your typing speed and accuracy with our beautiful typing test
          </p>

          {/* Timer Settings */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-orange-500" />
              <span className="text-gray-700 font-medium">Test Duration</span>
            </div>
            <TimerSettings
              duration={duration}
              onDurationChange={setDuration}
              disabled={isTestActive}
            />
          </div>

          {/* History Button */}
          <div className="flex justify-center">
            <HistoryPanel />
          </div>
        </header>

        {/* Main Test Area */}
        <main>
          <TypingTest duration={duration} />
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>
            Built with React, TypeScript, and TailwindCSS • Focus on improving your typing skills
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
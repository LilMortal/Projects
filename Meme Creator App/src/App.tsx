import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { TextControls } from './components/TextControls';
import { MemeCanvas } from './components/MemeCanvas';

export interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontFamily: string;
  isDragging: boolean;
}

function App() {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [textElements, setTextElements] = useState<TextElement[]>([
    {
      id: 'top',
      text: 'TOP TEXT',
      x: 300,
      y: 50,
      fontSize: 40,
      color: '#ffffff',
      fontFamily: 'Impact, Arial Black, sans-serif',
      isDragging: false,
    },
    {
      id: 'bottom',
      text: 'BOTTOM TEXT',
      x: 300,
      y: 450,
      fontSize: 40,
      color: '#ffffff',
      fontFamily: 'Impact, Arial Black, sans-serif',
      isDragging: false,
    },
  ]);
  const [selectedTextId, setSelectedTextId] = useState<string>('top');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const selectedText = textElements.find(t => t.id === selectedTextId);

  const updateTextElement = (id: string, updates: Partial<TextElement>) => {
    setTextElements(prev => prev.map(text => 
      text.id === id ? { ...text, ...updates } : text
    ));
  };

  const handleImageUpload = (imageUrl: string) => {
    setBackgroundImage(imageUrl);
  };

  const handleTemplateSelect = (templateUrl: string) => {
    setBackgroundImage(templateUrl);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `meme-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleReset = () => {
    setBackgroundImage(null);
    setTextElements([
      {
        id: 'top',
        text: 'TOP TEXT',
        x: 300,
        y: 50,
        fontSize: 40,
        color: '#ffffff',
        fontFamily: 'Impact, Arial Black, sans-serif',
        isDragging: false,
      },
      {
        id: 'bottom',
        text: 'BOTTOM TEXT',
        x: 300,
        y: 450,
        fontSize: 40,
        color: '#ffffff',
        fontFamily: 'Impact, Arial Black, sans-serif',
        isDragging: false,
      },
    ]);
    setSelectedTextId('top');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header onDownload={handleDownload} onReset={handleReset} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="animate-fade-in">
              <ImageUploader 
                onImageUpload={handleImageUpload}
                onTemplateSelect={handleTemplateSelect}
              />
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <TextControls
                textElements={textElements}
                selectedTextId={selectedTextId}
                selectedText={selectedText}
                onTextSelect={setSelectedTextId}
                onTextUpdate={updateTextElement}
              />
            </div>
          </div>

          {/* Right Panel - Canvas */}
          <div className="lg:col-span-2">
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <MemeCanvas
                ref={canvasRef}
                backgroundImage={backgroundImage}
                textElements={textElements}
                selectedTextId={selectedTextId}
                onTextUpdate={updateTextElement}
                onTextSelect={setSelectedTextId}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              Built with ❤️ for meme creators everywhere
            </p>
            <p className="text-sm text-gray-500">
              Create, customize, and share your memes with ease
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
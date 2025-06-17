import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, Sparkles } from 'lucide-react';

const MEME_TEMPLATES = [
  {
    id: 'drake',
    name: 'Drake Pointing',
    url: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'thinking',
    name: 'Woman Thinking',
    url: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'success',
    name: 'Success Kid',
    url: 'https://images.pexels.com/photos/1537635/pexels-photo-1537635.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'office',
    name: 'Office Worker',
    url: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
  onTemplateSelect: (templateUrl: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageUpload, 
  onTemplateSelect 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [hasImage, setHasImage] = useState(false);

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageUpload(result);
        setHasImage(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleTemplateSelect = (template: typeof MEME_TEMPLATES[0]) => {
    onTemplateSelect(template.url);
    setHasImage(true);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200">
      <div className="flex items-center space-x-2 mb-4">
        <ImageIcon className="h-5 w-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Choose Image</h3>
      </div>

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
          dragOver
            ? 'border-primary-400 bg-primary-50'
            : hasImage
            ? 'border-success-300 bg-success-50'
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <Upload className={`mx-auto h-12 w-12 mb-4 ${
          hasImage ? 'text-success-500' : 'text-gray-400'
        }`} />
        
        <p className={`text-lg font-medium mb-2 ${
          hasImage ? 'text-success-700' : 'text-gray-900'
        }`}>
          {hasImage ? 'Image loaded!' : 'Upload your image'}
        </p>
        
        <p className="text-sm text-gray-500">
          {hasImage 
            ? 'Click to change image or drag a new one here'
            : 'Drag and drop an image here, or click to browse'
          }
        </p>
        
        <p className="text-xs text-gray-400 mt-2">
          Supports JPG, PNG, GIF up to 10MB
        </p>
      </div>

      {/* Meme Templates */}
      <div className="mt-6">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="h-4 w-4 text-accent-500" />
          <h4 className="text-md font-medium text-gray-900">Popular Templates</h4>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {MEME_TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateSelect(template)}
              className="group relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-primary-300 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <img
                src={template.url}
                alt={template.name}
                className="w-full h-20 object-cover group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity text-center px-2">
                  {template.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
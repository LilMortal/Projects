import React, { useState } from 'react';
import { Image, Send } from 'lucide-react';
import { useChirpContext } from '../context/ChirpContext';

const ChirpComposer: React.FC = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const { currentUser, addChirp } = useChirpContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      addChirp(content.trim(), image || undefined);
      setContent('');
      setImage('');
    }
  };

  const handleImageAdd = () => {
    const imageUrl = prompt('Enter image URL:');
    if (imageUrl) {
      setImage(imageUrl);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 mb-6 animate-fade-in">
      <div className="flex space-x-4">
        <img
          src={currentUser.avatar}
          alt={currentUser.displayName}
          className="h-12 w-12 rounded-full flex-shrink-0"
        />
        
        <form onSubmit={handleSubmit} className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            className="w-full resize-none border-none outline-none text-lg placeholder-gray-500 bg-transparent"
            rows={3}
            maxLength={280}
          />
          
          {image && (
            <div className="mt-4 relative">
              <img
                src={image}
                alt="Preview"
                className="w-full max-h-64 object-cover rounded-xl"
              />
              <button
                type="button"
                onClick={() => setImage('')}
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors duration-200"
              >
                ×
              </button>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={handleImageAdd}
                className="flex items-center space-x-2 text-sky-600 hover:text-sky-700 transition-colors duration-200"
              >
                <Image className="h-5 w-5" />
                <span className="text-sm font-medium">Photo</span>
              </button>
              
              <span className={`text-sm ${content.length > 250 ? 'text-rose-500' : 'text-gray-500'}`}>
                {280 - content.length}
              </span>
            </div>
            
            <button
              type="submit"
              disabled={!content.trim()}
              className="flex items-center space-x-2 bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 disabled:from-gray-300 disabled:to-gray-300 text-white px-6 py-2 rounded-full font-medium transition-all duration-200 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100"
            >
              <Send className="h-4 w-4" />
              <span>Chirp</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChirpComposer;
import React, { useState, useCallback } from 'react';
import { Heart, Download, ExternalLink } from 'lucide-react';
import { GifData } from '../types';
import { useAppContext } from '../context/AppContext';
import { giphyApi } from '../utils/api';

interface GifCardProps {
  gif: GifData;
}

const GifCard: React.FC<GifCardProps> = ({ gif }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useAppContext();
  const [isHovered, setIsHovered] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const favorite = isFavorite(gif.id);

  const handleFavoriteToggle = useCallback(() => {
    if (favorite) {
      removeFromFavorites(gif.id);
    } else {
      addToFavorites(gif);
    }
  }, [favorite, gif, addToFavorites, removeFromFavorites]);

  const handleDownload = useCallback(async () => {
    try {
      setIsDownloading(true);
      const filename = gif.title || `gif-${gif.id}`;
      await giphyApi.downloadGif(gif.images.original.url, filename);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  }, [gif]);

  const handleExternalLink = useCallback(() => {
    window.open(`https://giphy.com/gifs/${gif.id}`, '_blank');
  }, [gif.id]);

  return (
    <div 
      className="group relative bg-dark-800 rounded-2xl overflow-hidden border border-dark-700 hover:border-neon-cyan/50 transition-all duration-300 hover:shadow-lg hover:shadow-neon-cyan/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* GIF Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={isHovered ? gif.images.original.url : gif.images.fixed_height_still.url}
          alt={gif.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Overlay with actions */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute top-3 right-3 flex space-x-2">
            <button
              onClick={handleFavoriteToggle}
              className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                favorite 
                  ? 'bg-neon-pink/20 text-neon-pink hover:bg-neon-pink/30' 
                  : 'bg-black/20 text-white hover:bg-black/40'
              }`}
            >
              <Heart className={`w-5 h-5 ${favorite ? 'fill-current' : ''}`} />
            </button>
          </div>
          
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center space-x-2 px-3 py-2 bg-neon-green/20 hover:bg-neon-green/30 text-neon-green rounded-lg backdrop-blur-sm transition-all duration-200 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">{isDownloading ? 'Downloading...' : 'Download'}</span>
            </button>
            
            <button
              onClick={handleExternalLink}
              className="p-2 bg-black/20 hover:bg-black/40 text-white rounded-lg backdrop-blur-sm transition-all duration-200"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* GIF Info */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-white truncate mb-1">
          {gif.title || 'Untitled GIF'}
        </h3>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{gif.user?.display_name || gif.source_tld || 'Unknown'}</span>
          <span>{gif.images.original.width}×{gif.images.original.height}</span>
        </div>
      </div>
    </div>
  );
};

export default GifCard;
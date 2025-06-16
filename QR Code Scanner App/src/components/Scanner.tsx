import React, { useEffect, useRef } from 'react';
import { Camera, Upload, Zap, ZapOff, AlertCircle } from 'lucide-react';
import { useCamera } from '../hooks/useCamera';
import { ActionButton } from './ActionButton';
import { scanImageFile } from '../utils/qrUtils';

interface ScannerProps {
  onScanResult: (result: string) => void;
}

export const Scanner: React.FC<ScannerProps> = ({ onScanResult }) => {
  const {
    isScanning,
    hasFlash,
    flashEnabled,
    error,
    videoRef,
    startScanning,
    stopScanning,
    toggleFlash,
  } = useCamera();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    startScanning(onScanResult);
    return () => stopScanning();
  }, [startScanning, stopScanning, onScanResult]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const result = await scanImageFile(file);
      onScanResult(result);
    } catch (err) {
      alert('No QR code found in the selected image');
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <AlertCircle className="mx-auto mb-4 text-red-500" size={64} />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Camera Error
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error.message}
          </p>
          {error.type === 'permission' && (
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
              Please allow camera access in your browser settings and refresh the page.
            </p>
          )}
          <div className="space-y-3">
            <ActionButton
              icon={Camera}
              label="Try Again"
              onClick={() => window.location.reload()}
              fullWidth
            />
            <ActionButton
              icon={Upload}
              label="Upload Image Instead"
              onClick={() => fileInputRef.current?.click()}
              variant="secondary"
              fullWidth
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 relative bg-black">
      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        muted
      />
      
      {/* Scanning overlay */}
      {isScanning && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Scan frame */}
            <div className="w-64 h-64 border-2 border-white rounded-2xl relative overflow-hidden">
              {/* Corner markers */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-blue-400 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-blue-400 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-blue-400 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-blue-400 rounded-br-lg"></div>
              
              {/* Animated scan line */}
              <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
            </div>
            
            {/* Instructions */}
            <p className="text-white text-center mt-4 text-lg font-medium">
              Position QR code within the frame
            </p>
          </div>
        </div>
      )}
      
      {/* Controls overlay */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-4 px-6">
        {hasFlash && (
          <button
            onClick={toggleFlash}
            className={`p-4 rounded-full transition-all duration-200 ${
              flashEnabled 
                ? 'bg-yellow-500 text-white' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {flashEnabled ? <Zap size={24} /> : <ZapOff size={24} />}
          </button>
        )}
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-4 bg-white/20 text-white rounded-full hover:bg-white/30 transition-all duration-200"
        >
          <Upload size={24} />
        </button>
      </div>
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};
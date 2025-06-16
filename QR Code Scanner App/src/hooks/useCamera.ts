import { useState, useRef, useCallback } from 'react';
import QrScanner from 'qr-scanner';
import { CameraError } from '../types';

export const useCamera = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasFlash, setHasFlash] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [error, setError] = useState<CameraError | null>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startScanning = useCallback(async (onResult: (result: string) => void) => {
    if (!videoRef.current) return;

    try {
      setError(null);
      setIsScanning(true);

      // Check if QR scanning is supported
      const hasCamera = await QrScanner.hasCamera();
      if (!hasCamera) {
        throw new Error('No camera found');
      }

      // Create scanner instance
      scannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          onResult(result.data);
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
          preferredCamera: 'environment',
        }
      );

      await scannerRef.current.start();
      
      // Check flash support
      const flashSupported = await scannerRef.current.hasFlash();
      setHasFlash(flashSupported);

    } catch (err) {
      console.error('Camera error:', err);
      setIsScanning(false);
      
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setError({ type: 'permission', message: 'Camera permission denied' });
        } else if (err.name === 'NotFoundError') {
          setError({ type: 'not-found', message: 'No camera found' });
        } else if (err.name === 'NotSupportedError') {
          setError({ type: 'not-supported', message: 'Camera not supported' });
        } else {
          setError({ type: 'unknown', message: err.message || 'Unknown camera error' });
        }
      }
    }
  }, []);

  const stopScanning = useCallback(() => {
    if (scannerRef.current) {
      scannerRef.current.stop();
      scannerRef.current.destroy();
      scannerRef.current = null;
    }
    setIsScanning(false);
    setFlashEnabled(false);
  }, []);

  const toggleFlash = useCallback(async () => {
    if (scannerRef.current && hasFlash) {
      try {
        const newFlashState = !flashEnabled;
        await scannerRef.current.setFlash(newFlashState);
        setFlashEnabled(newFlashState);
      } catch (err) {
        console.error('Flash toggle error:', err);
      }
    }
  }, [flashEnabled, hasFlash]);

  return {
    isScanning,
    hasFlash,
    flashEnabled,
    error,
    videoRef,
    startScanning,
    stopScanning,
    toggleFlash,
  };
};
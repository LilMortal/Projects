export interface ScanResult {
  id: string;
  content: string;
  type: 'url' | 'email' | 'phone' | 'text';
  timestamp: number;
  date: string;
}

export interface CameraError {
  type: 'permission' | 'not-supported' | 'not-found' | 'unknown';
  message: string;
}

export type Theme = 'light' | 'dark';

export type ViewMode = 'scanner' | 'result' | 'history';
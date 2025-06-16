import { ScanResult } from '../types';

const STORAGE_KEY = 'qr-scanner-history';

export const saveToHistory = (result: ScanResult): void => {
  try {
    const existing = getHistory();
    const updated = [result, ...existing.filter(item => item.id !== result.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.slice(0, 50))); // Keep last 50 scans
  } catch (error) {
    console.error('Failed to save to history:', error);
  }
};

export const getHistory = (): ScanResult[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load history:', error);
    return [];
  }
};

export const clearHistory = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
};

export const removeFromHistory = (id: string): void => {
  try {
    const existing = getHistory();
    const updated = existing.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to remove from history:', error);
  }
};
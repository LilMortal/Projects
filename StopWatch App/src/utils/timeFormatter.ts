/**
 * Formats time from milliseconds to HH:MM:SS.MS format
 * @param ms - Time in milliseconds
 * @returns Formatted time string
 */
export const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10); // Two-digit milliseconds

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds
      .toString()
      .padStart(2, '0')}`;
  } else {
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  }
};

/**
 * Parses a time string back to milliseconds
 * @param timeString - Time string in HH:MM:SS.MS or MM:SS.MS format
 * @returns Time in milliseconds
 */
export const parseTime = (timeString: string): number => {
  const parts = timeString.split(':');
  let hours = 0;
  let minutes = 0;
  let secondsAndMs = '0.00';

  if (parts.length === 3) {
    // HH:MM:SS.MS format
    hours = parseInt(parts[0]);
    minutes = parseInt(parts[1]);
    secondsAndMs = parts[2];
  } else if (parts.length === 2) {
    // MM:SS.MS format
    minutes = parseInt(parts[0]);
    secondsAndMs = parts[1];
  }

  const [seconds, ms] = secondsAndMs.split('.');
  const totalMs = 
    hours * 3600 * 1000 + 
    minutes * 60 * 1000 + 
    parseInt(seconds) * 1000 + 
    parseInt(ms || '0') * 10;

  return totalMs;
};
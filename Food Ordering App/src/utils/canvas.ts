import type { Point } from '../types';

export const getCanvasPoint = (
  canvas: HTMLCanvasElement, 
  clientX: number, 
  clientY: number,
  zoom: number,
  panX: number,
  panY: number
): Point => {
  const rect = canvas.getBoundingClientRect();
  const x = ((clientX - rect.left) / zoom) - panX;
  const y = ((clientY - rect.top) / zoom) - panY;
  return { x, y };
};

export const drawSmoothLine = (
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  size: number,
  color: string
): void => {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
  ctx.restore();
};

export const drawGrid = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  zoom: number,
  panX: number,
  panY: number
): void => {
  const gridSize = 20 * zoom;
  const offsetX = (panX * zoom) % gridSize;
  const offsetY = (panY * zoom) % gridSize;

  ctx.save();
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.lineWidth = 1;

  // Vertical lines
  for (let x = offsetX; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Horizontal lines
  for (let y = offsetY; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.restore();
};

export const downloadCanvas = (canvas: HTMLCanvasElement, filename: string, format: 'png' | 'jpeg' = 'png'): void => {
  const link = document.createElement('a');
  link.download = `${filename}.${format}`;
  link.href = canvas.toDataURL(`image/${format}`);
  link.click();
};

export const resizeCanvas = (canvas: HTMLCanvasElement, width: number, height: number): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Save current image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  // Resize canvas
  canvas.width = width;
  canvas.height = height;
  
  // Restore image data
  ctx.putImageData(imageData, 0, 0);
};
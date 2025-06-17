import { Point } from '../types/drawing';

export function getCanvasPoint(canvas: HTMLCanvasElement, clientX: number, clientY: number, zoom: number, pan: Point): Point {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (clientX - rect.left - pan.x) / zoom,
    y: (clientY - rect.top - pan.y) / zoom,
  };
}

export function drawLine(ctx: CanvasRenderingContext2D, from: Point, to: Point, size: number, color: string, opacity: number) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
  ctx.restore();
}

export function drawCircle(ctx: CanvasRenderingContext2D, center: Point, radius: number, filled: boolean, color: string, opacity: number) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
  
  if (filled) {
    ctx.fillStyle = color;
    ctx.fill();
  } else {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  ctx.restore();
}

export function drawRectangle(ctx: CanvasRenderingContext2D, start: Point, end: Point, filled: boolean, color: string, opacity: number) {
  ctx.save();
  ctx.globalAlpha = opacity;
  const width = end.x - start.x;
  const height = end.y - start.y;
  
  if (filled) {
    ctx.fillStyle = color;
    ctx.fillRect(start.x, start.y, width, height);
  } else {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.strokeRect(start.x, start.y, width, height);
  }
  ctx.restore();
}

export function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number, zoom: number, pan: Point) {
  ctx.save();
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 0.5;
  ctx.globalAlpha = 0.5;
  
  const gridSize = 20 * zoom;
  const offsetX = pan.x % gridSize;
  const offsetY = pan.y % gridSize;
  
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
}

export function floodFill(imageData: ImageData, startX: number, startY: number, fillColor: [number, number, number, number]) {
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;
  
  if (startX < 0 || startX >= width || startY < 0 || startY >= height) return;
  
  const startIndex = (startY * width + startX) * 4;
  const startColor = [
    data[startIndex],
    data[startIndex + 1],
    data[startIndex + 2],
    data[startIndex + 3]
  ];
  
  if (
    startColor[0] === fillColor[0] &&
    startColor[1] === fillColor[1] &&
    startColor[2] === fillColor[2] &&
    startColor[3] === fillColor[3]
  ) {
    return;
  }
  
  const stack: Point[] = [{ x: startX, y: startY }];
  
  while (stack.length > 0) {
    const { x, y } = stack.pop()!;
    
    if (x < 0 || x >= width || y < 0 || y >= height) continue;
    
    const index = (y * width + x) * 4;
    
    if (
      data[index] !== startColor[0] ||
      data[index + 1] !== startColor[1] ||
      data[index + 2] !== startColor[2] ||
      data[index + 3] !== startColor[3]
    ) {
      continue;
    }
    
    data[index] = fillColor[0];
    data[index + 1] = fillColor[1];
    data[index + 2] = fillColor[2];
    data[index + 3] = fillColor[3];
    
    stack.push({ x: x + 1, y });
    stack.push({ x: x - 1, y });
    stack.push({ x, y: y + 1 });
    stack.push({ x, y: y - 1 });
  }
}

export function hexToRgba(hex: string, alpha: number = 1): [number, number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b, Math.round(alpha * 255)];
}
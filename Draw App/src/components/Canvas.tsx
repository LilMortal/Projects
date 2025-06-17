import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useDrawing } from '../context/DrawingContext';
import { Point } from '../types/drawing';
import { getCanvasPoint, drawLine, drawCircle, drawRectangle, drawGrid, floodFill, hexToRgba } from '../utils/canvasUtils';

interface CanvasProps {
  width: number;
  height: number;
}

export function Canvas({ width, height }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state, actions } = useDrawing();
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<Point | null>(null);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState<Point | null>(null);

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    if (state.showGrid) {
      drawGrid(ctx, width, height, state.zoom, state.pan);
    }
  }, [width, height, state.showGrid, state.zoom, state.pan]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.clearRect(0, 0, width, height);
    ctx.scale(state.zoom, state.zoom);
    ctx.translate(state.pan.x / state.zoom, state.pan.y / state.zoom);
    
    draw(ctx);
    
    ctx.restore();
  }, [draw, state.zoom, state.pan, width, height]);

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const point = getCanvasPoint(canvas, event.clientX, event.clientY, state.zoom, state.pan);

    if (state.tool === 'pan') {
      setIsPanning(true);
      setLastPanPoint({ x: event.clientX, y: event.clientY });
      return;
    }

    setIsDrawing(true);
    setLastPoint(point);
    setStartPoint(point);

    if (state.tool === 'fill') {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const fillColor = hexToRgba(state.color, state.opacity);
      floodFill(imageData, Math.floor(point.x), Math.floor(point.y), fillColor);
      ctx.putImageData(imageData, 0, 0);
      actions.saveToHistory();
    }
  }, [state.tool, state.zoom, state.pan, state.color, state.opacity, actions]);

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isPanning && lastPanPoint) {
      const deltaX = event.clientX - lastPanPoint.x;
      const deltaY = event.clientY - lastPanPoint.y;
      actions.setPan({
        x: state.pan.x + deltaX,
        y: state.pan.y + deltaY,
      });
      setLastPanPoint({ x: event.clientX, y: event.clientY });
      return;
    }

    if (!isDrawing || !lastPoint) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentPoint = getCanvasPoint(canvas, event.clientX, event.clientY, state.zoom, state.pan);

    ctx.save();
    ctx.scale(state.zoom, state.zoom);
    ctx.translate(state.pan.x / state.zoom, state.pan.y / state.zoom);

    if (state.tool === 'brush') {
      drawLine(ctx, lastPoint, currentPoint, state.brushSize, state.color, state.opacity);
      setLastPoint(currentPoint);
    } else if (state.tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      drawLine(ctx, lastPoint, currentPoint, state.brushSize, state.color, 1);
      setLastPoint(currentPoint);
    }

    ctx.restore();
  }, [isDrawing, lastPoint, isPanning, lastPanPoint, state, actions]);

  const handleMouseUp = useCallback(() => {
    if (isPanning) {
      setIsPanning(false);
      setLastPanPoint(null);
      return;
    }

    if (!isDrawing || !startPoint || !lastPoint) {
      setIsDrawing(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.scale(state.zoom, state.zoom);
    ctx.translate(state.pan.x / state.zoom, state.pan.y / state.zoom);

    if (state.tool === 'line') {
      drawLine(ctx, startPoint, lastPoint, state.brushSize, state.color, state.opacity);
    } else if (state.tool === 'rectangle') {
      drawRectangle(ctx, startPoint, lastPoint, false, state.color, state.opacity);
    } else if (state.tool === 'circle') {
      const radius = Math.sqrt(
        Math.pow(lastPoint.x - startPoint.x, 2) + Math.pow(lastPoint.y - startPoint.y, 2)
      );
      drawCircle(ctx, startPoint, radius, false, state.color, state.opacity);
    }

    ctx.restore();

    if (['brush', 'eraser', 'line', 'rectangle', 'circle'].includes(state.tool)) {
      actions.saveToHistory();
    }

    setIsDrawing(false);
    setLastPoint(null);
    setStartPoint(null);
  }, [isDrawing, startPoint, lastPoint, isPanning, state, actions]);

  const handleWheel = useCallback((event: React.WheelEvent) => {
    event.preventDefault();
    
    if (event.ctrlKey || event.metaKey) {
      const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
      actions.setZoom(state.zoom * zoomFactor);
    } else {
      actions.setPan({
        x: state.pan.x - event.deltaX,
        y: state.pan.y - event.deltaY,
      });
    }
  }, [state.zoom, state.pan, actions]);

  return (
    <div className="flex-1 overflow-hidden bg-gray-50 relative">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="cursor-crosshair border border-gray-200 shadow-sm"
        style={{
          cursor: state.tool === 'pan' ? 'grab' : 'crosshair',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />
      
      <div className="absolute bottom-4 right-4 bg-white px-3 py-2 rounded-lg shadow-md border border-gray-200">
        <span className="text-sm text-gray-600">
          {Math.round(state.zoom * 100)}%
        </span>
      </div>
    </div>
  );
}
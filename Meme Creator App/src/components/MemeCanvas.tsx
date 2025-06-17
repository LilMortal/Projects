import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { TextElement } from '../App';

interface MemeCanvasProps {
  backgroundImage: string | null;
  textElements: TextElement[];
  selectedTextId: string;
  onTextUpdate: (id: string, updates: Partial<TextElement>) => void;
  onTextSelect: (id: string) => void;
}

export const MemeCanvas = forwardRef<HTMLCanvasElement, MemeCanvasProps>(({
  backgroundImage,
  textElements,
  selectedTextId,
  onTextUpdate,
  onTextSelect,
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ isDragging: boolean; textId: string | null; startX: number; startY: number }>({
    isDragging: false,
    textId: null,
    startX: 0,
    startY: 0,
  });

  useImperativeHandle(ref, () => canvasRef.current!);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    if (backgroundImage) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        drawTexts(ctx);
      };
      img.src = backgroundImage;
    } else {
      // Draw placeholder background
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw placeholder text
      ctx.fillStyle = '#9ca3af';
      ctx.font = '24px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Upload an image to start', canvas.width / 2, canvas.height / 2);
      
      drawTexts(ctx);
    }
  };

  const drawTexts = (ctx: CanvasRenderingContext2D) => {
    textElements.forEach((textElement) => {
      ctx.save();
      
      // Set font properties
      ctx.font = `${textElement.fontSize}px ${textElement.fontFamily}`;
      ctx.fillStyle = textElement.color;
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Draw text with outline
      ctx.strokeText(textElement.text, textElement.x, textElement.y);
      ctx.fillText(textElement.text, textElement.x, textElement.y);
      
      // Draw selection indicator
      if (textElement.id === selectedTextId) {
        const metrics = ctx.measureText(textElement.text);
        const width = metrics.width + 20;
        const height = textElement.fontSize + 10;
        
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(
          textElement.x - width / 2,
          textElement.y - height / 2,
          width,
          height
        );
        ctx.setLineDash([]);
      }
      
      ctx.restore();
    });
  };

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const getTextAtPosition = (x: number, y: number): TextElement | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    for (let i = textElements.length - 1; i >= 0; i--) {
      const textElement = textElements[i];
      ctx.font = `${textElement.fontSize}px ${textElement.fontFamily}`;
      const metrics = ctx.measureText(textElement.text);
      const width = metrics.width + 20;
      const height = textElement.fontSize + 10;

      if (
        x >= textElement.x - width / 2 &&
        x <= textElement.x + width / 2 &&
        y >= textElement.y - height / 2 &&
        y <= textElement.y + height / 2
      ) {
        return textElement;
      }
    }
    return null;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e);
    const textAtPos = getTextAtPosition(pos.x, pos.y);

    if (textAtPos) {
      onTextSelect(textAtPos.id);
      dragRef.current = {
        isDragging: true,
        textId: textAtPos.id,
        startX: pos.x - textAtPos.x,
        startY: pos.y - textAtPos.y,
      };
      onTextUpdate(textAtPos.id, { isDragging: true });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !dragRef.current.isDragging || !dragRef.current.textId) return;

    const pos = getMousePos(e);
    const newX = pos.x - dragRef.current.startX;
    const newY = pos.y - dragRef.current.startY;

    // Keep text within canvas bounds
    const clampedX = Math.max(50, Math.min(canvas.width - 50, newX));
    const clampedY = Math.max(30, Math.min(canvas.height - 30, newY));

    onTextUpdate(dragRef.current.textId, { x: clampedX, y: clampedY });
  };

  const handleMouseUp = () => {
    if (dragRef.current.textId) {
      onTextUpdate(dragRef.current.textId, { isDragging: false });
    }
    dragRef.current = {
      isDragging: false,
      textId: null,
      startX: 0,
      startY: 0,
    };
  };

  useEffect(() => {
    drawCanvas();
  }, [backgroundImage, textElements, selectedTextId]);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Meme Canvas</h3>
        <div className="text-sm text-gray-500">
          600 × 500
        </div>
      </div>

      <div ref={containerRef} className="flex justify-center">
        <div className="bg-gray-100 rounded-xl p-4 inline-block shadow-inner">
          <canvas
            ref={canvasRef}
            width={600}
            height={500}
            className="border border-gray-300 rounded-lg bg-white shadow-sm cursor-pointer"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Click and drag text to reposition • Click text to select and edit
        </p>
      </div>
    </div>
  );
});

MemeCanvas.displayName = 'MemeCanvas';
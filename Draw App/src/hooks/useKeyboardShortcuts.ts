import { useEffect } from 'react';
import { useDrawing } from '../context/DrawingContext';

export function useKeyboardShortcuts() {
  const { actions } = useDrawing();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (event.ctrlKey || event.metaKey) {
        switch (event.key.toLowerCase()) {
          case 'z':
            event.preventDefault();
            if (event.shiftKey) {
              actions.redo();
            } else {
              actions.undo();
            }
            break;
          case 'y':
            event.preventDefault();
            actions.redo();
            break;
        }
      } else {
        switch (event.key.toLowerCase()) {
          case 'b':
            actions.setTool('brush');
            break;
          case 'e':
            actions.setTool('eraser');
            break;
          case 'l':
            actions.setTool('line');
            break;
          case 'r':
            actions.setTool('rectangle');
            break;
          case 'c':
            actions.setTool('circle');
            break;
          case 'f':
            actions.setTool('fill');
            break;
          case 'h':
            actions.setTool('pan');
            break;
          case 'g':
            actions.toggleGrid();
            break;
          case '=':
          case '+':
            event.preventDefault();
            actions.setZoom(1.2);
            break;
          case '-':
            event.preventDefault();
            actions.setZoom(0.8);
            break;
          case '0':
            event.preventDefault();
            actions.setZoom(1);
            break;
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [actions]);
}
import { useEffect } from 'react';
import { useToolStore } from '../store/toolStore';
import { useCanvasStore } from '../store/canvasStore';
import { useHistoryStore } from '../store/historyStore';
import { KEYBOARD_SHORTCUTS } from '../constants';

export const useKeyboard = (onSave?: () => void, onLoad?: () => void) => {
  const { setCurrentTool } = useToolStore();
  const { zoomIn, zoomOut, toggleGrid } = useCanvasStore();
  const { undo, redo, canUndo, canRedo } = useHistoryStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toLowerCase();
      const ctrlKey = e.ctrlKey || e.metaKey;

      // Prevent default for our shortcuts
      if (Object.values(KEYBOARD_SHORTCUTS).includes(key) || 
          (ctrlKey && ['z', 'y', 's', 'o'].includes(key))) {
        e.preventDefault();
      }

      // Handle shortcuts
      if (ctrlKey) {
        switch (key) {
          case KEYBOARD_SHORTCUTS.UNDO:
            if (canUndo()) undo();
            break;
          case KEYBOARD_SHORTCUTS.REDO:
            if (canRedo()) redo();
            break;
          case KEYBOARD_SHORTCUTS.SAVE:
            onSave?.();
            break;
          case KEYBOARD_SHORTCUTS.LOAD:
            onLoad?.();
            break;
        }
      } else {
        switch (key) {
          case KEYBOARD_SHORTCUTS.BRUSH:
            setCurrentTool('brush');
            break;
          case KEYBOARD_SHORTCUTS.ERASER:
            setCurrentTool('eraser');
            break;
          case KEYBOARD_SHORTCUTS.PAN:
            setCurrentTool('pan');
            break;
          case KEYBOARD_SHORTCUTS.ZOOM_IN:
            zoomIn();
            break;
          case KEYBOARD_SHORTCUTS.ZOOM_OUT:
            zoomOut();
            break;
          case KEYBOARD_SHORTCUTS.GRID:
            toggleGrid();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCurrentTool, zoomIn, zoomOut, toggleGrid, undo, redo, canUndo, canRedo, onSave, onLoad]);
};
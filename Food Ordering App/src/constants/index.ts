export const CANVAS_CONFIG = {
  DEFAULT_WIDTH: 2000,
  DEFAULT_HEIGHT: 2000,
  MIN_ZOOM: 0.1,
  MAX_ZOOM: 5,
  ZOOM_STEP: 0.1,
  PAN_SPEED: 1,
};

export const TOOL_CONFIG = {
  MIN_BRUSH_SIZE: 1,
  MAX_BRUSH_SIZE: 100,
  DEFAULT_BRUSH_SIZE: 5,
  MIN_ERASER_SIZE: 5,
  MAX_ERASER_SIZE: 100,
  DEFAULT_ERASER_SIZE: 20,
};

export const COLORS = [
  '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff',
  '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080',
  '#008000', '#800000', '#808080', '#c0c0c0', '#000080',
  '#808000', '#ff69b4', '#ffd700', '#98fb98', '#dda0dd'
];

export const KEYBOARD_SHORTCUTS = {
  UNDO: 'z',
  REDO: 'y',
  BRUSH: 'b',
  ERASER: 'e',
  PAN: ' ',
  ZOOM_IN: '=',
  ZOOM_OUT: '-',
  SAVE: 's',
  LOAD: 'o',
  GRID: 'g',
};
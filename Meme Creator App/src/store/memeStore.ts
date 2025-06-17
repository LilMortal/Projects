import { create } from 'zustand';

export interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  fill: string;
  stroke: string;
  strokeWidth: number;
  align: 'left' | 'center' | 'right';
  verticalAlign: 'top' | 'middle' | 'bottom';
  rotation: number;
  scaleX: number;
  scaleY: number;
  draggable: boolean;
  width: number;
  height: number;
}

export interface MemeProject {
  id: string;
  name: string;
  imageUrl: string | null;
  textElements: TextElement[];
  canvasWidth: number;
  canvasHeight: number;
  createdAt: number;
  updatedAt: number;
}

interface HistoryState {
  textElements: TextElement[];
  imageUrl: string | null;
}

interface MemeStore {
  // Current state
  imageUrl: string | null;
  textElements: TextElement[];
  selectedElementId: string | null;
  canvasWidth: number;
  canvasHeight: number;
  
  // History for undo/redo
  history: HistoryState[];
  historyIndex: number;
  
  // UI state
  isLoading: boolean;
  showGrid: boolean;
  snapToGrid: boolean;
  
  // Actions
  setImage: (url: string) => void;
  addTextElement: (element: Omit<TextElement, 'id'>) => void;
  updateTextElement: (id: string, updates: Partial<TextElement>) => void;
  deleteTextElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  setCanvasSize: (width: number, height: number) => void;
  
  // History actions
  pushToHistory: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  
  // Project actions
  saveProject: (name: string) => string;
  loadProject: (project: MemeProject) => void;
  exportAsImage: () => Promise<string>;
  clearCanvas: () => void;
  
  // Settings
  toggleGrid: () => void;
  toggleSnap: () => void;
  setLoading: (loading: boolean) => void;
}

const createDefaultTextElement = (): Omit<TextElement, 'id'> => ({
  text: 'Your text here',
  x: 100,
  y: 50,
  fontSize: 40,
  fontFamily: 'Impact, Arial Black, sans-serif',
  fill: '#ffffff',
  stroke: '#000000',
  strokeWidth: 2,
  align: 'center',
  verticalAlign: 'middle',
  rotation: 0,
  scaleX: 1,
  scaleY: 1,
  draggable: true,
  width: 200,
  height: 50,
});

export const useMemeStore = create<MemeStore>((set, get) => ({
  // Initial state
  imageUrl: null,
  textElements: [],
  selectedElementId: null,
  canvasWidth: 600,
  canvasHeight: 600,
  history: [],
  historyIndex: -1,
  isLoading: false,
  showGrid: false,
  snapToGrid: false,

  setImage: (url: string) => {
    set({ imageUrl: url });
    get().pushToHistory();
  },

  addTextElement: (element) => {
    const id = `text-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newElement: TextElement = { ...element, id };
    set((state) => ({
      textElements: [...state.textElements, newElement],
      selectedElementId: id,
    }));
    get().pushToHistory();
  },

  updateTextElement: (id, updates) => {
    set((state) => ({
      textElements: state.textElements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      ),
    }));
    get().pushToHistory();
  },

  deleteTextElement: (id) => {
    set((state) => ({
      textElements: state.textElements.filter((el) => el.id !== id),
      selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
    }));
    get().pushToHistory();
  },

  selectElement: (id) => {
    set({ selectedElementId: id });
  },

  setCanvasSize: (width, height) => {
    set({ canvasWidth: width, canvasHeight: height });
  },

  pushToHistory: () => {
    const { textElements, imageUrl, history, historyIndex } = get();
    const newState: HistoryState = { textElements: [...textElements], imageUrl };
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);
    
    // Limit history to 50 states
    if (newHistory.length > 50) {
      newHistory.shift();
    }
    
    set({
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      const prevState = history[prevIndex];
      set({
        textElements: [...prevState.textElements],
        imageUrl: prevState.imageUrl,
        historyIndex: prevIndex,
      });
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      const nextState = history[nextIndex];
      set({
        textElements: [...nextState.textElements],
        imageUrl: nextState.imageUrl,
        historyIndex: nextIndex,
      });
    }
  },

  canUndo: () => {
    const { historyIndex } = get();
    return historyIndex > 0;
  },

  canRedo: () => {
    const { history, historyIndex } = get();
    return historyIndex < history.length - 1;
  },

  saveProject: (name: string) => {
    const { textElements, imageUrl, canvasWidth, canvasHeight } = get();
    const project: MemeProject = {
      id: `project-${Date.now()}`,
      name,
      imageUrl,
      textElements: [...textElements],
      canvasWidth,
      canvasHeight,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    // Save to localStorage
    const savedProjects = JSON.parse(localStorage.getItem('meme-projects') || '[]');
    savedProjects.push(project);
    localStorage.setItem('meme-projects', JSON.stringify(savedProjects));
    
    return project.id;
  },

  loadProject: (project: MemeProject) => {
    set({
      imageUrl: project.imageUrl,
      textElements: [...project.textElements],
      canvasWidth: project.canvasWidth,
      canvasHeight: project.canvasHeight,
      selectedElementId: null,
    });
    get().pushToHistory();
  },

  exportAsImage: async () => {
    // This will be implemented in the component that has access to the Konva stage
    return '';
  },

  clearCanvas: () => {
    set({
      imageUrl: null,
      textElements: [],
      selectedElementId: null,
    });
    get().pushToHistory();
  },

  toggleGrid: () => {
    set((state) => ({ showGrid: !state.showGrid }));
  },

  toggleSnap: () => {
    set((state) => ({ snapToGrid: !state.snapToGrid }));
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));

// Helper function to create a new text element with defaults
export const createNewTextElement = (overrides?: Partial<Omit<TextElement, 'id'>>): Omit<TextElement, 'id'> => ({
  ...createDefaultTextElement(),
  ...overrides,
});
export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  count: number;
}

export type SortOption = 'updated' | 'created' | 'title' | 'pinned';
export type ViewMode = 'grid' | 'list';
export type Theme = 'light' | 'dark' | 'system';

export interface AppState {
  notes: Note[];
  archivedNotes: Note[];
  tags: Tag[];
  searchQuery: string;
  selectedTags: string[];
  sortBy: SortOption;
  viewMode: ViewMode;
  theme: Theme;
  isCreatingNote: boolean;
  editingNoteId: string | null;
}
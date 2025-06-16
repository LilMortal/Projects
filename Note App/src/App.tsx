import React, { useState } from 'react';
import { Header } from './components/Header';
import { TagManager } from './components/TagManager';
import { NoteList } from './components/NoteList';
import { NoteEditor } from './components/NoteEditor';
import { useNotes } from './hooks/useNotes';
import { useTheme } from './hooks/useTheme';
import { Note, ViewMode } from './types';

function App() {
  const { theme, setTheme } = useTheme();
  const {
    notes,
    archivedNotes,
    tags,
    searchQuery,
    setSearchQuery,
    selectedTags,
    setSelectedTags,
    sortBy,
    setSortBy,
    createNote,
    updateNote,
    deleteNote,
    archiveNote,
    restoreNote,
    togglePin,
    createTag,
  } = useNotes();

  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showArchive, setShowArchive] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isCreatingNote, setIsCreatingNote] = useState(false);

  const handleCreateNote = () => {
    setIsCreatingNote(true);
    setEditingNote(null);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsCreatingNote(false);
  };

  const handleSaveNote = (title: string, content: string, noteTags: string[]) => {
    if (isCreatingNote) {
      createNote(title, content, noteTags);
    } else if (editingNote) {
      updateNote(editingNote.id, { title, content, tags: noteTags });
    }
    setIsCreatingNote(false);
    setEditingNote(null);
  };

  const handleCancelEdit = () => {
    setIsCreatingNote(false);
    setEditingNote(null);
  };

  const handleDeleteNote = (id: string) => {
    if (showArchive) {
      // Permanently delete from archive
      const archived = archivedNotes.filter(n => n.id !== id);
      // Note: In a real app, you'd have a separate method for this
      deleteNote(id);
    } else {
      deleteNote(id);
    }
  };

  const handleToggleArchive = () => {
    setShowArchive(!showArchive);
    setSearchQuery('');
    setSelectedTags([]);
  };

  const currentNotes = showArchive ? archivedNotes : notes;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onCreateNote={handleCreateNote}
        onShowArchive={handleToggleArchive}
        theme={theme}
        onThemeChange={setTheme}
        showArchive={showArchive}
      />

      <TagManager
        tags={tags}
        selectedTags={selectedTags}
        onTagSelect={setSelectedTags}
        onCreateTag={createTag}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NoteList
          notes={currentNotes}
          tags={tags}
          viewMode={viewMode}
          isArchive={showArchive}
          onEditNote={handleEditNote}
          onDeleteNote={handleDeleteNote}
          onTogglePin={togglePin}
          onArchiveNote={archiveNote}
          onRestoreNote={restoreNote}
        />
      </main>

      {(isCreatingNote || editingNote) && (
        <NoteEditor
          note={editingNote || undefined}
          tags={tags}
          onSave={handleSaveNote}
          onCancel={handleCancelEdit}
          isCreating={isCreatingNote}
        />
      )}
    </div>
  );
}

export default App;
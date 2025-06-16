import React from 'react';
import { FileText, Archive as ArchiveIcon } from 'lucide-react';
import { Note, Tag, ViewMode } from '../types';
import { NoteCard } from './NoteCard';

interface NoteListProps {
  notes: Note[];
  tags: Tag[];
  viewMode: ViewMode;
  isArchive?: boolean;
  onEditNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
  onTogglePin: (id: string) => void;
  onArchiveNote: (id: string) => void;
  onRestoreNote?: (id: string) => void;
}

export function NoteList({
  notes,
  tags,
  viewMode,
  isArchive = false,
  onEditNote,
  onDeleteNote,
  onTogglePin,
  onArchiveNote,
  onRestoreNote,
}: NoteListProps) {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
          {isArchive ? (
            <ArchiveIcon className="w-12 h-12 text-gray-400" />
          ) : (
            <FileText className="w-12 h-12 text-gray-400" />
          )}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {isArchive ? 'No archived notes' : 'No notes yet'}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
          {isArchive 
            ? 'Archived notes will appear here. Archive notes to keep them safe but out of your main view.'
            : 'Create your first note to get started. Click the "New Note" button to begin writing.'
          }
        </p>
      </div>
    );
  }

  const gridClasses = viewMode === 'grid' 
    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    : "space-y-4";

  return (
    <div className={gridClasses}>
      {notes.map(note => (
        <NoteCard
          key={note.id}
          note={note}
          tags={tags}
          viewMode={viewMode}
          isArchived={isArchive}
          onEdit={onEditNote}
          onDelete={onDeleteNote}
          onTogglePin={onTogglePin}
          onArchive={onArchiveNote}
          onRestore={onRestoreNote}
        />
      ))}
    </div>
  );
}
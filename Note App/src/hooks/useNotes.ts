import { useState, useCallback, useEffect } from 'react';
import { Note, Tag, SortOption } from '../types';
import { useLocalStorage } from './useLocalStorage';

const generateId = () => Math.random().toString(36).substr(2, 9);

const defaultTags: Tag[] = [
  { id: '1', name: 'Work', color: '#3B82F6', count: 0 },
  { id: '2', name: 'Personal', color: '#10B981', count: 0 },
  { id: '3', name: 'Ideas', color: '#F59E0B', count: 0 },
  { id: '4', name: 'Important', color: '#EF4444', count: 0 },
];

export function useNotes() {
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);
  const [archivedNotes, setArchivedNotes] = useLocalStorage<Note[]>('archived-notes', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('tags', defaultTags);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('updated');

  // Update tag counts
  useEffect(() => {
    const allNotes = [...notes, ...archivedNotes];
    const tagCounts = tags.reduce((acc, tag) => {
      acc[tag.name] = allNotes.filter(note => note.tags.includes(tag.name)).length;
      return acc;
    }, {} as Record<string, number>);

    setTags(prevTags => 
      prevTags.map(tag => ({ ...tag, count: tagCounts[tag.name] || 0 }))
    );
  }, [notes, archivedNotes, setTags]);

  const createNote = useCallback((title: string, content: string, tags: string[] = []) => {
    const newNote: Note = {
      id: generateId(),
      title: title.trim() || 'Untitled Note',
      content,
      tags,
      isPinned: false,
      isArchived: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes(prev => [newNote, ...prev]);
    return newNote;
  }, [setNotes]);

  const updateNote = useCallback((id: string, updates: Partial<Note>) => {
    setNotes(prev => 
      prev.map(note => 
        note.id === id 
          ? { ...note, ...updates, updatedAt: new Date() }
          : note
      )
    );
  }, [setNotes]);

  const deleteNote = useCallback((id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  }, [setNotes]);

  const archiveNote = useCallback((id: string) => {
    const note = notes.find(n => n.id === id);
    if (note) {
      setArchivedNotes(prev => [{ ...note, isArchived: true }, ...prev]);
      setNotes(prev => prev.filter(n => n.id !== id));
    }
  }, [notes, setNotes, setArchivedNotes]);

  const restoreNote = useCallback((id: string) => {
    const note = archivedNotes.find(n => n.id === id);
    if (note) {
      setNotes(prev => [{ ...note, isArchived: false }, ...prev]);
      setArchivedNotes(prev => prev.filter(n => n.id !== id));
    }
  }, [archivedNotes, setNotes, setArchivedNotes]);

  const togglePin = useCallback((id: string) => {
    updateNote(id, { isPinned: !notes.find(n => n.id === id)?.isPinned });
  }, [notes, updateNote]);

  const createTag = useCallback((name: string, color: string) => {
    const newTag: Tag = {
      id: generateId(),
      name,
      color,
      count: 0,
    };
    setTags(prev => [...prev, newTag]);
    return newTag;
  }, [setTags]);

  const filteredNotes = notes.filter(note => {
    const matchesSearch = !searchQuery || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => note.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'pinned':
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case 'updated':
      default:
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
  });

  return {
    notes: sortedNotes,
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
  };
}
import React, { useState, useEffect, useRef } from 'react';
import { Save, X, Hash, Bold, Italic, Underline, List, Heading } from 'lucide-react';
import { Note, Tag } from '../types';

interface NoteEditorProps {
  note?: Note;
  tags: Tag[];
  onSave: (title: string, content: string, tags: string[]) => void;
  onCancel: () => void;
  isCreating: boolean;
}

export function NoteEditor({ note, tags, onSave, onCancel, isCreating }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(note?.tags || []);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isCreating && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isCreating]);

  useEffect(() => {
    const originalTitle = note?.title || '';
    const originalContent = note?.content || '';
    const originalTags = note?.tags || [];
    
    const hasChanges = 
      title !== originalTitle || 
      content !== originalContent || 
      JSON.stringify(selectedTags.sort()) !== JSON.stringify(originalTags.sort());
    
    setHasUnsavedChanges(hasChanges);

    // Auto-save logic
    if (hasChanges && !isCreating && (title.trim() || content.trim())) {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
      
      const timeout = setTimeout(() => {
        handleSave(false);
      }, 2000); // Auto-save after 2 seconds of inactivity
      
      setAutoSaveTimeout(timeout);
    }

    return () => {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
    };
  }, [title, content, selectedTags]);

  const handleSave = (manual = true) => {
    if (!title.trim() && !content.trim()) {
      if (manual) {
        alert('Please add a title or content before saving.');
      }
      return;
    }
    
    onSave(title, content, selectedTags);
    setHasUnsavedChanges(false);
  };

  const handleCancel = () => {
    if (hasUnsavedChanges && !confirm('You have unsaved changes. Are you sure you want to cancel?')) {
      return;
    }
    onCancel();
  };

  const insertFormatting = (format: string) => {
    const textarea = contentTextareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let newText = '';
    let cursorOffset = 0;

    switch (format) {
      case 'bold':
        newText = `**${selectedText}**`;
        cursorOffset = selectedText ? 0 : 2;
        break;
      case 'italic':
        newText = `*${selectedText}*`;
        cursorOffset = selectedText ? 0 : 1;
        break;
      case 'underline':
        newText = `__${selectedText}__`;
        cursorOffset = selectedText ? 0 : 2;
        break;
      case 'heading':
        newText = `\n## ${selectedText}`;
        cursorOffset = selectedText ? 0 : 0;
        break;
      case 'list':
        newText = `\n- ${selectedText}`;
        cursorOffset = selectedText ? 0 : 0;
        break;
    }

    const newContent = content.substring(0, start) + newText + content.substring(end);
    setContent(newContent);

    // Set cursor position
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + newText.length - cursorOffset;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const toggleTag = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter(t => t !== tagName));
    } else {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  const getTagColor = (tagName: string) => {
    const tag = tags.find(t => t.name === tagName);
    return tag?.color || '#6B7280';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {isCreating ? 'Create New Note' : 'Edit Note'}
          </h2>
          <div className="flex items-center space-x-2">
            {hasUnsavedChanges && (
              <span className="text-sm text-amber-600 dark:text-amber-400">
                Unsaved changes
              </span>
            )}
            <button
              onClick={() => handleSave(true)}
              disabled={!title.trim() && !content.trim()}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors font-medium disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button
              onClick={handleCancel}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Title */}
          <div className="p-6 pb-0">
            <input
              ref={titleInputRef}
              type="text"
              placeholder="Note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-2xl font-bold bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          {/* Formatting Toolbar */}
          <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => insertFormatting('bold')}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                title="Bold"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                onClick={() => insertFormatting('italic')}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                title="Italic"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                onClick={() => insertFormatting('underline')}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                title="Underline"
              >
                <Underline className="w-4 h-4" />
              </button>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
              <button
                onClick={() => insertFormatting('heading')}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                title="Heading"
              >
                <Heading className="w-4 h-4" />
              </button>
              <button
                onClick={() => insertFormatting('list')}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                title="List"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content Editor */}
          <div className="flex-1 p-6">
            <textarea
              ref={contentTextareaRef}
              placeholder="Start writing your note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-full bg-transparent border-none outline-none resize-none text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 leading-relaxed"
            />
          </div>

          {/* Tags */}
          <div className="p-6 pt-0 border-t border-gray-200 dark:border-gray-700">
            <div className="mb-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <Hash className="w-4 h-4 mr-1" />
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(tag.name)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all ${
                      selectedTags.includes(tag.name)
                        ? 'text-white shadow-md transform scale-105'
                        : 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                    style={{
                      backgroundColor: selectedTags.includes(tag.name) ? tag.color : undefined,
                    }}
                  >
                    <Hash className="w-3 h-3 mr-1" />
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
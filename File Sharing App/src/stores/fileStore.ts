import { create } from 'zustand';
import { FileItem, FileState, UploadProgress } from '../types';

interface FileStore extends FileState {
  addFile: (file: FileItem) => void;
  removeFile: (fileId: string) => void;
  updateUploadProgress: (progress: UploadProgress) => void;
  removeUploadProgress: (fileId: string) => void;
  setFiles: (files: FileItem[]) => void;
  setLoading: (loading: boolean) => void;
  incrementDownloadCount: (fileId: string) => void;
}

// Mock data for demonstration
const mockFiles: FileItem[] = [
  {
    id: '1',
    name: 'presentation.pdf',
    size: 2048576, // 2MB
    type: 'application/pdf',
    url: 'https://example.com/files/presentation.pdf',
    shareId: 'abc123',
    userId: '1',
    uploadedAt: new Date(Date.now() - 86400000), // 1 day ago
    expiresAt: new Date(Date.now() + 86400000 * 6), // 6 days from now
    downloadCount: 15,
    isPasswordProtected: false,
    downloadLimit: 100,
  },
  {
    id: '2',
    name: 'vacation-photos.zip',
    size: 15728640, // 15MB
    type: 'application/zip',
    url: 'https://example.com/files/vacation-photos.zip',
    shareId: 'def456',
    userId: '1',
    uploadedAt: new Date(Date.now() - 3600000 * 3), // 3 hours ago
    downloadCount: 3,
    isPasswordProtected: true,
    password: 'secret123',
  },
];

export const useFileStore = create<FileStore>((set, get) => ({
  files: mockFiles,
  uploadProgress: [],
  isLoading: false,

  addFile: (file: FileItem) => {
    set(state => ({ files: [...state.files, file] }));
  },

  removeFile: (fileId: string) => {
    set(state => ({ files: state.files.filter(f => f.id !== fileId) }));
  },

  updateUploadProgress: (progress: UploadProgress) => {
    set(state => {
      const existing = state.uploadProgress.findIndex(p => p.fileId === progress.fileId);
      if (existing >= 0) {
        const updated = [...state.uploadProgress];
        updated[existing] = progress;
        return { uploadProgress: updated };
      }
      return { uploadProgress: [...state.uploadProgress, progress] };
    });
  },

  removeUploadProgress: (fileId: string) => {
    set(state => ({
      uploadProgress: state.uploadProgress.filter(p => p.fileId !== fileId)
    }));
  },

  setFiles: (files: FileItem[]) => {
    set({ files });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  incrementDownloadCount: (fileId: string) => {
    set(state => ({
      files: state.files.map(file =>
        file.id === fileId
          ? { ...file, downloadCount: file.downloadCount + 1 }
          : file
      )
    }));
  },
}));
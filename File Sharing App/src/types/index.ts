export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  shareId: string;
  userId: string;
  uploadedAt: Date;
  expiresAt?: Date;
  downloadCount: number;
  isPasswordProtected: boolean;
  password?: string;
  downloadLimit?: number;
}

export interface ShareLink {
  id: string;
  fileId: string;
  shareUrl: string;
  qrCodeUrl: string;
  isPasswordProtected: boolean;
  downloadCount: number;
  downloadLimit?: number;
  expiresAt?: Date;
  createdAt: Date;
}

export interface UploadProgress {
  fileId: string;
  fileName: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

export type Theme = 'light' | 'dark';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface FileState {
  files: FileItem[];
  uploadProgress: UploadProgress[];
  isLoading: boolean;
}
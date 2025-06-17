import React, { useState, useEffect } from 'react';
import { Save, FolderOpen, Trash2, Calendar, X } from 'lucide-react';
import { useMemeStore, MemeProject } from '../store/memeStore';

interface ProjectManagerProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'save' | 'load';
}

export const ProjectManager: React.FC<ProjectManagerProps> = ({ isOpen, onClose, mode }) => {
  const { saveProject, loadProject, clearCanvas } = useMemeStore();
  const [projects, setProjects] = useState<MemeProject[]>([]);
  const [projectName, setProjectName] = useState('');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadProjects();
    }
  }, [isOpen]);

  const loadProjects = () => {
    const savedProjects = JSON.parse(localStorage.getItem('meme-projects') || '[]');
    setProjects(savedProjects.sort((a: MemeProject, b: MemeProject) => b.updatedAt - a.updatedAt));
  };

  const handleSave = () => {
    if (projectName.trim()) {
      saveProject(projectName.trim());
      onClose();
      setProjectName('');
      loadProjects();
    }
  };

  const handleLoad = (project: MemeProject) => {
    loadProject(project);
    onClose();
  };

  const handleDelete = (projectId: string) => {
    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem('meme-projects', JSON.stringify(updatedProjects));
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {mode === 'save' ? (
              <Save className="h-6 w-6 text-primary-600" />
            ) : (
              <FolderOpen className="h-6 w-6 text-primary-600" />
            )}
            <h2 className="text-xl font-semibold text-gray-900">
              {mode === 'save' ? 'Save Project' : 'Load Project'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {mode === 'save' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter project name..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSave()}
                />
                <button
                  onClick={handleSave}
                  disabled={!projectName.trim()}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          <div className="space-y-1 max-h-96 overflow-y-auto">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              {projects.length > 0 ? 'Saved Projects' : 'No saved projects yet'}
            </h3>
            
            {projects.map((project) => (
              <div
                key={project.id}
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedProject === project.id
                    ? 'border-primary-300 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => mode === 'load' ? handleLoad(project) : setSelectedProject(project.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3">
                    {project.imageUrl && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={project.imageUrl}
                          alt="Project thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {project.name}
                      </h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(project.updatedAt)}
                        </div>
                        <span className="text-xs text-gray-500">
                          {project.textElements.length} text element{project.textElements.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(project.id);
                  }}
                  className="p-2 text-gray-400 hover:text-error-500 rounded-lg hover:bg-error-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            
            {projects.length === 0 && (
              <div className="text-center py-12">
                <FolderOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  {mode === 'save' 
                    ? 'Your saved projects will appear here' 
                    : 'No projects to load yet'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
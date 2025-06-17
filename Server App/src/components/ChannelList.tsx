import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Hash, Plus, Settings, Trash2 } from 'lucide-react';

export const ChannelList: React.FC = () => {
  const { 
    getCurrentServer, 
    currentChannelId, 
    setCurrentChannel, 
    addChannel, 
    deleteChannel 
  } = useApp();
  const [showAddChannel, setShowAddChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [newChannelDescription, setNewChannelDescription] = useState('');

  const server = getCurrentServer();

  if (!server) return null;

  const handleAddChannel = () => {
    if (newChannelName.trim()) {
      addChannel(server.id, newChannelName.trim(), newChannelDescription.trim() || undefined);
      setNewChannelName('');
      setNewChannelDescription('');
      setShowAddChannel(false);
    }
  };

  const handleDeleteChannel = (channelId: string) => {
    if (server.channels.length > 1) {
      deleteChannel(server.id, channelId);
    }
  };

  return (
    <div className="w-72 bg-neutral-50 border-r border-neutral-200 flex flex-col">
      {/* Server Header */}
      <div className="p-4 border-b border-neutral-200 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-neutral-900">{server.name}</h1>
            <p className="text-sm text-neutral-600">{server.description}</p>
          </div>
          <button className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700 transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Channels */}
      <div className="flex-1 p-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            Text Channels
          </h2>
          <button
            onClick={() => setShowAddChannel(!showAddChannel)}
            className="p-1 rounded hover:bg-neutral-200 text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Add Channel Form */}
        {showAddChannel && (
          <div className="mb-3 p-3 bg-white rounded-xl border border-neutral-200 shadow-soft">
            <input
              type="text"
              placeholder="Channel name"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
              className="w-full p-2 mb-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleAddChannel()}
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={newChannelDescription}
              onChange={(e) => setNewChannelDescription(e.target.value)}
              className="w-full p-2 mb-3 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleAddChannel()}
            />
            <div className="flex space-x-2">
              <button
                onClick={handleAddChannel}
                className="px-3 py-1.5 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
              >
                Create
              </button>
              <button
                onClick={() => setShowAddChannel(false)}
                className="px-3 py-1.5 bg-neutral-200 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Channel List */}
        <div className="space-y-1">
          {server.channels.map((channel) => (
            <div key={channel.id} className="group relative">
              <button
                onClick={() => setCurrentChannel(channel.id)}
                className={`
                  w-full flex items-center p-2 rounded-lg text-left transition-colors
                  ${currentChannelId === channel.id
                    ? 'bg-primary-100 text-primary-900'
                    : 'text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
                  }
                `}
              >
                <Hash className="w-4 h-4 mr-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{channel.name}</div>
                  {channel.description && (
                    <div className="text-xs text-neutral-500 truncate">
                      {channel.description}
                    </div>
                  )}
                </div>
              </button>
              
              {server.channels.length > 1 && (
                <button
                  onClick={() => handleDeleteChannel(channel.id)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-error hover:text-white text-neutral-400 transition-all"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Members */}
      <div className="p-3 border-t border-neutral-200">
        <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
          Members — {server.members.length}
        </h3>
        <div className="space-y-1">
          {server.members.slice(0, 5).map((member) => (
            <div key={member.id} className="flex items-center space-x-2 p-1">
              <div className="relative">
                <div className="w-6 h-6 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                  {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div className={`
                  absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-white
                  ${member.status === 'online' ? 'bg-secondary-500' : 
                    member.status === 'away' ? 'bg-accent-500' : 'bg-neutral-400'}
                `} />
              </div>
              <span className="text-sm text-neutral-700 truncate">{member.name}</span>
            </div>
          ))}
          {server.members.length > 5 && (
            <div className="text-xs text-neutral-500 pl-8">
              +{server.members.length - 5} more
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
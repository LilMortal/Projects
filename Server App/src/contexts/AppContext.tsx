import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, Server, Channel, Message } from '../types';
import { mockServers, currentUser } from '../data/mockData';

interface AppContextType extends AppState {
  setCurrentServer: (serverId: string) => void;
  setCurrentChannel: (channelId: string) => void;
  addMessage: (channelId: string, content: string) => void;
  addChannel: (serverId: string, name: string, description?: string) => void;
  deleteChannel: (serverId: string, channelId: string) => void;
  deleteMessage: (channelId: string, messageId: string) => void;
  getCurrentServer: () => Server | undefined;
  getCurrentChannel: () => Channel | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('wavespace-data');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert timestamp strings back to Date objects
      parsed.servers = parsed.servers.map((server: Server) => ({
        ...server,
        channels: server.channels.map((channel: Channel) => ({
          ...channel,
          messages: channel.messages.map((message: Message) => ({
            ...message,
            timestamp: new Date(message.timestamp)
          }))
        }))
      }));
      return parsed;
    }
    return {
      servers: mockServers,
      currentServerId: mockServers[0]?.id || null,
      currentChannelId: mockServers[0]?.channels[0]?.id || null,
      currentUser
    };
  });

  useEffect(() => {
    localStorage.setItem('wavespace-data', JSON.stringify(state));
  }, [state]);

  const setCurrentServer = (serverId: string) => {
    const server = state.servers.find(s => s.id === serverId);
    if (server) {
      setState(prev => ({
        ...prev,
        currentServerId: serverId,
        currentChannelId: server.channels[0]?.id || null
      }));
    }
  };

  const setCurrentChannel = (channelId: string) => {
    setState(prev => ({
      ...prev,
      currentChannelId: channelId
    }));
  };

  const addMessage = (channelId: string, content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      userId: currentUser.id,
      timestamp: new Date()
    };

    setState(prev => ({
      ...prev,
      servers: prev.servers.map(server => ({
        ...server,
        channels: server.channels.map(channel =>
          channel.id === channelId
            ? { ...channel, messages: [...channel.messages, newMessage] }
            : channel
        )
      }))
    }));
  };

  const addChannel = (serverId: string, name: string, description?: string) => {
    const newChannel: Channel = {
      id: `channel-${Date.now()}`,
      name: name.toLowerCase().replace(/\s+/g, '-'),
      description,
      type: 'text',
      messages: []
    };

    setState(prev => ({
      ...prev,
      servers: prev.servers.map(server =>
        server.id === serverId
          ? { ...server, channels: [...server.channels, newChannel] }
          : server
      )
    }));
  };

  const deleteChannel = (serverId: string, channelId: string) => {
    setState(prev => {
      const server = prev.servers.find(s => s.id === serverId);
      if (server && server.channels.length <= 1) return prev; // Don't delete if it's the only channel

      const newState = {
        ...prev,
        servers: prev.servers.map(server =>
          server.id === serverId
            ? { ...server, channels: server.channels.filter(c => c.id !== channelId) }
            : server
        )
      };

      // If current channel is being deleted, switch to first available channel
      if (prev.currentChannelId === channelId) {
        const updatedServer = newState.servers.find(s => s.id === serverId);
        newState.currentChannelId = updatedServer?.channels[0]?.id || null;
      }

      return newState;
    });
  };

  const deleteMessage = (channelId: string, messageId: string) => {
    setState(prev => ({
      ...prev,
      servers: prev.servers.map(server => ({
        ...server,
        channels: server.channels.map(channel =>
          channel.id === channelId
            ? { ...channel, messages: channel.messages.filter(m => m.id !== messageId) }
            : channel
        )
      }))
    }));
  };

  const getCurrentServer = () => {
    return state.servers.find(s => s.id === state.currentServerId);
  };

  const getCurrentChannel = () => {
    const server = getCurrentServer();
    return server?.channels.find(c => c.id === state.currentChannelId);
  };

  const value: AppContextType = {
    ...state,
    setCurrentServer,
    setCurrentChannel,
    addMessage,
    addChannel,
    deleteChannel,
    deleteMessage,
    getCurrentServer,
    getCurrentChannel
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
import React from 'react';
import { ServerList } from './ServerList';
import { ChannelList } from './ChannelList';
import { MessagePanel } from './MessagePanel';

export const Layout: React.FC = () => {
  return (
    <div className="h-screen flex bg-white overflow-hidden">
      {/* Server List - Always visible */}
      <ServerList />
      
      {/* Channel List - Hidden on mobile when not needed */}
      <div className="hidden md:block">
        <ChannelList />
      </div>
      
      {/* Message Panel - Takes remaining space */}
      <MessagePanel />
    </div>
  );
};
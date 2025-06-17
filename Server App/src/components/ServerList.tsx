import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Hash } from 'lucide-react';

export const ServerList: React.FC = () => {
  const { servers, currentServerId, setCurrentServer } = useApp();

  return (
    <div className="w-18 bg-neutral-100 flex flex-col items-center py-3 space-y-2 border-r border-neutral-200">
      {servers.map((server) => (
        <button
          key={server.id}
          onClick={() => setCurrentServer(server.id)}
          className={`
            w-12 h-12 
            rounded-2xl 
            flex items-center justify-center 
            text-xl font-medium
            transition-all duration-200 ease-out
            hover:rounded-xl
            shadow-soft hover:shadow-medium
            ${currentServerId === server.id
              ? 'bg-primary-500 text-white rounded-xl shadow-medium' 
              : 'bg-white text-neutral-700 hover:bg-primary-100'
            }
          `}
          title={server.name}
        >
          {server.icon || <Hash className="w-5 h-5" />}
        </button>
      ))}
      
      <div className="w-8 h-px bg-neutral-300 my-2" />
      
      <button
        className="
          w-12 h-12 
          bg-white 
          rounded-2xl 
          flex items-center justify-center 
          text-neutral-400 hover:text-secondary-500
          transition-all duration-200 ease-out
          hover:rounded-xl hover:bg-secondary-50
          shadow-soft hover:shadow-medium
        "
        title="Add Server"
      >
        <span className="text-2xl font-light">+</span>
      </button>
    </div>
  );
};
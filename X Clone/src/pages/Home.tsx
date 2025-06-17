import React from 'react';
import ChirpComposer from '../components/ChirpComposer';
import ChirpCard from '../components/ChirpCard';
import { useChirpContext } from '../context/ChirpContext';

const Home: React.FC = () => {
  const { chirps } = useChirpContext();

  return (
    <div className="py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Home</h1>
        <p className="text-gray-600">See what's happening in your world</p>
      </div>
      
      <ChirpComposer />
      
      <div className="space-y-4">
        {chirps.map((chirp) => (
          <ChirpCard key={chirp.id} chirp={chirp} />
        ))}
      </div>
      
      {chirps.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No chirps yet</div>
          <p className="text-gray-500 text-sm">Be the first to share something!</p>
        </div>
      )}
    </div>
  );
};

export default Home;
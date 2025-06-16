import React from 'react';
import Calculator from './components/Calculator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%221%22 fill=%22rgba(255,255,255,0.05)%22/%3E%3C/svg%3E')] opacity-20"></div>
      <div className="relative z-10">
        <Calculator />
      </div>
    </div>
  );
}

export default App;
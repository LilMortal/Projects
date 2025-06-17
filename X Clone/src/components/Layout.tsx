import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-violet-50">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 pb-20 md:pb-8 md:pt-20">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default Layout;
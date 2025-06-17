import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Home, Menu, Clock } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export const Header: React.FC = () => {
  const location = useLocation();
  const { getItemCount, toggleCart } = useCartStore();
  const cartItemCount = getItemCount();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/menu', icon: Menu, label: 'Menu' },
    { path: '/orders', icon: Clock, label: 'Orders' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-soft border-b border-neutral-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary-600 hover:text-primary-700 transition-colors">
            <div className="w-8 h-8 bg-primary-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-sm font-bold">Y</span>
            </div>
            YumBasket
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-50'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Cart Button */}
          <button
            onClick={toggleCart}
            className="relative flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-all duration-200 shadow-soft hover:shadow-medium"
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-bounce-subtle">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden border-t border-neutral-100 bg-white">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'text-primary-600'
                  : 'text-neutral-500 hover:text-primary-600'
              }`}
            >
              <item.icon size={20} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};
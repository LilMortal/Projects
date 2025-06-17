import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-sm font-bold">Y</span>
              </div>
              <span className="font-bold text-xl text-primary-600">YumBasket</span>
            </div>
            <p className="text-neutral-600">
              Delicious food delivered fresh to your doorstep. Made with love, served with care.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-neutral-800">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-neutral-600">
                <Phone size={16} />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-600">
                <Mail size={16} />
                <span>hello@yumbasket.com</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-600">
                <MapPin size={16} />
                <span>123 Food Street, Flavor City</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="font-semibold text-neutral-800">Delivery Hours</h3>
            <div className="space-y-2 text-neutral-600">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span className="font-medium">Mon - Fri:</span>
              </div>
              <p className="ml-6">11:00 AM - 10:00 PM</p>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span className="font-medium">Sat - Sun:</span>
              </div>
              <p className="ml-6">10:00 AM - 11:00 PM</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-neutral-800">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="block text-neutral-600 hover:text-primary-600 transition-colors">
                About Us
              </a>
              <a href="#" className="block text-neutral-600 hover:text-primary-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-neutral-600 hover:text-primary-600 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="block text-neutral-600 hover:text-primary-600 transition-colors">
                Help & Support
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200 mt-8 pt-8 text-center text-neutral-500">
          <p>&copy; 2024 YumBasket. All rights reserved. Made with ❤️ for food lovers.</p>
        </div>
      </div>
    </footer>
  );
};
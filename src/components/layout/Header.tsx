import React, { useState } from 'react';
import { Bell, Home, Calendar, Image, User, Menu, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import AuthModal from '../auth/AuthModal';

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">ISE Hub</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <NavLink icon={<Home className="w-5 h-5" />} label="Home" />
            <NavLink icon={<Calendar className="w-5 h-5" />} label="Events" />
            <NavLink icon={<Image className="w-5 h-5" />} label="Gallery" />
            <NavLink icon={<Bell className="w-5 h-5" />} label="Notifications" />
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-700">{user?.name}</span>
                </div>
                <button
                  onClick={() => logout()}
                  className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600"
              >
                <User className="w-5 h-5" />
                <span>Sign In</span>
              </button>
            )}
          </nav>

          <button className="md:hidden p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
}

function NavLink({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <a
      href="#"
      className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition-colors"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
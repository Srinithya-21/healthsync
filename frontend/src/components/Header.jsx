// Header Component
import React, { useState } from 'react';
import { FiMoon, FiSun, FiBell } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30 px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Left side */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome back, {user?.name}! 👋
          </h2>
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <FiBell size={24} />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
          </button>

          {/* User Avatar */}
          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
            {user?.name?.[0] || 'U'}
          </div>
        </div>
      </div>
    </header>
  );
}

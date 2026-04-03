// Sidebar Navigation Component
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiTrendingUp, FiLeaf, FiCalendar, FiMessageCircle, FiCamera, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: FiHome },
    { path: '/fitness', label: 'Fitness', icon: FiTrendingUp },
    { path: '/nutrition', label: 'Nutrition', icon: FiLeaf },
    { path: '/period', label: 'Period Tracker', icon: FiCalendar },
    { path: '/chatbot', label: 'AI Chatbot', icon: FiMessageCircle },
    { path: '/skin-analysis', label: 'Skin Scanner', icon: FiCamera },
    { path: '/profile', label: 'Profile', icon: FiUser },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-pink-500 text-white p-2 rounded-lg"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed md:static md:translate-x-0 transition-transform duration-300 w-64 h-screen bg-gradient-to-b from-pink-500 to-pink-600 text-white flex flex-col shadow-lg z-40`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-pink-400">
          <h1 className="text-2xl font-bold">💪 HealthSync</h1>
          <p className="text-xs text-pink-100 mt-1">Your Health Companion</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-6 py-3 transition-colors ${
                  isActive(item.path)
                    ? 'bg-white/20 border-r-4 border-white'
                    : 'hover:bg-white/10'
                }`}
              >
                <Icon size={20} className="mr-3" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-6 border-t border-pink-400">
          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="w-full flex items-center justify-center bg-white text-pink-600 py-2 rounded-lg font-semibold hover:bg-pink-50 transition-colors"
          >
            <FiLogOut size={20} className="mr-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

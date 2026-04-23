import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Menu, X, Users, PlusCircle, FileText, Layout, Settings, BarChart3, LogIn, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();

  const navLinks = [
    { name: t('navbar.usersList'), path: '/', icon: <Users size={18} />, protected: true },
    { name: t('navbar.addNewUser'), path: '/add-user', icon: <PlusCircle size={18} />, protected: true },
    { name: t('navbar.charts'), path: '/charts', icon: <BarChart3 size={18} />, protected: true },
    { name: t('navbar.posts'), path: '/posts', icon: <FileText size={18} />, protected: false },
    { name: t('navbar.postsPerUser'), path: '/user-posts', icon: <Layout size={18} />, protected: false },
    { name: t('navbar.postsChart'), path: '/posts-chart', icon: <BarChart3 size={18} />, protected: true },
    { name: t('navbar.settings'), path: '/settings', icon: <Settings size={18} />, protected: true },
  ];

  const visibleLinks = navLinks.filter(link =>
    !link.protected || (isAuthenticated && link.protected)
  );

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center">
            <span className="text-3xl font-black bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              UPM.
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {visibleLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                  }`
                }
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            ))}

            {!isAuthenticated ? (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-6 py-2 rounded-xl font-semibold border-2 transition-all duration-300 ${
                    isActive
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg'
                      : 'border-indigo-500 text-indigo-700 hover:border-indigo-600 hover:bg-indigo-50'
                  }`
                }
              >
                <LogIn size={18} />
                <span>Login</span>
              </NavLink>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <div className="text-sm text-gray-600 font-medium">
                  Hi, {user?.email?.split('@')[0] || 'User'}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-rose-500 to-rose-600 text-white rounded-xl font-semibold hover:from-rose-600 hover:to-rose-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-linear-to-r from-rose-500 to-rose-600 text-white rounded-xl font-semibold hover:from-rose-600 hover:to-rose-700 shadow-lg hover:shadow-xl transition-all text-sm"
              >
                Logout
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none transition-all"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 pt-2 pb-6 space-y-2 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-2xl">
          {visibleLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-6 py-4 rounded-2xl font-semibold transition-all ${
                  isActive
                    ? 'bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-xl'
                    : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                }`
              }
            >
              <div className="flex items-center gap-3">
                {link.icon}
                <span>{link.name}</span>
              </div>
            </NavLink>
          ))}
          {!isAuthenticated && (
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block px-6 py-4 rounded-2xl font-semibold border-2 border-indigo-500 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-600 transition-all"
            >
              <div className="flex items-center gap-3">
                <LogIn size={18} />
                <span>Login</span>
              </div>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
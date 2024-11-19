import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, LogIn, UserPlus, LogOut, User, Cog, Sun, Moon } from 'lucide-react';
import useAuthStore from "../store/authStore";
import useThemeStore from "../store/themeStore";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">SadaqaSafar</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/ngos" className="text-gray-500 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">
              NGOs
            </Link>
            {user?.role === "ngo" && (
              <Link
                to="/dashboard"
                className="text-gray-500 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                Dashboard
              </Link>
            )}
            {user?.role === "user" && (
              <Link
                to="/donations"
                className="text-gray-500 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                My Donations
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {user ? (
              <>
                <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-300">
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg text-gray-500 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/AppSetting"
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg text-gray-500 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <Cog className="h-5 w-5" />
                  <span>App Setting</span>
                </Link>
                <Link
                  to="/login"
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg text-gray-500 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
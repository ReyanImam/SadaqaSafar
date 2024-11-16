import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-bold text-gray-800">SadaqaSafar</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/ngos" className="text-gray-600 hover:text-emerald-600">
              NGOs
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-emerald-600">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-emerald-600">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="flex items-center space-x-1 px-4 py-2 rounded-lg text-gray-600 hover:text-emerald-600"
            >
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </Link>
            <Link
              to="/register"
              className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <UserPlus className="h-5 w-5" />
              <span>Register</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
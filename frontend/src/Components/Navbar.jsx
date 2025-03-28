import React from "react";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <div className="bg-white p-2 rounded-full">
          <span className="text-purple-600 font-bold text-xl">☸</span>
        </div>
        <span className="text-lg font-bold">Spiritual Path</span>
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-6 text-white">
        <li><a href="/dashboard" className="hover:text-yellow-300">Home</a></li>
        <li><a href="/video" className="hover:text-yellow-300">Video</a></li>
        <li><a href="/teachings" className="hover:text-yellow-300">Teachings</a></li>
        <li><a href="#" className="hover:text-yellow-300">Quiz</a></li>
        <li><a href="/contact" className="hover:text-yellow-300">Contact</a></li>
      </ul>

      {/* Search and Donate Button */}
      <div className="flex items-center space-x-4">
        <button className="text-white hover:text-yellow-300">
          <FaSearch size={18} />
        </button>

      </div>
    </nav>
  );
};

export default Navbar;

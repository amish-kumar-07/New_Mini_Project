import React, { useState } from "react";
import { Link } from "react-router-dom";
import SpiritualLogo from "./SpiritualLogo"; // ✅ Make sure the path is correct
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
        <div className="p-1">
            <SpiritualLogo />
          </div>

          <span className="text-xl font-semibold tracking-wide">
            Sacramental Learning
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-white font-medium">
          <li>
            <Link to="/dashboard" className="hover:text-yellow-300 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/video" className="hover:text-yellow-300 transition">
              Video
            </Link>
          </li>
          <li>
            <Link to="/teachings" className="hover:text-yellow-300 transition">
              Teachings
            </Link>
          </li>
          <li>
            <Link to="/quiz" className="hover:text-yellow-300 transition">
              Quiz
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-300 transition">
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <HiX className="h-7 w-7 text-white" />
            ) : (
              <HiMenuAlt3 className="h-7 w-7 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu List */}
      {menuOpen && (
        <ul className="md:hidden px-6 pb-4 space-y-4 text-white font-medium">
          <li>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/video" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">
              Video
            </Link>
          </li>
          <li>
            <Link to="/teachings" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">
              Teachings
            </Link>
          </li>
          <li>
            <Link to="/quiz" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">
              Quiz
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">
              Contact
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

/**
 * Navigation bar component
 */
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-lg">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
              <span className="text-purple-600 font-extrabold text-lg sm:text-xl">
                CS
              </span>
            </div>
            <span className="font-bold text-base sm:text-xl hidden md:inline">
              Customer Segmentation
            </span>
            <span className="font-bold text-base md:hidden">CS AI</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-xl transition-all transform text-base font-semibold ${
                isActive("/")
                  ? "bg-white text-purple-600 shadow-lg scale-105"
                  : "hover:bg-white/20 hover:scale-105"
              }`}>
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-xl transition-all transform text-base font-semibold ${
                isActive("/dashboard")
                  ? "bg-white text-purple-600 shadow-lg scale-105"
                  : "hover:bg-white/20 hover:scale-105"
              }`}>
              Dashboard
            </Link>
            <Link
              to="/history"
              className={`px-4 py-2 rounded-xl transition-all transform text-base font-semibold ${
                isActive("/history")
                  ? "bg-white text-purple-600 shadow-lg scale-105"
                  : "hover:bg-white/20 hover:scale-105"
              }`}>
              History
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-xl transition-all transform text-base font-semibold ${
                isActive("/about")
                  ? "bg-white text-purple-600 shadow-lg scale-105"
                  : "hover:bg-white/20 hover:scale-105"
              }`}>
              About
            </Link>
            <Link
              to="/documentation"
              className={`px-4 py-2 rounded-xl transition-all transform text-base font-semibold ${
                isActive("/documentation")
                  ? "bg-white text-purple-600 shadow-lg scale-105"
                  : "hover:bg-white/20 hover:scale-105"
              }`}>
              Docs
            </Link>
            <Link
              to="/settings"
              className={`px-4 py-2 rounded-xl transition-all transform text-base font-semibold ${
                isActive("/settings")
                  ? "bg-white text-purple-600 shadow-lg scale-105"
                  : "hover:bg-white/20 hover:scale-105"
              }`}>
              Settings
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden px-3 py-2 rounded-xl hover:bg-white/20 transition-all">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden pb-4 animate-fadeIn">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2 rounded-xl transition-all text-sm font-semibold ${
                  isActive("/")
                    ? "bg-white text-purple-600 shadow-lg"
                    : "hover:bg-white/20"
                }`}>
                🏠 Home
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2 rounded-xl transition-all text-sm font-semibold ${
                  isActive("/dashboard")
                    ? "bg-white text-purple-600 shadow-lg"
                    : "hover:bg-white/20"
                }`}>
                📊 Dashboard
              </Link>
              <Link
                to="/history"
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2 rounded-xl transition-all text-sm font-semibold ${
                  isActive("/history")
                    ? "bg-white text-purple-600 shadow-lg"
                    : "hover:bg-white/20"
                }`}>
                🕐 History
              </Link>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2 rounded-xl transition-all text-sm font-semibold ${
                  isActive("/about")
                    ? "bg-white text-purple-600 shadow-lg"
                    : "hover:bg-white/20"
                }`}>
                ℹ️ About
              </Link>
              <Link
                to="/documentation"
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2 rounded-xl transition-all text-sm font-semibold ${
                  isActive("/documentation")
                    ? "bg-white text-purple-600 shadow-lg"
                    : "hover:bg-white/20"
                }`}>
                📚 Documentation
              </Link>
              <Link
                to="/settings"
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2 rounded-xl transition-all text-sm font-semibold ${
                  isActive("/settings")
                    ? "bg-white text-purple-600 shadow-lg"
                    : "hover:bg-white/20"
                }`}>
                ⚙️ Settings
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

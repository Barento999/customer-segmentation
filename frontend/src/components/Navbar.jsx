/**
 * Navigation bar component
 */
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 text-text-primary shadow-2xl sticky top-0 z-50 backdrop-blur-lg border-b border-gray-200">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <span className="text-text-primary font-extrabold text-lg sm:text-xl drop-shadow-lg">
                CS
              </span>
            </div>
            <span className="font-bold text-base sm:text-xl hidden md:inline drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
              Customer Segmentation
            </span>
            <span className="font-bold text-base md:hidden drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-pink-200">
              CS AI
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                {user?.role === "admin" && (
                  <Link
                    to="/admin/dashboard"
                    className={`px-4 py-2 rounded-xl transition-all transform text-base font-semibold ${
                      isActive("/admin/dashboard")
                        ? "bg-orange-500 text-text-primary shadow-lg scale-105"
                        : "bg-orange-500/80 text-text-primary hover:bg-orange-500 hover:scale-105"
                    }`}>
                    👑 Admin
                  </Link>
                )}

                <Link
                  to="/"
                  className={`px-4 py-2 rounded-xl transition-all transform text-base font-semibold ${
                    isActive("/")
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-text-primary shadow-lg scale-105"
                      : "hover:bg-purple-800/50 hover:scale-105"
                  }`}>
                  Home
                </Link>
                <Link
                  to="/dashboard"
                  className={`px-4 py-2 rounded-xl transition-all transform text-base font-semibold ${
                    isActive("/dashboard")
                      ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-text-primary shadow-lg scale-105"
                      : "hover:bg-purple-800/50 hover:scale-105"
                  }`}>
                  Dashboard
                </Link>
                <Link
                  to="/history"
                  className={`px-4 py-2 rounded-xl transition-all transform text-base font-semibold ${
                    isActive("/history")
                      ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-text-primary shadow-lg scale-105"
                      : "hover:bg-purple-800/50 hover:scale-105"
                  }`}>
                  History
                </Link>
                <Link
                  to="/settings"
                  className={`px-4 py-2 rounded-xl transition-all transform text-base font-semibold ${
                    isActive("/settings")
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-text-primary shadow-lg scale-105"
                      : "hover:bg-purple-800/50 hover:scale-105"
                  }`}>
                  Settings
                </Link>
              </>
            ) : null}
            <Link
              to="/about"
              className={`px-4 py-2 rounded-xl transition-all transform text-base font-semibold ${
                isActive("/about")
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-text-primary shadow-lg scale-105"
                  : "hover:bg-purple-800/50 hover:scale-105"
              }`}>
              About
            </Link>
            <Link
              to="/documentation"
              className={`px-4 py-2 rounded-xl transition-all transform text-base font-semibold ${
                isActive("/documentation")
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-text-primary shadow-lg scale-105"
                  : "hover:bg-purple-800/50 hover:scale-105"
              }`}>
              Docs
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative ml-2">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-purple-800/50 hover:bg-purple-700/50 transition-all">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-text-primary font-bold text-sm">
                      {user?.username?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                  <span className="font-semibold">{user?.username}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl py-2 animate-fadeIn">
                    {user?.role === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-orange-600 font-semibold hover:bg-orange-50 transition-colors">
                        👑 Admin Dashboard
                      </Link>
                    )}
                    <Link
                      to="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-purple-50 transition-colors">
                      👤 Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50 transition-colors">
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl bg-purple-800/50 hover:bg-purple-700/50 transition-all font-semibold">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all font-semibold shadow-lg">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden px-3 py-2 rounded-xl hover:bg-purple-800/50 transition-all">
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
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 bg-purple-800/30 rounded-xl mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-text-primary font-bold text-sm">
                          {user?.username?.charAt(0).toUpperCase() || "U"}
                        </span>
                      </div>
                      <span className="font-semibold">{user?.username}</span>
                      {user?.role === "admin" && (
                        <span className="text-xs bg-orange-500 px-2 py-1 rounded-full">
                          Admin
                        </span>
                      )}
                    </div>
                  </div>
                  <Link
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    className={`px-4 py-2 rounded-xl transition-all text-sm font-semibold ${
                      isActive("/")
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-text-primary shadow-lg"
                        : "hover:bg-purple-800/50"
                    }`}>
                    🏠 Home
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className={`px-4 py-2 rounded-xl transition-all text-sm font-semibold ${
                      isActive("/dashboard")
                        ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-text-primary shadow-lg"
                        : "hover:bg-purple-800/50"
                    }`}>
                    📊 Dashboard
                  </Link>
                  <Link
                    to="/history"
                    onClick={() => setMenuOpen(false)}
                    className={`px-4 py-2 rounded-xl transition-all text-sm font-semibold ${
                      isActive("/history")
                        ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-text-primary shadow-lg"
                        : "hover:bg-purple-800/50"
                    }`}>
                    🕐 History
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setMenuOpen(false)}
                    className={`px-4 py-2 rounded-xl transition-all text-sm font-semibold ${
                      isActive("/settings")
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-text-primary shadow-lg"
                        : "hover:bg-purple-800/50"
                    }`}>
                    ⚙️ Settings
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className={`px-4 py-2 rounded-xl transition-all text-sm font-semibold ${
                      isActive("/profile")
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-text-primary shadow-lg"
                        : "hover:bg-purple-800/50"
                    }`}>
                    👤 Profile
                  </Link>
                  {user?.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className={`px-4 py-2 rounded-xl transition-all text-sm font-semibold ${
                        isActive("/admin/dashboard")
                          ? "bg-orange-500 text-text-primary shadow-lg"
                          : "bg-orange-500/80 text-text-primary hover:bg-orange-500"
                      }`}>
                      👑 Admin Dashboard
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-2 rounded-xl bg-purple-800/50 hover:bg-purple-700/50 transition-all text-sm font-semibold">
                    🔑 Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all text-sm font-semibold shadow-lg">
                    ✨ Sign Up
                  </Link>
                </>
              )}
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2 rounded-xl transition-all text-sm font-semibold ${
                  isActive("/about")
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-text-primary shadow-lg"
                    : "hover:bg-purple-800/50"
                }`}>
                ℹ️ About
              </Link>
              <Link
                to="/documentation"
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2 rounded-xl transition-all text-sm font-semibold ${
                  isActive("/documentation")
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-text-primary shadow-lg"
                    : "hover:bg-purple-800/50"
                }`}>
                📚 Documentation
              </Link>
              {isAuthenticated && (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 transition-all text-sm font-semibold text-left">
                  🚪 Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

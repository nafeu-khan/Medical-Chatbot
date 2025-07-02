import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import useTheme from "../hooks/useTheme";
import Cookies from "js-cookie";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const token = Cookies.get("access_token");
    setIsLoggedIn(!!token);
  }, [location.pathname]); 
  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    navigate("/signin");
  };

  return (
    <div className="w-full border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-900 dark:text-white">
      <div className="flex justify-between items-center px-2 py-1">
        {/* Logo */}
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <h1 className="font-mono font-bold tracking-tight text-2xl md:text-3xl">
            <span className="text-blue-500">Medical</span>
            <span className="text-green-500">AI</span>
          </h1>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-6 font-medium text-lg">
          {[
            { label: "Home", path: "/mql" },
            { label: "Chatbot", path: "/mql/chatbot" },
            { label: "Knowledge Base", path: "/mql/knowledge-base" },
          ].map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`transition-colors hover:text-blue-500 ${isActive(link.path)
                  ? "text-blue-600 font-semibold underline"
                  : ""
                  }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDark(!isDark)}
            title={isDark ? "Light Mode" : "Dark Mode"}
            className="text-xl hover:text-yellow-400 transition"
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="hidden md:block text-white border border-red-600 rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700 font-semibold transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signin"
              className="hidden md:block text-white border border-blue-600 rounded-lg bg-blue-800 px-4 py-2 hover:underline font-semibold"
            >
              Login / Sign Up
            </Link>
          )}

          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3">
          {[
            { label: "Home", path: "/mql" },
            { label: "Chatbot", path: "/mql/chatbot" },
            { label: "Knowledge Base", path: "/mql/knowledge-base" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-base font-medium hover:text-blue-500 ${isActive(link.path)
                ? "text-blue-600 font-semibold underline"
                : ""
                }`}
            >
              {link.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-center bg-red-600 hover:bg-red-700 text-white rounded px-4 py-2 font-semibold"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signin"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-blue-700 hover:bg-blue-800 text-white rounded px-4 py-2 font-semibold"
            >
              Login / Sign Up
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;

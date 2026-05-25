import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { User, Sun, Moon, Menu, X } from "lucide-react";
import toast from "react-hot-toast";
import useTheme from "../hooks/useTheme.js";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const { themeMode, toggleTheme } = useTheme();

  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
    toast.success("Logged out");
    setMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) {
      navigate("/");
      return;
    }

    navigate(`/?search=${encodeURIComponent(search.trim())}`);
    setSearch("");
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Main Navbar Row */}
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight"
          >
            DevNest
          </Link>

          {/* Desktop Search */}
          {isAuthenticated && (
            <form
              onSubmit={handleSearch}
              className="hidden md:block flex-1 max-w-md"
            >
              <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </form>
          )}

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/create-post"
                    className="px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition text-sm"
                  >
                    Create Post
                  </Link>

                  <Link
                    to="/profile"
                    className="relative group w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />

                    <span className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black dark:bg-white text-white dark:text-black text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
                      {user?.username}
                    </span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 font-medium transition"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {themeMode === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-2 text-sm"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black"
                  >
                    Search
                  </button>
                </form>
                <Link
                  to="/create-post"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black text-center"
                >
                  Create Post
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-center text-gray-700 dark:text-gray-300"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg border border-red-500 text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-center text-white"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black text-center"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

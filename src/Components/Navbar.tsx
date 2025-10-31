import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Crown, LogOut, User, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import Notifications from "./notification-bell";
import type { RootState } from "@/redux/store";

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileWrapRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  // Avatar logic - consolidated
  const avatarUrl = user?.avatar_url || user?.avatar || "";
  const isEmployeeOrClient = user?.user_type === "employee" || user?.user_type === "client";
  const isAdmin = user?.user_type === "admin";

  // Display information
  const displayName = user?.name ?? "Guest User";
  const displayEmail = user?.email ?? "—";
  const displayRole = user?.user_type === "employee"
    ? "Employee"
    : user?.user_type
    ? user.user_type.charAt(0).toUpperCase() + user.user_type.slice(1)
    : "Viewer";

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileWrapRef.current && !profileWrapRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setProfileOpen(false);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    setProfileOpen(false);
  };

  // Avatar Component
  const AvatarDisplay = ({ size = "default" }: { size?: "small" | "default" | "large" }) => {
    const sizeClasses = {
      small: "w-8 h-8",
      default: "w-9 h-9",
      large: "w-12 h-12"
    };
    const iconSizes = { small: 18, default: 22, large: 24 };

    if (avatarUrl && (isEmployeeOrClient || isAdmin)) {
      return (
        <img
          src={avatarUrl}
          className={`${sizeClasses[size]} rounded-md object-cover flex-shrink-0`}
          alt={`${displayName}'s avatar`}
        />
      );
    }

    return (
      <div className={`${sizeClasses[size]} flex items-center justify-center rounded-md flex-shrink-0 ${
        isAdmin ? "bg-blue-100" : "bg-gray-200"
      }`}>
        {isAdmin ? (
          <Crown size={iconSizes[size]} className="text-blue-600" />
        ) : (
          <User size={iconSizes[size]} className="text-gray-600" />
        )}
      </div>
    );
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="relative bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={toggleMobileMenu}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* Logo/Brand placeholder */}
              <div className="text-lg font-bold text-gray-800 hidden sm:block">
                {/* Your Logo */}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Notifications - Desktop only for admin */}
              {isAdmin && (
                <div className="hidden lg:block">
                  <Notifications />
                </div>
              )}

              {/* Profile Section */}
              <div className="relative flex items-center gap-2" ref={profileWrapRef}>
                {/* Profile Button */}
                <button
                  className="flex items-center gap-2 sm:gap-3 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setProfileOpen(!profileOpen)}
                  aria-haspopup="menu"
                  aria-expanded={profileOpen}
                  aria-label="User menu"
                >
                  <AvatarDisplay size="default" />

                  {/* User Info - Hidden on mobile */}
                  <div className="hidden md:flex flex-col items-start min-w-0 max-w-[180px]">
                    <span className="font-semibold text-sm leading-tight truncate w-full">
                      {displayName}
                    </span>
                    <span className="text-gray-500 text-xs truncate w-full">
                      {displayEmail}
                    </span>
                  </div>

                  {/* Chevron */}
                  <ChevronDown
                    size={16}
                    className={`hidden sm:block text-gray-500 transition-transform ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Desktop Quick Logout - Extra large screens only */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  aria-label="Log out"
                  className="hidden xl:flex items-center gap-2"
                >
                  <LogOut size={16} className="text-gray-600" />
                  <span className="text-sm">Logout</span>
                </Button>

                {/* Profile Dropdown */}
                {profileOpen && (
                  <div
                    role="menu"
                    className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    {/* Profile Header */}
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b">
                      <AvatarDisplay size="large" />
                      <div className="flex flex-col min-w-0 flex-1">
                        <h2 className="font-semibold text-sm truncate">{displayName}</h2>
                        <p className="text-gray-500 text-xs truncate">{displayEmail}</p>
                        <span className="inline-block mt-1.5 bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full w-fit">
                          {displayRole}
                        </span>
                      </div>
                    </div>

                    {/* Logout Button */}
                    <button
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors group"
                      onClick={handleLogout}
                      role="menuitem"
                    >
                      <div className="p-1.5 rounded-md bg-red-50 group-hover:bg-red-100 transition-colors">
                        <LogOut size={18} className="text-red-600" />
                      </div>
                      <span className="text-red-600 font-medium">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Sidebar */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-in fade-in duration-200"
            onClick={toggleMobileMenu}
            aria-hidden="true"
          />

          {/* Sidebar Panel */}
          <aside
            className="fixed top-0 left-0 w-72 sm:w-80 h-full bg-white shadow-2xl z-50 lg:hidden animate-in slide-in-from-left duration-300"
            role="dialog"
            aria-label="Mobile menu"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
              <h2 className="text-lg font-bold text-gray-800">Menu</h2>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md hover:bg-white/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-6 overflow-y-auto h-[calc(100%-73px)]">
              {/* User Profile Card */}
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <AvatarDisplay size="large" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{displayName}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{displayEmail}</p>
                    <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 font-medium px-2.5 py-1 rounded-full">
                      {displayRole}
                    </span>
                  </div>
                </div>
              </div>

              {/* Admin Notifications */}
              {isAdmin && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-700 px-1">Notifications</h3>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <Notifications />
                  </div>
                </div>
              )}

              {/* Navigation Items Placeholder */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-700 px-1">Navigation</h3>
                {/* Add your navigation links here */}
              </div>

              {/* Logout Button */}
              <div className="pt-4 border-t">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 border-red-200 hover:bg-red-50 hover:border-red-300 transition-colors"
                >
                  <LogOut size={18} className="text-red-600" />
                  <span className="text-red-600 font-medium">Logout</span>
                </Button>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default Navbar;

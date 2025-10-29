import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Crown, LogOut, User, Menu } from "lucide-react";
import { Button } from "./ui/button";
import Notifications from "./notification-bell";
import type { RootState } from "@/redux/store";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const profileWrapRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const avatarPreview = user?.avatar_url ? `${user.avatar_url}` : "";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileWrapRef.current &&
        !profileWrapRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const displayName = user?.name ?? "Guest User";
  const displayEmail = user?.email ?? "—";
  const displayRole =
    user?.user_type === "employee"
      ? "Employee"
      : user?.user_type
      ? user.user_type.charAt(0).toUpperCase() + user.user_type.slice(1)
      : "Viewer";

  return (
    <nav>
      {/* Left Section: Logo or Menu */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-md border border-gray-300 hover:bg-gray-100"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Right Section: Notification + Profile */}
      <div className="flex items-center gap-4">
        {user?.user_type === "admin" && (
          <div className="hidden sm:block">
            <Notifications />
          </div>
        )}

        {/* Profile + Dropdown */}
        <div
          className="relative flex items-center gap-3 cursor-pointer rounded-md"
          ref={profileWrapRef}
        >
          {/* Avatar + Name */}
          <div
            className="flex items-center gap-2"
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={open}
          >
            {(user?.user_type === "employee" || user?.user_type === "client") &&
              (user?.avatar_url ? (
                <img
                  src={avatarPreview}
                  className="w-9 h-9 rounded-md object-cover"
                  alt="profile"
                />
              ) : (
                <User size={22} />
              ))}
            {(user?.user_type === "admin" || !user) &&
              (user?.avatar ? (
                <img
                  src={user.avatar}
                  className="w-9 h-9 rounded-md object-cover"
                  alt="profile"
                />
              ) : (
                <Crown size={22} />
              ))}

            {/* Hide name/email on very small screens */}
            <div className="hidden sm:flex flex-col">
              <h1 className="font-semibold text-sm">{displayName}</h1>
              <p className="text-[#8E8E8E] text-xs">{displayEmail}</p>
            </div>
          </div>

          {/* Logout Button (hidden on small screens, replaced by dropdown) */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            aria-label="Log out"
            className="hidden sm:flex"
          >
            <LogOut color="gray" size={18} />
          </Button>

          {/* Dropdown Menu */}
          {open && (
            <div
              role="menu"
              className="absolute top-full right-0 mt-2 w-64 shadow-lg z-50 bg-white border border-gray-200 rounded-xl"
            >
              <div className="flex items-center gap-4 w-full text-left px-4 py-3 border-b hover:bg-gray-50">
                <div className="flex items-center justify-center bg-gray-200 w-10 h-10 rounded-full">
                  <Crown size={24} />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <h1 className="font-semibold text-sm leading-tight truncate">
                    {displayName}
                  </h1>
                  <p className="text-gray-500 text-xs py-1 truncate">
                    {displayEmail}
                  </p>
                  <p className="bg-[rgba(36,99,234,0.1)] text-sm text-[#2463EA] inline-flex items-center gap-2 px-3 py-1 rounded-full">
                    {displayRole}
                  </p>
                </div>
              </div>
              <button
                className="w-full flex items-center gap-3 text-left px-4 py-4 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <LogOut color="red" size={18} />
                <p className="text-red-600 font-medium">Logout</p>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-md flex flex-col p-4 z-50 lg:hidden">
          {user?.user_type === "admin" && (
            <div className="mb-4">
              <Notifications />
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={avatarPreview || user?.avatar || ""}
                alt="profile"
                className="w-10 h-10 rounded-md object-cover"
              />
              <div>
                <p className="font-semibold text-sm">{displayName}</p>
                <p className="text-xs text-gray-500">{displayRole}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut size={16} color="red" />
              <span className="text-red-500 text-sm font-medium">Logout</span>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

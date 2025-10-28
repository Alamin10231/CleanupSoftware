import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Crown, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import Notifications from "./notification-bell";
import type { RootState } from "@/redux/store";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const profileWrapRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const avatarPreview = user?.avatar_url
    ? `${user.avatar_url}`
    : "";
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

  function handleLogout() {
    try {
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  const displayName = user?.name ?? "Guest User";
  const displayEmail = user?.email ?? "—";
  const displayRole =
    user?.user_type === "employee"
      ? "Employee"
      : user?.user_type
      ? user.user_type.charAt(0).toUpperCase() + user.user_type.slice(1)
      : "Viewer";

  return (
    <div className="flex items-center gap-6 mx-4">
      {user?.user_type === "admin" && <Notifications />}
      {/* Profile + Dropdown */}
      <div
        className="relative flex items-center gap-3 cursor-pointer rounded-md"
        ref={profileWrapRef}
      >
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
                className="w-10 h-10 rounded"
                alt="profile"
              />
            ) : (
              <User size={24} />
            ))}
          {(user?.user_type === "admin" || !user) &&
            (user?.avatar ? (
              <img
                src={user?.avatar}
                className="w-10 h-10 rounded"
                alt="profile"
              />
            ) : (
              <Crown size={24} />
            ))}
          <div className="flex flex-col">
            <h1 className="font-semibold text-sm">{displayName}</h1>
            <p className="text-[#8E8E8E] text-xs">{displayEmail}</p>
          </div>
        </div>

        <Button variant="outline" onClick={handleLogout} aria-label="Log out">
          <LogOut color="gray" />
        </Button>

        {open && (
          <div
            role="menu"
            className="absolute top-full right-0 mt-2 w-64 shadow-lg z-50 bg-white border border-gray-300 rounded-xl"
          >
            <div className="flex items-center gap-4 w-full text-left px-4 py-3 hover:bg-gray-100 border-b">
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
  );
};

export default Navbar;

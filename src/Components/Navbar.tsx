import { useState, useRef, useEffect } from "react";
import profilepic from "../assets/Image/Profilepic/Profile photo.png";
import manicon from "../assets/Image/manicon.svg";
import setting from "../assets/Image/setting.svg";
import admininstritor from "../assets/Image/administritor.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom"; // Import useLocation and Link
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

export type RootState = {
  auth: {
    user: {
      user_type?: string;
      name?: string;
      email?: string;
      avatar?: string;     // normalized server URL
      avatarUrl?: string;  // normalized server URL
      role?: string;
      employee_profile?: {
        avatar?: string | null;
        [k: string]: any;
      };
    } | null;
  };
};

const defaultAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=User";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const profileWrapRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  // Read from normalized fields (set on save or getMe)
  const avatarSrc =
    (user?.avatar && !/^blob:/.test(user.avatar) && user.avatar) ||
    (user?.avatarUrl && !/^blob:/.test(user.avatarUrl) && user.avatarUrl) ||
    defaultAvatar;

  // Outside click - dropdown close
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
      console.log("User logged out");
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
      <div className="flex items-center gap-4 mx-4">
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
            {/* Avatar */}
            <img
              src={avatarSrc || profilepic}
              className="w-10 h-10 rounded object-cover border"
              alt="profile"
            />
            <div className="flex flex-col">
              <h1 className="font-semibold text-sm">{displayName}</h1>
              <p className="text-[#8E8E8E] text-xs">{displayEmail}</p>
            </div>
          </div>

          {/* Logout button */}
          <Button
            variant={'outline'}
            onClick={handleLogout}
            aria-label="Log out"
          >
            <LogOut color="gray" />
          </Button>

          {/* Dropdown */}
          {open && (
            <div
              role="menu"
              className="absolute top-full right-0 mt-2 w-64 shadow-lg z-50 bg-white border border-gray-300 rounded-xl"
            >
              <div className="flex items-center gap-4 w-full text-left px-4 py-3 hover:bg-gray-100 border-b">
                {/* Profile Image */}
                <img
                  src={avatarSrc || profilepic}
                  className="w-12 h-12 rounded object-cover border"
                  alt="profile"
                />

                {/* Profile Text */}
                <div className="flex flex-col justify-center min-w-0">
                  <h1 className="font-semibold text-sm leading-tight truncate">
                    {displayName}
                  </h1>
                  <p className="text-gray-500 text-xs py-1 truncate">
                    {displayEmail}
                  </p>

                  {/* Role Badge (text to keep it simple) */}
                  <p className="bg-[rgba(36,99,234,0.1)] text-sm text-[#2463EA] inline-flex items-center gap-2 px-3 py-1 rounded-full">
                    {displayRole}
                  </p>
                </div>
              </div>

              <button
                className="w-full flex items-center gap-3 text-left px-4 py-4 hover:bg-gray-100"
                onClick={() => {
                  setOpen(false);
                  navigate("/profile");
                }}
              >
                <img src={manicon} alt="" />
                <p>Profile</p>
              </button>

              <button
                className="w-full flex items-center gap-3 text-left px-4 py-4 hover:bg-gray-100 border-b"
                onClick={() => {
                  setOpen(false);
                  navigate("/settings");
                }}
              >
                <img src={setting} alt="" />
                <p>Setting</p>
              </button>

              <button
                className="w-full flex items-center gap-3 text-left px-4 py-4 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <LogOut color="red" size={18}/>
                <p className="text-red-600 font-medium">Logout</p>
              </button>
            </div>
          )}
        </div>
      </div>
  );
};

export default Navbar;

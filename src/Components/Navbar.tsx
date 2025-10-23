import { IoIosArrowForward } from "react-icons/io";
import Home from "../assets/Image/Home.png";
import SearchBar from "@/Shared/SearchBar";
import { useState, useRef, useEffect } from "react";
import MyIcon from "../assets/Image/Logout.svg";
import profilepic from "../assets/Image/Profilepic/Profile photo.png";
import manicon from "../assets/Image/manicon.svg";
import setting from "../assets/Image/setting.svg";
import logoutsvg from "../assets/Image/ic_round-logout.svg";
import admininstritor from "../assets/Image/administritor.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import { useNavigate } from "react-router";
import Notifications from "./notification";

type RootState = {
  auth: {
    user: {
      user_type?: string;
      name?: string;
      email?: string;
      avatarUrl?: string;
      role?: string;
    } | null;
  };
};

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const profileWrapRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

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
    <div className="flex items-center justify-between px-6 ml-[250px] py-4 border-b border-gray-200 bg-white fixed top-0 left-0 right-0 z-40">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <img src={Home} className="w-5" alt="Home" />
        <IoIosArrowForward className="text-[#8E8E8E] text-xl" />
        <p className="text-[#8E8E8E] font-semibold text-xl">Dashboard</p>
      </div>

      {/* Middle SearchBar */}
      <div className="flex mx-8 w-full max-w-xl">
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Search..."
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

         <Notifications />
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
            {/* Avatar (only show employee photo if present; otherwise fallback) */}
            {(user?.user_type === "employee" || !user) && (
              <img
                src={user?.avatarUrl ?? profilepic}
                className="w-10 h-10 rounded"
                alt="profile"
              />
            )}
            <div className="flex flex-col">
              <h1 className="font-semibold text-sm">{displayName}</h1>
              <p className="text-[#8E8E8E] text-xs">{displayEmail}</p>
            </div>
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 py-2 text-white rounded-md"
            aria-label="Log out"
            title="Log out"
          >
            <img src={MyIcon} alt="logout icon" className="w-5 h-5" />
          </button>

          {/* Dropdown */}
          {open && (
            <div
              role="menu"
              className="absolute top-full right-0 mt-2 w-64 shadow-lg z-50 bg-white border border-gray-300 rounded-xl"
            >
              <div className="flex items-center gap-4 w-full text-left px-4 py-3 hover:bg-gray-100 border-b">
                {/* Profile Image */}
                <img
                  src={user?.avatarUrl ?? profilepic}
                  className="w-12 h-12 rounded object-cover"
                  alt="profile"
                />

                {/* Profile Text */}
                <div className="flex flex-col justify-center">
                  <h1 className="font-semibold text-sm leading-tight">
                    {displayName}
                  </h1>
                  <p className="text-gray-500 text-xs py-1">{displayEmail}</p>

                  {/* Role Badge */}
                  <p className="bg-[rgba(36,99,234,0.1)] text-sm text-[#2463EA] inline-flex items-center gap-2 px-3 py-1 rounded-full">
                    <img
                      src={admininstritor}
                      className="w-4 h-4"
                      alt="role icon"
                    />
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
                <img src={logoutsvg} alt="" />
                <p className="text-[#D32F2F]">Logout</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

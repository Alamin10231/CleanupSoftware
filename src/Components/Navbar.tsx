import { IoIosArrowForward } from "react-icons/io";
import Home from "../../public/Image/Home.png";
import SearchBar from "@/Shared/SearchBar";
import { useState, useRef, useEffect } from "react";
import darkmode from "../../public/Image/solar_moon-linear.png";
import china from "../../public/Image/material-symbols_translate.png";
import moonicon from "../../public/Image/iconamoon_notification.png";
import MyIcon from "../../public/Image/Logout.svg";
import profilepic from "../../public/Image/Profilepic/Profile photo.png";
import manicon from "../../public/Image/manicon.svg";
import setting from "../../public/Image/setting.svg";
import logoutsvg from "../../public/Image/ic_round-logout.svg";
import admininstritor from "../../public/Image/administritor.svg";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Outside click - dropdown close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="pt-10 px-4 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <img src={Home} className="w-5" alt="Home" />
        <IoIosArrowForward className="text-[#8E8E8E] text-xl" />
        <p className="text-[#8E8E8E] font-semibold text-xl">
          dynamic Dashboard
        </p>
      </div>

      {/* Middle SearchBar */}
      <div className="flex-1 mx-8">
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Search..."
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Icons */}
        <div className="flex items-center gap-3 border-r border-[#8E8E8E] pr-3">
          <img className="w-6 h-6" src={darkmode} alt="darkmode icon" />
          <img className="w-6 h-6" src={china} alt="china language" />
          <img className="w-6 h-6" src={moonicon} alt="moon icon" />
        </div>

        {/* Profile + Dropdown */}
        <div className="relative flex items-center gap-3">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setOpen(!open)}
            ref={profileRef}
          >
            <img
              src={profilepic}
              className="w-10 h-10 rounded"
              alt="profile"
            />
            <div className="flex flex-col">
              <h1 className="font-semibold text-sm">MR. Mosabbir</h1>
              <p className="text-[#8E8E8E] text-xs">Free Account</p>
            </div>
          </div>

          {/* Logout button */}
          <button className="flex items-center gap-2 px-4 py-2  text-white rounded-md ">
            <img src={MyIcon} alt="logout icon" className="w-5 h-5" />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute top-full  right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-md z-50">
              <div className="flex items-center gap-2 cursor-pointer  justify-start  w-full text-left px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-700">
                <img
                  src={profilepic}
                  className="w-10 h-10 rounded"
                  alt="profile"
                />
                <div className="flex flex-col">
                  <h1 className="font-semibold text-sm">MR. Mosabbir</h1>
                  <p className="text-[#8E8E8E] text-xs">admin@cleanuppro.com</p>
                  <p className="bg-[rgba(36,99,234,0.1)] p-2 rounded-full px-4 flex items-center gap-3">
                    {" "}
                    <span>
                      <img src={admininstritor} alt="" />
                    </span>
                    Administrator
                  </p>
                </div>
              </div>

              <div className="  justify-start flex items-center gap-3 w-full text-left px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-700">
                <img src={manicon} alt="" />
                <p>Profile</p>
              </div>
              <div className=" border-b border-[#9A9AA9] justify-start flex items-center gap-3 w-full text-left px-4 pb-4 hover:bg-gray-100 dark:hover:bg-gray-700">
                <img src={setting} alt="" />
                <p>Setting</p>
              </div>
              <div className="  justify-start flex items-center gap-3 w-full text-left px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-700">
                <img src={logoutsvg} alt="" />
                <p className="text-[D32F2F]">Logout</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

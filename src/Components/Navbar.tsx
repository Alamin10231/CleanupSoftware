import { IoIosArrowForward } from "react-icons/io";
import Home from "../assets/Image/Home.png";
import SearchBar from "@/Shared/SearchBar";
import { useState, useRef, useEffect } from "react";
import china from "../assets/Image/material-symbols_translate.png";
import moonicon from "../assets/Image/iconamoon_notification.png";
import MyIcon from "../assets/Image/Logout.svg";
import profilepic from "../assets/Image/Profilepic/Profile photo.png";
import manicon from "../assets/Image/manicon.svg";
import setting from "../assets/Image/setting.svg";
import logoutsvg from "../assets/Image/ic_round-logout.svg";
import admininstritor from "../assets/Image/administritor.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import { useNavigate } from "react-router";

const Navbar = () => {
    const [searchValue, setSearchValue] = useState("");
    const [open, setOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const navigator = useNavigate();

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
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function handleLogout() {
        try {
            dispatch(logout());
            console.log("User logged out");
            navigator("/login");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex items-center justify-between px-6 ml-[250px] py-4 border-b border-gray-200 bg-white fixed top-0 left-0 right-0 z-40">
            {/* Left Section */}
            <div className="flex items-center gap-2">
                <img src={Home} className="w-5" alt="Home" />
                <IoIosArrowForward className="text-[#8E8E8E] text-xl" />
                <p className="text-[#8E8E8E] font-semibold text-xl">
                    Dashboard
                </p>
            </div>

            {/* Middle SearchBar */}
            <div className="flex mx-8">
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
                    <img className="w-6 h-6" src={china} alt="china language" />
                    <img className="w-6 h-6" src={moonicon} alt="moon icon" />
                </div>

                {/* Profile + Dropdown */}
                <div className="relative flex items-center gap-3 cursor-pointer rounded-md">
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => setOpen(!open)}
                        ref={profileRef}
                    >
                        {user.user_type === "employee" && (
                            <img
                                src={profilepic}
                                className="w-10 h-10 rounded"
                                alt="profile"
                            />
                        )}
                        <div className="flex flex-col">
                            <h1 className="font-semibold text-sm">
                                {user?.name}
                            </h1>
                            <p className="text-[#8E8E8E] text-xs">
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    {/* Logout button */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2  py-2 cursor-pointer text-white rounded-md"
                    >
                        <img
                            src={MyIcon}
                            alt="logout icon"
                            className="w-5 h-5"
                        />
                    </button>

                    {/* Dropdown */}
                    {open && (
                        <div className="absolute top-full  right-0 mt-2 w-64 shadow-lg z-50 bg-white border border-gray-300 rounded-xl">
                            <div className="flex items-center gap-4 cursor-pointer w-full text-left px-4 py-3 hover:bg-gray-100 border-b-1 border-b-[#9A9AA9]">
                                {/* Profile Image */}
                                <img
                                    src={profilepic}
                                    className="w-12 h-12 rounded object-cover"
                                    alt="profile"
                                />

                                {/* Profile Text */}
                                <div className="flex flex-col justify-center ">
                                    <h1 className="font-semibold text-sm leading-tight">
                                        MR. Mosabbir
                                    </h1>
                                    <p className="text-gray-500 text-xs py-1">
                                        admin@cleanuppro.com
                                    </p>

                                    {/* Role Badge */}
                                    <p className="bg-[rgba(36,99,234,0.1)] text-sm text-[#2463EA] inline-flex items-center gap-2 px-3 py-1 rounded-full">
                                        <img
                                            src={admininstritor}
                                            className="w-4 h-4"
                                            alt="role icon"
                                        />
                                        Administrator
                                    </p>
                                </div>
                            </div>

                            <div className="  justify-start flex items-center gap-3 w-full text-left px-4 py-4 hover:bg-gray-100">
                                <img src={manicon} alt="" />
                                <p>Profile</p>
                            </div>
                            <div className=" border-b border-b-[#9A9AA9] justify-start flex items-center gap-3 w-full text-left px-4 pb-4 hover:bg-gray-100">
                                <img src={setting} alt="" />
                                <p>Setting</p>
                            </div>
                            <div className="  justify-start flex items-center gap-3 w-full text-left  px-4 py-4 hover:bg-gray-100">
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

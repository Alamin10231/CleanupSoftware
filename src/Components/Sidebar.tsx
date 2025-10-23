import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { assets } from "../assets/assets";
import type { UserRole } from "@/Types/Types";
import { MENU_CONFIG } from "./sidebar/menuConfig";
import { SidebarSection } from "./sidebar/SidebarSection";
interface AuthState {
  user: {
    user_type: UserRole;
  } | null;
}

interface RootState {
  auth: AuthState;
}

const Sidebar: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  // Memoize menu data to avoid recalculation on every render
  const menuData = useMemo(() => {
    const role = user?.user_type || "employee";
    return MENU_CONFIG[role] || MENU_CONFIG.employee;
  }, [user?.user_type]);

  return (
    <div className="w-60 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <img
          src={assets.logo}
          alt="CleanUp Pro Logo"
          className="w-[140px] mx-auto"
        />
      </div>
      <hr className="text-gray-300" />

      {/* Sidebar Navigation */}
      <nav className="flex-1 mt-4 overflow-y-auto">
        {menuData.map((section, index) => (
          <SidebarSection key={`section-${index}`} section={section} />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

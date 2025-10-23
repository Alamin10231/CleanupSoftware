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

  // ✅ Determine user role safely
  const role: UserRole = user?.user_type ?? "employee";

  // ✅ Memoized menu items based on role
  const menuData = useMemo(() => {
    if (role === "admin") return MENU_CONFIG.admin;
    if (role === "client") return MENU_CONFIG.client;
    return MENU_CONFIG.employee;
  }, [role]);

  return (
    <aside className="w-60 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo Section */}
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
    </aside>
  );
};

export default Sidebar;

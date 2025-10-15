import type { MenuItem } from "@/Types/Types";
import React from "react";
import { NavLink } from "react-router-dom";

interface SidebarMenuItemProps {
  item: MenuItem;
}

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ item }) => {
  return (
    <li>
      <NavLink
        to={item.path}
        end
        className={({ isActive }) =>
          `group flex items-center gap-3 px-6 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 ${
            isActive
              ? "text-white bg-gradient-to-r from-transparent via-[#2463EA] to-[#7A90F7] shadow-lg shadow-[#7A90F7]/50"
              : "text-gray-500 hover:bg-blue-50 hover:text-blue-600"
          }`
        }
      >
        {({ isActive }) => (
          <>
            <img
              src={item.icon}
              alt={`${item.label} icon`}
              className={`w-5 h-5 transition-all duration-300 ${
                isActive ? "brightness-0 invert" : ""
              }`}
            />
            <span>{item.label}</span>
          </>
        )}
      </NavLink>
    </li>
  );
};

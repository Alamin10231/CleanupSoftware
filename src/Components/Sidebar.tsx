import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar: React.FC = () => {
  const sections = [
    {
      heading: null,
      items: [
        { icon: assets.Dashboard_icon, label: "Dashboard", path: "/" },
        { icon: assets.Clients_icon, label: "Clients", path: "/client" },
        { icon: assets.region, label: "Region", path: "/region" },
        { icon: assets.Appertment, label: "Appertment", path: "/appertment" },
        { icon: assets.Employess_icon, label: "Employees", path: "/employees" },
        
      ],
    },
    {
      heading: "Business",
      items: [
        { icon: assets.service, label: "Subscriptions", path: "/subscription" },
        { icon: assets.service, label: "Services", path: "/services" },
        { icon: assets.invoice, label: "Invoices", path: "/invoices" },
      ],
    },
    {
      heading: "ANALYTICS",
      items: [
        { icon: assets.map, label: "Map", path: "/map" },
        { icon: assets.report, label: "Reports", path: "/reports" },
        { icon: assets.notification, label: "Notifications", path: "/notifications" },
      ],
    },
    {
      heading: "SETTINGS",
      items: [
        { icon: assets.setting, label: "Settings", path: "/settings" },
      ],
    },
  ];

  return (
    <div className="w-60 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <img src={assets.logo} alt="CleanUp Pro Logo" className="w-[140px] mx-auto" />
      </div>
      <hr className="text-gray-300" />

      {/* Sections */}
      <nav className="flex-1 mt-4">
        {sections.map((section, index) => (
          <div key={index} className="mb-6">
            {/* Heading */}
            {section.heading && (
              <h2 className="px-6 mb-2 text-sm font-semibold text-gray-900 uppercase tracking-wide">
                {section.heading}
              </h2>
            )}
            {/* Menu Items */}
            <ul className="space-y-2">
              {section.items.map((item, subIndex) => (
                <li key={subIndex}>
                  <NavLink
                    to={item.path}
                    end
                    className={({ isActive }) =>
                      `group flex items-center gap-3 px-6 py-2 rounded-lg text-[15px] font-medium cursor-pointer transition-all duration-300
                      ${isActive
                        ? "text-white bg-gradient-to-r from-transparent via-[#2463EA] to-[#7A90F7] shadow-lg shadow-[#7A90F7]/50"
                        : "text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <img
                          src={item.icon}
                          alt={item.label}
                          className={`w-5 h-5 transition-all duration-300 ${isActive ? "brightness-0 invert-[0.3] sepia saturate-200 hue-rotate-[210deg]" : ""}`}
                          style={isActive ? { filter: "brightness(0) saturate(100%) invert(24%) sepia(96%) saturate(4063%) hue-rotate(225deg) brightness(95%) contrast(104%)" } : {}}
                        />
                        <span>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
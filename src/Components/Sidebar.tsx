import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
// import { useSelector } from "react-redux";

const Sidebar: React.FC = () => {
  // const { user } = useSelector((state) => state.auth);
  // const role = user?.user_type;
	const role = "supervisor"; // hardcoded for now, will be dynamic later

  const admin = [
    {
      heading: null,
      items: [
        { icon: assets.Dashboard_icon, label: "Dashboard", path: "/" },
        { icon: assets.Clients_icon, label: "Clients", path: "/client" },
        { icon: assets.region, label: "Region", path: "/region" },
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
      heading: "Analytics",
      items: [
        { icon: assets.map, label: "Map", path: "/map" },
        { icon: assets.report, label: "Reports", path: "/reports" },
        {
          icon: assets.notification,
          label: "Notifications",
          path: "/notifications",
        },
      ],
    },
    {
      heading: "Settings",
      items: [{ icon: assets.setting, label: "Settings", path: "/settings" }],
    },
  ];

  const employee = [
    {
      heading: null,
      items: [
        { icon: assets.Dashboard_icon, label: "Dashboard", path: "/employee-dashboard" },
        { icon: assets.subscriptionss, label: "Subscriptions", path: "/employee-subscriptions" },
        // { icon: assets.region, label: "Region", path: "/employee-region" },
        { icon: assets.region, label: "Building & Region", path: "/employee-building" },
        { icon: assets.invoice, label: "Invoices", path: "/employee-invoice" },
        { icon: assets.report, label: "Reports", path: "/employee-report" },
        { icon: assets.Froms, label: "Froms", path: "/employee-forms" },
        { icon: assets.Communication, label: "Communication", path: "/employee-communication" },

      ],
    },
    {
      heading: "ANALYTICS",
      items: [
        { icon: assets.setting, label: "Settings", path: "/employee-setting" },
        // { icon: assets.help, label: "Help", path: "/employee-help" },

      ],
    },

  ];



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
      <nav className="flex-1 mt-4">
        {menuData.map((section, index) => (
          <div key={index} className="mb-6">
            {section.heading && (
              <h2 className="px-6 mb-2 text-xs font-bold text-gray-900 uppercase tracking-wide">
                {section.heading}
              </h2>
            )}
            <ul className="space-y-2">
              {section.items.map((item, subIndex) => (
                <li key={subIndex}>
                  <NavLink
                    to={item.path}
                    end
                    className={({ isActive }) =>
                      `group flex items-center gap-3 px-6 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-300
                        ${
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
                          alt={item.label}
                          className={`w-5 h-5 transition-all duration-300 ${
                            isActive
                              ? "brightness-0 invert-[0.3] sepia saturate-200 hue-rotate-[210deg]"
                              : ""
                          }`}
                          style={
                            isActive
                              ? {
                                  filter:
                                    "brightness(0) saturate(100%) invert(24%) sepia(96%) saturate(4063%) hue-rotate(225deg) brightness(95%) contrast(104%)",
                                }
                              : {}
                          }
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

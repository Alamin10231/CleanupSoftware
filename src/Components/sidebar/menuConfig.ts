import { assets } from "@/assets/assets";
import type { MenuSection, UserRole } from "@/Types/Types";

export const MENU_CONFIG: Record<UserRole, MenuSection[]> = {
  admin: [
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
        { icon: assets.notification, label: "Notifications", path: "/notifications" },
      ],
    },
    {
      heading: "Settings",
      items: [{ icon: assets.setting, label: "Settings", path: "/settings" }],
    },
  ],
  employee: [
    {
      heading: null,
      items: [
        { icon: assets.Dashboard_icon, label: "Dashboard", path: "/employee-dashboard" },
        { icon: assets.subscriptionss, label: "Subscriptions", path: "/employee-subscriptions" },
        { icon: assets.region, label: "Building & Region", path: "/employee-building" },
        { icon: assets.invoice, label: "Invoices", path: "/employee-invoice" },
        { icon: assets.report, label: "Reports", path: "/employee-report" },
        { icon: assets.Froms, label: "Forms", path: "/employee-forms" },
        { icon: assets.Communication, label: "Communication", path: "/employee-communication" },
      ],
    },
    {
      heading: "Analytics",
      items: [
        { icon: assets.setting, label: "Settings", path: "/employee-setting" },
      ],
    },
  ],

  client :[
    {
      heading: null,
      items: [
        { icon: assets.Dashboard_icon, label: "Profile", path: "/client-profile" },
        { icon: assets.subscriptionss, label: "Chat", path: "/client-chat" },
        { icon: assets.region, label: "Subscription", path: "/client-subscription" },
      ],
    },
  ]
};

import { lazy } from "react";
const Clients = lazy(() => import("@/Page/admin-dashboard/Clients"));
const Dashboard = lazy(() => import("@/Page/admin-dashboard/Dashboard"));
import type { ISidebarItems } from "@/Types/Types";

export const adminSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    item: {
      title: "Dashboard",
      url: "/admin/dashboard",
      component: Dashboard,
      isActive: true,
    },
  },
  {
    title: "Clients",
    item: {
      title: "Clients",
      url: "/admin/clients",
      component: Clients,
      isActive: false,
    },
  },
  {
    title: "Help",
    item: {
      title: "Help",
      url: "/admin-dashboard/help",
      component: Dashboard,
      isActive: false,
    },
  },
];

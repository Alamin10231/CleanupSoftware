import { lazy } from "react";
const EmployeeDashboard = lazy(() => import("@/Page/employee-dashboard/EmployeeDashboard"))
import type { ISidebarItems } from "@/Types/Types";

export const employeeSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    item: {
      title: "Dashboard",
      url: "/employee/dashboard",
      component: EmployeeDashboard,
      isActive: true,
    },
  }
];

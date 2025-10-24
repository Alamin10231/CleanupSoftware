import DashboardLayout from "@/DashboardLayout";
import Home from "@/Page/admin-dashboard/Home";
import { createBrowserRouter } from "react-router";
import { generateRoutes } from "./routes.config";
import { adminSidebarItems } from "./sidebar-items/admin-items";
import { employeeSidebarItems } from "./sidebar-items/employee-items";
// import { supervisorSidebarItems } from "./sidebar-items/supervisor-items";

export const router = createBrowserRouter([
   {
      Component: Home,
      path: "/",
      children: []
   },
   {
      Component: DashboardLayout,
      path: "/admin",
      children: [...generateRoutes(adminSidebarItems)]
   },
   {
      Component: DashboardLayout,
      path: "/employee",
      children: [...generateRoutes(employeeSidebarItems)]
   },
   // {
   //    Component: DashboardLayout,
   //    path: "/supervisor",
   //    children: [...generateRoutes(employeeSidebarItems), ...generateRoutes(supervisorSidebarItems)]
   // },
   {
      Component: DashboardLayout,
      path: "/client",
      children: []
   },
])

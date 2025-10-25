import DashboardLayout from "@/DashboardLayout";
import Home from "@/Page/admin-dashboard/Home";
import { createBrowserRouter, Navigate } from "react-router";
import { generateRoutes } from "./routes.config";
import { adminSidebarItems } from "./sidebar-items/admin-items";
import { employeeSidebarItems } from "./sidebar-items/employee-items";
import { checkRole } from "./checkRole";
import Login from "@/Components/Auth/Login";
import SignUp from "@/Components/Auth/SignUp";
import ForgetPassword from "@/Components/Auth/ForgetPassword";
import Verifyotp from "@/Components/Auth/Verifyotp";
import NotFound from "@/Page/NotFound";
// import { supervisorSidebarItems } from "./sidebar-items/supervisor-items";

export const router = createBrowserRouter([
  {
    Component: Home,
    path: "/",
    children: [],
  },
  {
    Component: DashboardLayout,
    //  Component: checkRole(DashboardLayout, "admin"),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="dashboard" /> }, // Changed to relative path
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: checkRole(DashboardLayout, "employee"),
    path: "/employee",
    children: [
      { index: true, element: <Navigate to="dashboard" /> }, // Changed to relative path
      ...generateRoutes(employeeSidebarItems),
    ],
  },
  // {
  //    Component: DashboardLayout,
  //    path: "/supervisor",
  //    children: [...generateRoutes(employeeSidebarItems), ...generateRoutes(supervisorSidebarItems)]
  // },

  {
    Component: DashboardLayout,
    path: "/client",
    children: [],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: SignUp,
    path: "/signup",
  },
  {
    Component: ForgetPassword,
    path: "/forget-password",
  },
  {
    Component: Verifyotp,
    path: "/verifyotp",
  },
  {
   Component: NotFound,
   path: "*"
  }
]);

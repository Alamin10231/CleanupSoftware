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
import { clientSidebarItems } from "./sidebar-items/client-items";
import { supervisorSidebarItems } from "./sidebar-items/supervisor-items";
import UpdatePlanForm from "@/Page/admin-dashboard/UpdatePlan";
import BuildingDetails from "@/Components/Region/building-details";

export const router = createBrowserRouter([
  {
    Component: Home,
    path: "/",
    children: [],
  },
  {
   //  Component: DashboardLayout,
     Component: checkRole(DashboardLayout, "admin"),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="dashboard" /> },
      ...generateRoutes(adminSidebarItems),
      {
         Component: UpdatePlanForm,
         path: '/admin/update-plan/:id'
      },
    ],
  },
  {
    Component: checkRole(DashboardLayout, "employee"),
    path: "/employee",
    children: [
      { index: true, element: <Navigate to="dashboard" /> },
      ...generateRoutes(employeeSidebarItems),
    ],
  },
  {
    Component: DashboardLayout,
    path: "/supervisor",
    children: [
      { index: true, element: <Navigate to={"dashboard"} /> },
      ...generateRoutes(employeeSidebarItems),
      ...generateRoutes(supervisorSidebarItems),
    ],
  },

  {
    Component: DashboardLayout,
    path: "/client",
    children: [
      { index: true, element: <Navigate to={"profile"} /> },
      ...generateRoutes(clientSidebarItems),
    ],
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
    path: "*",
  },
]);

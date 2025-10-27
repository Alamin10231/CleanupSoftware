import { lazy } from "react";
import type { ISidebarItems } from "@/Types/Types";
import {
  LayoutDashboard,
  Building,
  ClipboardList,
  MessageSquare,
  Settings,
  FileText,
  CreditCard,
} from "lucide-react"; // Import necessary icons

const RegionDashboard = lazy(
  () => import("@/Page/employee-dashboard/RegionDashboard")
);
const TaskEmployee = lazy(
  () => import("@/Page/employee-dashboard/TaskEmployee")
);
const EmployeeDashboard = lazy(
  () => import("@/Page/employee-dashboard/EmployeeDashboard")
);
const EmployeeCommunication = lazy(
  () => import("@/Page/employee-dashboard/EmployeeCommunication")
);
const EmployeeSetting = lazy(
  () => import("@/Page/employee-dashboard/EmployeeSetting")
);
const EmployeeForms = lazy(
  () => import("@/Page/employee-dashboard/EmployeeForms")
);
const EmployeeReports = lazy(
  () => import("@/Page/employee-dashboard/EmployeeReports")
);
const EmployeeInvoicees = lazy(
  () => import("@/Page/employee-dashboard/invoice/EmployeeInvoicees")
);
const EmployeeSubscription = lazy(
  () => import("@/Page/employee-dashboard/EmployeeSubscription")
);

export const employeeSidebarItems: ISidebarItems[] = [
  {
    title: "Employee Dashboard",
    item: [
      {
        title: "Dashboard",
        url: "dashboard", // Changed from /employee-dashboard
        component: EmployeeDashboard,
        isActive: true,
        icon: LayoutDashboard,
      },
      {
        title: "Building",
        url: "building", // Changed from /employee-building
        component: RegionDashboard,
        isActive: false,
        icon: Building,
      },
      {
        title: "Communication",
        url: "communication", // Changed from /employee-communication
        component: EmployeeCommunication,
        isActive: false,
        icon: MessageSquare,
      },
      {
         title: "Forms",
         url: "forms", // Changed from /employee-forms
         component: EmployeeForms,
         isActive: false,
         icon: FileText,
      },
      {
        title: "Invoices",
        url: "invoice", // Changed from /employee-invoice
        component: EmployeeInvoicees,
        isActive: false,
        icon: FileText,
      },
      {
        title: "Subscriptions",
        url: "subscriptions", // Changed from /employee-subscriptions
        component: EmployeeSubscription,
        isActive: false,
        icon: CreditCard,
      },
      {
        title: "Settings",
        url: "setting", // Changed from /employee-setting
        component: EmployeeSetting,
        isActive: false,
        icon: Settings,
      },
    ],
  },
];

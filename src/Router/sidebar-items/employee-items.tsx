import { lazy } from "react";
import type { ISidebarItems } from "@/Types/Types";
import {
  LayoutDashboard,
  Building,
  MessageSquare,
  Settings,
  FileText,
  CreditCard,
  ClipboardList,
} from "lucide-react";
import ServiceTable from "@/Page/employee-dashboard/communication";
const EmployeeTaskDashboard = lazy(
  () => import("@/Page/employee-dashboard/employee-task")
);
const EmployeeDashboard = lazy(
  () => import("@/Page/employee-dashboard/EmployeeDashboard")
);
// const EmployeeCommunication = lazy(
//   () => import("@/Page/employee-dashboard/EmployeeCommunication")
// );
const EmployeeSetting = lazy(
  () => import("@/Page/employee-dashboard/EmployeeSetting")
);
const EmployeeForms = lazy(
  () => import("@/Page/employee-dashboard/EmployeeForms")
);
const EmployeeInvoicees = lazy(
  () => import("@/Page/employee-dashboard/invoice/EmployeeInvoicees")
);
const EmployeeSubscription = lazy(
  () => import("@/Page/employee-dashboard/EmployeeSubscription")
);
const AssignedRequests = lazy(
  () => import("@/Page/employee-dashboard/AssignedRequests")
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
        component: EmployeeTaskDashboard,
        isActive: false,
        icon: Building,
      },
      {
        title: "Communication",
        url: "communication", // Changed from /employee-communication
        component: ServiceTable,
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
        title: "Assigned Requests",
        url: "assigned-requests",
        component: AssignedRequests,
        isActive: false,
        icon: ClipboardList,
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

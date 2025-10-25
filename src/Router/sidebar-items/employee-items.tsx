import { lazy } from "react";
import type { ISidebarItems } from "@/Types/Types";
import {
  LayoutDashboard,
  Building,
  ClipboardList,
  MessageSquare,
  Settings,
  FileText,
  MapPin,
  BarChart,
  CreditCard,
} from "lucide-react"; // Import necessary icons

const RegionDashboard = lazy(
  () => import("@/Page/employee-dashboard/RegionDashboard")
);
const TaskEmployee = lazy(
  () => import("@/Page/employee-dashboard/TaskEmployee")
);
const Buildingregions = lazy(
  () => import("@/Page/employee-dashboard/Buildingregions")
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
        title: "Building Tasks",
        url: "building/:buildingName", // Changed from /employee-building/:buildingName
        component: TaskEmployee,
        isActive: false,
        icon: ClipboardList,
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
         title: "Region",
         url: "region", // Changed from /employee-region
         component: Buildingregions,
         isActive: false,
         icon: MapPin,
      },
      {
        title: "Reports",
        url: "report", // Changed from /employee-report
        component: EmployeeReports,
        isActive: false,
        icon: BarChart,
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

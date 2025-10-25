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
    title: "Dashboard",
    item: [
      {
        title: "Dashboard",
        url: "/employee-dashboard",
        component: EmployeeDashboard,
        isActive: true,
        icon: LayoutDashboard, // Added icon
      },
    ],
  },
  {
    title: "Building",
    item: [
      {
        title: "Building",
        url: "/employee-building",
        component: RegionDashboard,
        isActive: false,
        icon: Building, // Added icon
      },
    ],
  },
  {
    title: "Building Tasks",
    item: [
      {
        title: "Building Tasks",
        url: "/employee-building/:buildingName",
        component: TaskEmployee,
        isActive: false,
        icon: ClipboardList, // Added icon
      },
    ],
  },
  {
    title: "Communication",
    item: [
      {
        title: "Communication",
        url: "/employee-communication",
        component: EmployeeCommunication,
        isActive: false,
        icon: MessageSquare, // Added icon
      },
    ],
  },
  {
    title: "Settings",
    item: [
      {
        title: "Settings",
        url: "/employee-setting",
        component: EmployeeSetting,
        isActive: false,
        icon: Settings, // Added icon
      },
    ],
  },
  {
    title: "Forms",
    item: [
      {
        title: "Forms",
        url: "/employee-forms",
        component: EmployeeForms,
        isActive: false,
        icon: FileText, // Added icon
      },
    ],
  },
  {
    title: "Region",
    item: [
      {
        title: "Region",
        url: "/employee-region",
        component: Buildingregions,
        isActive: false,
        icon: MapPin, // Added icon
      },
    ],
  },
  {
    title: "Reports",
    item: [
      {
        title: "Reports",
        url: "/employee-report",
        component: EmployeeReports,
        isActive: false,
        icon: BarChart, // Added icon
      },
    ],
  },
  {
    title: "Invoices",
    item: [
      {
        title: "Invoices",
        url: "/employee-invoice",
        component: EmployeeInvoicees,
        isActive: false,
        icon: FileText, // Added icon
      },
    ],
  },
  {
    title: "Subscriptions",
    item: [
      {
        title: "Subscriptions",
        url: "/employee-subscriptions",
        component: EmployeeSubscription,
        isActive: false,
        icon: CreditCard, // Added icon
      },
    ],
  },
];


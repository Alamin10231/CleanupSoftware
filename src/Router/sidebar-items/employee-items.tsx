import { lazy } from "react";
import type { ISidebarItems } from "@/Types/Types";
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
    item: {
      title: "Dashboard",
      url: "/employee-dashboard",
      component: EmployeeDashboard,
      isActive: true,
    },
  },
  {
    title: "Building",
    item: {
      title: "Building",
      url: "/employee-building",
      component: RegionDashboard,
      isActive: false,
    },
  },
  {
    title: "Building Tasks",
    item: {
      title: "Building Tasks",
      url: "/employee-building/:buildingName",
      component: TaskEmployee,
      isActive: false,
    },
  },
  {
    title: "Communication",
    item: {
      title: "Communication",
      url: "/employee-communication",
      component: EmployeeCommunication,
      isActive: false,
    },
  },
  {
    title: "Settings",
    item: {
      title: "Settings",
      url: "/employee-setting",
      component: EmployeeSetting,
      isActive: false,
    },
  },
  {
    title: "Forms",
    item: {
      title: "Forms",
      url: "/employee-forms",
      component: EmployeeForms,
      isActive: false,
    },
  },
  {
    title: "Region",
    item: {
      title: "Region",
      url: "/employee-region",
      component: Buildingregions,
      isActive: false,
    },
  },
  {
    title: "Reports",
    item: {
      title: "Reports",
      url: "/employee-report",
      component: EmployeeReports,
      isActive: false,
    },
  },
  {
    title: "Invoices",
    item: {
      title: "Invoices",
      url: "/employee-invoice",
      component: EmployeeInvoicees,
      isActive: false,
    },
  },
  {
    title: "Subscriptions",
    item: {
      title: "Subscriptions",
      url: "/employee-subscriptions",
      component: EmployeeSubscription,
      isActive: false,
    },
  },
];

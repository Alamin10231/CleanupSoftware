import { lazy } from "react";
import type { ISidebarItems } from "@/Types/Types";
const Clients = lazy(() => import("@/Page/admin-dashboard/Clients"));
const Dashboard = lazy(() => import("@/Page/admin-dashboard/Dashboard"));
const Invoices = lazy(() => import("@/Page/admin-dashboard/Invoices"));
const ExpenseAdmin = lazy(() => import("@/Page/admin-dashboard/ExpenseAdmin"));
const CreateInvoiceForm = lazy(
  () => import("@/Page/admin-dashboard/create-invoice")
);
const Employees = lazy(() => import("@/Page/admin-dashboard/Employees"));
const Notifications = lazy(
  () => import("@/Page/admin-dashboard/Notifications")
);
const Region = lazy(() => import("@/Page/admin-dashboard/Region"));
const ReportsPage = lazy(() => import("@/Page/admin-dashboard/Reports"));
const Services = lazy(() => import("@/Page/admin-dashboard/Services"));
const ProfileSettingsPage = lazy(
  () => import("@/Page/admin-dashboard/Settings")
);
const Subscriptions = lazy(
  () => import("@/Page/admin-dashboard/Subscriptions")
);
const SubscriptionPlan = lazy(
  () => import("@/Components/Subscription/SubscriptionPlan")
);
const AddNewPlanForm = lazy(
  () => import("@/Page/admin-dashboard/add-new-plan")
);
const UpdatePlanForm = lazy(() => import("@/Page/admin-dashboard/UpdatePlan"));
const AddNewServiceForm = lazy(
  () => import("@/Page/admin-dashboard/add-services")
);
const ChatPage = lazy(() => import("@/Page/employee-dashboard/ChatPage"));
const MapRegionOverview = lazy(() => import("@/Page/admin-dashboard/Map"));

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
      url: "/admin/client",
      component: Clients,
      isActive: false,
    },
  },
  {
    title: "Invoices",
    item: {
      title: "Invoices",
      url: "/admin/invoices",
      component: Invoices,
      isActive: false,
    },
  },
  {
    title: "Employee Expense Request",
    item: {
      title: "Employee Expense Request",
      url: "/admin/employee-expense-request",
      component: ExpenseAdmin,
      isActive: false,
    },
  },
  {
    title: "Create Invoice",
    item: {
      title: "Create Invoice",
      url: "/admin/create-invoice",
      component: CreateInvoiceForm,
      isActive: false,
    },
  },
  {
    title: "Employees",
    item: {
      title: "Employees",
      url: "/admin/employees",
      component: Employees,
      isActive: false,
    },
  },
  {
    title: "Map",
    item: {
      title: "Map",
      url: "/admin/map",
      component: MapRegionOverview,
      isActive: false,
    },
  },
  {
    title: "Notifications",
    item: {
      title: "Notifications",
      url: "/admin/notifications",
      component: Notifications,
      isActive: false,
    },
  },
  {
    title: "Region",
    item: {
      title: "Region",
      url: "/admin/region",
      component: Region,
      isActive: false,
    },
  },
  {
    title: "Reports",
    item: {
      title: "Reports",
      url: "/admin/reports",
      component: ReportsPage,
      isActive: false,
    },
  },
  {
    title: "Services",
    item: {
      title: "Services",
      url: "/admin/services",
      component: Services,
      isActive: false,
    },
  },
  {
    title: "Settings",
    item: {
      title: "Settings",
      url: "/admin/settings",
      component: ProfileSettingsPage,
      isActive: false,
    },
  },
  {
    title: "Subscriptions",
    item: {
      title: "Subscriptions",
      url: "/admin/subscription",
      component: Subscriptions,
      isActive: false,
    },
  },
  {
    title: "Subscription Plan",
    item: {
      title: "Subscription Plan",
      url: "/admin/subscriptionplan",
      component: SubscriptionPlan,
      isActive: false,
    },
  },
  {
    title: "Add New Plan",
    item: {
      title: "Add New Plan",
      url: "/admin/add-new-plan",
      component: AddNewPlanForm,
      isActive: false,
    },
  },
  {
    title: "Update Plan",
    item: {
      title: "Update Plan",
      url: "/admin/update-plan/:id",
      component: UpdatePlanForm,
      isActive: false,
    },
  },
  {
    title: "Add Services",
    item: {
      title: "Add Services",
      url: "/admin/add-services",
      component: AddNewServiceForm,
      isActive: false,
    },
  },
  {
    title: "Chat",
    item: {
      title: "Chat",
      url: "/admin/chat",
      component: ChatPage,
      isActive: false,
    },
  },
];

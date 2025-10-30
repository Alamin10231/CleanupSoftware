import { lazy } from "react";
import type { ISidebarItems } from "@/Types/Types";
import {
  LayoutDashboard,
  Users,
  MapPin,
  Briefcase,
  CreditCard,
  Settings,
  Bell,
  BarChart,
  MessageSquare,
  FileText,
  PlusCircle,
  ClipboardList,
  DollarSign,
  CalendarPlus,
  FilePlus,
  ListPlus,
  Pencil,
  FilePenLine,
  FileCheck2,
} from "lucide-react"; // Import necessary icons
const DynamicFormBuilder = lazy(
  () => import("@/Page/admin-dashboard/custom-form")
);
const Clients = lazy(() => import("@/Page/admin-dashboard/Client/Clients"));
const Dashboard = lazy(() => import("@/Page/admin-dashboard/Dashboard"));
const Invoices = lazy(() => import("@/Page/admin-dashboard/invoice/Invoices"));
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
const AddNewServiceForm = lazy(
  () => import("@/Page/admin-dashboard/add-services")
);
const AddSubscription = lazy(
  () => import("@/Page/admin-dashboard/add-subscription")
);
const FormSubmitted = lazy(
  () => import("@/Page/admin-dashboard/form-submitted")
);
const ChatPage = lazy(() => import("@/Page/admin-dashboard/ChatPage"));
const MapRegionOverview = lazy(() => import("@/Page/admin-dashboard/Map"));
const AllRequests = lazy(() => import("@/Page/admin-dashboard/AllRequests"));

export const adminSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    item: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        component: Dashboard,
        isActive: true,
        icon: LayoutDashboard, // Added icon
      },
      {
        title: "Clients",
        url: "/admin/client",
        component: Clients,
        isActive: false,
        icon: Users, // Added icon
      },
      {
        title: "Region",
        url: "/admin/region",
        component: Region,
        isActive: false,
        icon: MapPin, // Added icon
      },
      {
        title: "Employees",
        url: "/admin/employees",
        component: Employees,
        isActive: false,
        icon: Briefcase, // Added icon
      },
    ],
  },
  {
    title: "Business",
    item: [
      {
        title: "Subscibers",
        url: "/admin/subscibers",
        component: Subscriptions,
        isActive: false,
        icon: CreditCard, // Added icon
      },
      {
        title: "Services",
        url: "/admin/services",
        component: Services,
        isActive: false,
        icon: ClipboardList, // Added icon
      },
      {
        title: "All Requests",
        url: "/admin/all-requests",
        component: AllRequests,
        isActive: false,
        icon: ClipboardList, // Added icon
      },
      {
        title: "Invoices",
        url: "/admin/invoices",
        component: Invoices,
        isActive: false,
        icon: FileText, // Added icon
      },
      {
        title: "Employee Expense Request",
        url: "/admin/employee-expense-request",
        component: ExpenseAdmin,
        isActive: false,
        icon: DollarSign, // Added icon
      },
      {
        title: "Subscription Plan",
        url: "/admin/subscriptionplan",
        component: SubscriptionPlan,
        isActive: false,
        icon: ListPlus, // Added icon
      },
      {
        title: "Create Invoice",
        url: "/admin/create-invoice",
        component: CreateInvoiceForm,
        isActive: false,
        icon: FilePlus, // Added icon
      },
      {
        title: "Add New Plan",
        url: "/admin/add-new-plan",
        component: AddNewPlanForm,
        isActive: false,
        icon: PlusCircle, // Added icon
      },
      {
        title: "Add Services",
        url: "/admin/add-services",
        component: AddNewServiceForm,
        isActive: false,
        icon: CalendarPlus, // Added icon
      },
      {
        title: "Add Subscription",
        url: "/admin/add-subscription",
        component: AddSubscription,
        isActive: false,
        icon: PlusCircle, // Added icon
      },
    ],
  },
  {
    title: "Analytics",
    item: [
      {
        title: "Map",
        url: "/admin/map",
        component: MapRegionOverview,
        isActive: false,
        icon: MapPin, // Added icon
      },
      {
        title: "Notifications",
        url: "/admin/notifications",
        component: Notifications,
        isActive: false,
        icon: Bell, // Added icon
      },
      {
        title: "Reports",
        url: "/admin/reports",
        component: ReportsPage,
        isActive: false,
        icon: BarChart, // Added icon
      },
      {
        title: "Create form",
        url: "/admin/create-form",
        component: DynamicFormBuilder,
        isActive: false,
        icon: FilePenLine, // Added icon
      },
      {
        title: "submission form",
        url: "/admin/submission-form",
        component: FormSubmitted,
        isActive: false,
        icon: FileCheck2, // Added icon
      },
    ],
  },

  {
    title: "",
    item: [
      // {
      //   title: "Settings",
      //   url: "/admin/settings",
      //   component: ProfileSettingsPage,
      //   isActive: false,
      //   icon: Settings, // Added icon
      // },
    ],
  },
];

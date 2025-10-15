import { Permission, type UserRole } from "@/Types/Types";
import { lazy } from "react";

// Admin Components
const Dashboard = lazy(() => import("@/Page/admin-dashboard/Dashboard"));
const Clients = lazy(() => import("@/Page/admin-dashboard/Clients"));
const Invoices = lazy(() => import("@/Page/admin-dashboard/Invoices"));
const Map = lazy(() => import("@/Page/admin-dashboard/Map"));
const Notifications = lazy(() => import("@/Page/admin-dashboard/Notifications"));
const Region = lazy(() => import("@/Page/admin-dashboard/Region"));
const Reports = lazy(() => import("@/Page/admin-dashboard/Reports"));
const Services = lazy(() => import("@/Page/admin-dashboard/Services"));
const Settings = lazy(() => import("@/Page/admin-dashboard/Settings"));
const Subscriptions = lazy(() => import("@/Page/admin-dashboard/Subscriptions"));
const Employees = lazy(() => import("@/Page/admin-dashboard/Employees"));
const CreateInvoiceForm = lazy(() => import("@/Page/admin-dashboard/create-invoice"));
const AddNewPlanForm = lazy(() => import("@/Page/admin-dashboard/add-new-plan"));
const AddNewServiceForm = lazy(() => import("@/Page/admin-dashboard/add-services"));

// Employee Components
const EmployeeDashboard = lazy(() => import("@/Page/employee-dashboard/EmployeeDashboard"));
const EmployeeCommunication = lazy(() => import("@/Page/employee-dashboard/EmployeeCommunication"));
const EmployeeSetting = lazy(() => import("@/Page/employee-dashboard/EmployeeSetting"));
const EmployeeForms = lazy(() => import("@/Page/employee-dashboard/EmployeeForms"));
const EmployeeReports = lazy(() => import("@/Page/employee-dashboard/EmployeeReports"));
const EmployeeInvoices = lazy(() => import("@/Page/employee-dashboard/EmployeeInvoicees"));
const EmployeeSubscription = lazy(() => import("@/Page/employee-dashboard/EmployeeSubscription"));
const RegionDashboard = lazy(() => import("@/Page/employee-dashboard/RegionDashboard"));
const TaskEmployee = lazy(() => import("@/Page/employee-dashboard/TaskEmployee"));
const ChatPage = lazy(() => import("@/Page/employee-dashboard/ChatPage"));

// const SupervisorEmployeeReport = lazy(() => import("@/Page/supervisor-dashboard/SupervisorEmployeeReport"));
// const TeamManagement = lazy(() => import("@/Page/supervisor-dashboard/TeamManagement"));

// Client Components (to be created)
// const ClientDashboard = lazy(() => import("@/Page/client-dashboard/ClientDashboard"));
// const ClientSubscriptions = lazy(() => import("@/Page/client-dashboard/ClientSubscriptions"));
// const ClientInvoices = lazy(() => import("@/Page/client-dashboard/ClientInvoices"));
// const ClientReports = lazy(() => import("@/Page/client-dashboard/ClientReports"));
// const ClientServiceRequest = lazy(() => import("@/Page/client-dashboard/ClientServiceRequest"));
// const ClientServiceHistory = lazy(() => import("@/Page/client-dashboard/ClientServiceHistory"));
// const ClientSettings = lazy(() => import("@/Page/client-dashboard/ClientSettings"));

export interface RouteConfig {
  path: string;
  element: React.LazyExoticComponent<React.ComponentType<any>>;
  roles: UserRole[];
  permissions?: Permission[];
  label?: string;
}

export const PROTECTED_ROUTES: RouteConfig[] = [
  // ============ ADMIN ROUTES ============
  {
    path: "/",
    element: Dashboard,
    roles: ["admin"],
    permissions: [Permission.VIEW_DASHBOARD],
    label: "Dashboard",
  },
  {
    path: "/client",
    element: Clients,
    roles: ["admin"],
    permissions: [Permission.MANAGE_CLIENTS],
    label: "Clients",
  },
  {
    path: "/invoices",
    element: Invoices,
    roles: ["admin"],
    permissions: [Permission.VIEW_INVOICES],
    label: "Invoices",
  },
  {
    path: "/create-invoice",
    element: CreateInvoiceForm,
    roles: ["admin"],
    permissions: [Permission.VIEW_INVOICES],
    label: "Create Invoice",
  },
  {
    path: "/employees",
    element: Employees,
    roles: ["admin"],
    permissions: [Permission.MANAGE_EMPLOYEES],
    label: "Employees",
  },
  {
    path: "/map",
    element: Map,
    roles: ["admin"],
    permissions: [Permission.VIEW_MAP],
    label: "Map",
  },
  {
    path: "/notifications",
    element: Notifications,
    roles: ["admin"],
    permissions: [Permission.MANAGE_NOTIFICATIONS],
    label: "Notifications",
  },
  {
    path: "/region",
    element: Region,
    roles: ["admin"],
    permissions: [Permission.MANAGE_REGIONS],
    label: "Region",
  },
  {
    path: "/reports",
    element: Reports,
    roles: ["admin"],
    permissions: [Permission.VIEW_REPORTS],
    label: "Reports",
  },
  {
    path: "/services",
    element: Services,
    roles: ["admin"],
    permissions: [Permission.MANAGE_SERVICES],
    label: "Services",
  },
  {
    path: "/settings",
    element: Settings,
    roles: ["admin"],
    permissions: [Permission.MANAGE_SETTINGS],
    label: "Settings",
  },
  {
    path: "/subscription",
    element: Subscriptions,
    roles: ["admin"],
    permissions: [Permission.VIEW_SUBSCRIPTIONS],
    label: "Subscriptions",
  },
  {
    path: "/add-new-plan",
    element: AddNewPlanForm,
    roles: ["admin"],
    permissions: [Permission.MANAGE_SERVICES],
    label: "Add New Plan",
  },
  {
    path: "/add-services",
    element: AddNewServiceForm,
    roles: ["admin"],
    permissions: [Permission.MANAGE_SERVICES],
    label: "Add Services",
  },

  // ============ EMPLOYEE ROUTES (accessible by employee & supervisor) ============
  {
    path: "/employee-dashboard",
    element: EmployeeDashboard,
    roles: ["employee", "supervisor"],
    permissions: [Permission.VIEW_DASHBOARD],
    label: "Dashboard",
  },
  {
    path: "/employee-building",
    element: RegionDashboard,
    roles: ["employee", "supervisor"],
    permissions: [Permission.VIEW_BUILDING_REGION],
    label: "Building & Region",
  },
  {
    path: "/employee-building/:buildingName",
    element: TaskEmployee,
    roles: ["employee", "supervisor"],
    permissions: [Permission.VIEW_BUILDING_REGION],
    label: "Building Tasks",
  },
  {
    path: "/employee-communication",
    element: EmployeeCommunication,
    roles: ["employee", "supervisor"],
    permissions: [Permission.VIEW_COMMUNICATION],
    label: "Communication",
  },
  {
    path: "/employee-setting",
    element: EmployeeSetting,
    roles: ["employee", "supervisor"],
    permissions: [Permission.MANAGE_SETTINGS],
    label: "Settings",
  },
  {
    path: "/employee-forms",
    element: EmployeeForms,
    roles: ["employee", "supervisor"],
    permissions: [Permission.VIEW_FORMS],
    label: "Forms",
  },
  {
    path: "/employee-report",
    element: EmployeeReports,
    roles: ["employee", "supervisor"],
    permissions: [Permission.VIEW_REPORTS],
    label: "Reports",
  },
  {
    path: "/employee-invoice",
    element: EmployeeInvoices,
    roles: ["employee", "supervisor"],
    permissions: [Permission.VIEW_INVOICES],
    label: "Invoices",
  },
  {
    path: "/employee-subscriptions",
    element: EmployeeSubscription,
    roles: ["employee", "supervisor"],
    permissions: [Permission.VIEW_SUBSCRIPTIONS],
    label: "Subscriptions",
  },

  // ============ SUPERVISOR EXCLUSIVE ROUTES ============
//   {
//     path: "/supervisor-employee-report",
//     element: SupervisorEmployeeReport,
//     roles: ["supervisor"],
//     permissions: [Permission.REPORT_EMPLOYEE],
//     label: "Employee Reports",
//   },
//   {
//     path: "/supervisor-team-management",
//     element: TeamManagement,
//     roles: ["supervisor"],
//     permissions: [Permission.MANAGE_TEAM],
//     label: "Team Management",
//   },

  // ============ CLIENT ROUTES ============
//   {
//     path: "/client-dashboard",
//     element: ClientDashboard,
//     roles: ["client"],
//     permissions: [Permission.VIEW_DASHBOARD],
//     label: "Dashboard",
//   },
//   {
//     path: "/client-subscriptions",
//     element: ClientSubscriptions,
//     roles: ["client"],
//     permissions: [Permission.VIEW_OWN_SUBSCRIPTIONS],
//     label: "My Subscriptions",
//   },
//   {
//     path: "/client-invoices",
//     element: ClientInvoices,
//     roles: ["client"],
//     permissions: [Permission.VIEW_OWN_INVOICES],
//     label: "My Invoices",
//   },
//   {
//     path: "/client-reports",
//     element: ClientReports,
//     roles: ["client"],
//     permissions: [Permission.VIEW_OWN_REPORTS],
//     label: "Service Reports",
//   },
//   {
//     path: "/client-service-request",
//     element: ClientServiceRequest,
//     roles: ["client"],
//     permissions: [Permission.REQUEST_SERVICE],
//     label: "Request Service",
//   },
//   {
//     path: "/client-service-history",
//     element: ClientServiceHistory,
//     roles: ["client"],
//     permissions: [Permission.VIEW_SERVICE_HISTORY],
//     label: "Service History",
//   },
//   {
//     path: "/client-settings",
//     element: ClientSettings,
//     roles: ["client"],
//     permissions: [Permission.MANAGE_SETTINGS],
//     label: "Settings",
//   },

  // ============ SHARED ROUTES ============
  {
    path: "/chat",
    element: ChatPage,
    roles: ["admin", "employee", "supervisor", "client"],
    permissions: [Permission.VIEW_COMMUNICATION],
    label: "Chat",
  },
];

// Default redirects based on role
export const ROLE_REDIRECTS: Record<UserRole, string> = {
  admin: "/",
  supervisor: "/employee-dashboard",
  employee: "/employee-dashboard",
  client: "/client-dashboard",
  guest: "/login",
};

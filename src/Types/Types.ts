export type Subscription = {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Pending" | "Auto-Renew" | "Expired";
  location: string;
  package: string;
  startDate: string;
  countdown: string;
  nextPayment: string;
  invoice: boolean;
};
export interface MenuItem {
  icon: string;
  label: string;
  path: string;
}

export interface MenuSection {
  heading: string | null;
  items: MenuItem[];
}

export type UserRole = "admin" | "employee" | "supervisor" | "client" | "guest";

export interface User {
  id: string;
  email: string;
  user_type: UserRole;
  name?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export enum Permission {
  // Employee permissions
  VIEW_DASHBOARD = "view_dashboard",
  VIEW_SUBSCRIPTIONS = "view_subscriptions",
  VIEW_BUILDING_REGION = "view_building_region",
  VIEW_INVOICES = "view_invoices",
  VIEW_REPORTS = "view_reports",
  VIEW_FORMS = "view_forms",
  VIEW_COMMUNICATION = "view_communication",
  MANAGE_SETTINGS = "manage_settings",

  // Supervisor extra permissions
  REPORT_EMPLOYEE = "report_employee",
  VIEW_EMPLOYEE_PERFORMANCE = "view_employee_performance",
  MANAGE_TEAM = "manage_team",

  // Admin permissions
  MANAGE_CLIENTS = "manage_clients",
  MANAGE_EMPLOYEES = "manage_employees",
  MANAGE_REGIONS = "manage_regions",
  MANAGE_SERVICES = "manage_services",
  VIEW_MAP = "view_map",
  VIEW_ANALYTICS = "view_analytics",
  MANAGE_NOTIFICATIONS = "manage_notifications",

  // Client permissions
  VIEW_OWN_SUBSCRIPTIONS = "view_own_subscriptions",
  VIEW_OWN_INVOICES = "view_own_invoices",
  VIEW_OWN_REPORTS = "view_own_reports",
  REQUEST_SERVICE = "request_service",
  VIEW_SERVICE_HISTORY = "view_service_history",
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    Permission.VIEW_DASHBOARD,
    Permission.MANAGE_CLIENTS,
    Permission.MANAGE_EMPLOYEES,
    Permission.MANAGE_REGIONS,
    Permission.MANAGE_SERVICES,
    Permission.VIEW_INVOICES,
    Permission.VIEW_REPORTS,
    Permission.VIEW_MAP,
    Permission.VIEW_ANALYTICS,
    Permission.MANAGE_NOTIFICATIONS,
    Permission.MANAGE_SETTINGS,
  ],
  supervisor: [
    // All employee permissions
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_SUBSCRIPTIONS,
    Permission.VIEW_BUILDING_REGION,
    Permission.VIEW_INVOICES,
    Permission.VIEW_REPORTS,
    Permission.VIEW_FORMS,
    Permission.VIEW_COMMUNICATION,
    Permission.MANAGE_SETTINGS,
    // Extra supervisor permissions
    Permission.REPORT_EMPLOYEE,
    Permission.VIEW_EMPLOYEE_PERFORMANCE,
    Permission.MANAGE_TEAM,
  ],
  employee: [
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_SUBSCRIPTIONS,
    Permission.VIEW_BUILDING_REGION,
    Permission.VIEW_INVOICES,
    Permission.VIEW_REPORTS,
    Permission.VIEW_FORMS,
    Permission.VIEW_COMMUNICATION,
    Permission.MANAGE_SETTINGS,
  ],
  client: [
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_OWN_SUBSCRIPTIONS,
    Permission.VIEW_OWN_INVOICES,
    Permission.VIEW_OWN_REPORTS,
    Permission.REQUEST_SERVICE,
    Permission.VIEW_SERVICE_HISTORY,
    Permission.MANAGE_SETTINGS,
  ],
  guest: [],
};

import {
  createApi,
  fetchBaseQuery,
  type RootState,
} from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/authSlice"; // Import logout

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  //  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Token expired, log out the user
    api.dispatch(logout());
    // Optionally, you can add a toast notification here
    // toast.error("Your session has expired. Please log in again.");
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth, // Use the custom baseQuery

  tagTypes: [
    "User",
    "Invoice",
    "AddEmployee",
    "AdminEmployeeOverview",
    "GetAllEmployeeAdmin",
    "GetAllClientsAdmin",
    "GetClientOverviewAdmin",
    "region",
    "Subscription",
    "AdminDashboard",
    "Building",
    "GetServiceAdminOverview",
    "GetAllServiceDataAdmin",
    "SearchClients",
    "SearchEmployees",
    "SearchInvoices",
    "EmployeeDashboard",
    "Report",
    "Clients",
    "UpdateProfile",
    "Apartment",
    "ServiceCategories",
    "plan",
    "getUserProfile",
    "ClientProfile",
    "ClientSubscription",
    "AdminCreateInvoice",
    "ExpenseCategory",
    "EmployeeExpense",
    "notification",
    "reports",
    "form",
    "task",
    "GetSupervisorReports",
    "GetEmployeeTasks",
    "Employee"
  ],

  endpoints: () => ({}),
});

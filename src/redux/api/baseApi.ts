import {
  createApi,
  fetchBaseQuery,
  type RootState,
} from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
   //  credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

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
    "getEmployeeInvoice",
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
    "GetSupervisorReports"
  ],

  endpoints: () => ({}),
});

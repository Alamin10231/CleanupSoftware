// src/redux/api/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

/* ---------- Types ---------- */
export type SubsPage = {
  count: number;
  next: string | null;
  previous: string | null;
  results: any[];
};

// lower-case month names your backend expects (e.g. "october")
export type MonthLower =
  | "january" | "february" | "march" | "april" | "may" | "june"
  | "july" | "august" | "september" | "october" | "november" | "december";

// one row in outgoing_sales; API sometimes sends `soudi_hour` (typo) or `saudi_hour`
export type OutgoingSale = {
  time: string;          // "YYYY-MM-DD HH:mm:ss"
  amount: number;
  month: string;         // "October"
  soudi_hour?: string;   // optional label from API (typo variant)
  saudi_hour?: string;   // optional label from API (corrected variant)
};

export type TopClient = {
  client__id: number | null;
  client__name: string | null;
  client__email: string | null;
  total_sales: number;
};

export type AdminDashboard = {
  clients: number;
  month_new_subscription: number;
  month_sales: number;
  month_new_added_building: number;
  outgoing_sales: OutgoingSale[];
  analitycs: { stopped: number; paused: number; new_active?: number };
  recent_activity: any[];
  top_clients?: TopClient[];
};

/** 🔹 Top Performers (list item) */
export type TopPerformer = {
  id: number;
  name: string;
  role: string;
  services: number;
};

/** 🔹 Generic paginated shape */
export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.10.13.75:8015/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["User","Invoice","AddEmployee","AdminEmployeeOverview","GetAllEmployeeAdmin", "GetAllClientsAdmin", "GetClientOverviewAdmin", "region", "Subscription","AdminDashboard","Building",
    "GetServiceAdminOverview",
    "GetAllServiceDataAdmin",
    "SearchClients",
    "SearchEmployees",
    "SearchInvoices",
  ],

  endpoints: (builder) => ({
    // getInvoices: builder.query<any, void>({
    //   query: () => "/plan/invoice/list/",
    //   providesTags: ["Invoice"],
    // }),
    getInvoices: builder.query<any, string | void>({
      query: (params = "") => `/plan/invoice/list/${params}`,
      providesTags: ["Invoice"],
    }),
    getServiceAdminOverview: builder.query<any, string | void>({
      query: () => "task/total-service-details/",
      providesTags: ["GetServiceAdminOverview"],
    }),
    getAllServiceDataAdmin: builder.query<any, string | void>({
      query: () => "task/services/details/",
      providesTags: ["GetAllServiceDataAdmin"],
    }),
    getCalculationInvoice: builder.query<any, void>({
      query: () => "/plan/calculations/",
      providesTags: ["Invoice"],
    }),
    addInvoice: builder.mutation({
      query: (invoice) => ({
        url: "/plan/invoice/list/",
        method: "POST",
        body: invoice,
      }),
      invalidatesTags: ["Invoice"],
    }),


    /* ---------- USERS / EMPLOYEES / REGIONS ---------- */
    getAllClient: builder.query<any, void>({
      query: () => "/users/?search=client",
      providesTags: ["User"],
    }),

    getSearchClients: builder.query({
      query: (searchTerm = "") => `clients/?search=${searchTerm}`,
      providesTags: ["SearchClients"],
    }),
    getSearchAllEmpoloyees: builder.query({
      query: (searchEmployee = "") => `employees/?search=${searchEmployee}`,
      providesTags: ["SearchEmployees"],
    }),
    getSearchAllInvoice: builder.query({
      query: (searchInvoice = "") =>
        `plan/invoice/list/?search=${searchInvoice}`,
      // "plan/invoice/list/?search=238947f4-bd49-49fd-aa94-6fa9c4b8a0a1",
      providesTags: ["SearchInvoices"],
    }),


    addEmployee: builder.mutation({
      query: (add_employee) => ({
        url: "/employees/",
        method: "POST",
        body: add_employee,
      }),
      invalidatesTags: ["AddEmployee"],
    }),
    getregions: builder.query<any, void>({
      query: () => "/locations/overview/",
      providesTags: ["region"],
    }),
    getcalculationregion: builder.query<any, void>({
      query: () => "/locations/overview/",
      providesTags: ["region"],
    }),
    addregion: builder.mutation({
      query: (region) => ({
        url: "/locations/overview/",
        method: "POST",
        body: region,
      }),
      invalidatesTags: ["region"],
    }),
    employeeOverview: builder.query<any, void>({
      query: () => "/overview/",
      providesTags: ["AdminEmployeeOverview"],
    }),
    getAllemployeeAdmin: builder.query<any, number | void>({
      query: (page = 1) => `employees/?page=${page}`,
      providesTags: ["GetAllEmployeeAdmin"],
    }),

    getAllClientsAdmin: builder.query<any, number | void>({
      query: (page = 1) => `/clients/?page=${page}`,
      providesTags: ["GetAllClientsAdmin"],
    }),
    getClientOverviewAdmin: builder.query<any, void>({
      query: () => "clients/overview/",
      providesTags: ["GetClientOverviewAdmin"],
    }),


    /* ---------- ADMIN DASHBOARD (POST year+month) ---------- */
    getAdminDashboard: builder.query<AdminDashboard, { year: number; month: MonthLower }>({
      query: ({ year, month }) => ({
        url: "/dashboard/",
        method: "POST",
        body: { year: Number(year), month: String(month).toLowerCase() as MonthLower },
      }),
      providesTags: ["AdminDashboard"],
    }),

    /* ---------- SUBSCRIPTION ---------- */
    getCalculationSubscriptions: builder.query<any, void>({
      query: () => "/plan/subscription/status_details/",
      providesTags: ["Subscription"],
    }),
    getSubscriptionPage: builder.query<
      SubsPage,
      { page: number; page_size: number; status?: string }
    >({
      query: ({ page, page_size, status }) => {
        const s = status && status !== "All status" ? status : undefined;
        const qs = new URLSearchParams({
          page: String(page),
          page_size: String(page_size),
          ...(s ? { status: s } : {}),
        }).toString();
        return `/plan/subscription/?page${qs}`; // fixed
      },
      providesTags: ["Subscription"],
    }),

    /* ---------- TOP PERFORMERS (paginated) ---------- */
    getTopPerformersPage: builder.query<Paginated<TopPerformer>, { page?: number; page_size?: number }>({
      query: ({ page = 1, page_size = 10 } = {}) =>
        `/employees/top-performers/?page=${page}&page_size=${page_size}`,
    }),
  }),
});

export const {
  // invoice
  useGetInvoicesQuery,
  useAddInvoiceMutation,
  useGetCalculationInvoiceQuery,
  useGetServiceAdminOverviewQuery,
  useGetAllServiceDataAdminQuery,
  useGetSearchClientsQuery,
  useGetSearchAllEmpoloyeesQuery,
  useGetSearchAllInvoiceQuery,
  // users / employees / regions
  useGetAllClientQuery,
  useAddEmployeeMutation,
  useGetregionsQuery,
  useGetcalculationregionQuery,
  useAddregionMutation,
  useEmployeeOverviewQuery,
  useGetAllemployeeAdminQuery,
  useGetAllClientsAdminQuery,
  useGetClientOverviewAdminQuery,

  // subscription
  useGetCalculationSubscriptionsQuery,
  useGetSubscriptionPageQuery,

  // admin dashboard
  useGetAdminDashboardQuery,

  // top performers
  useGetTopPerformersPageQuery,
} = apiSlice;

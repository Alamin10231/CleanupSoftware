// src/redux/api/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* ---------- Types ---------- */
export type SubsPage = {
  count: number;
  next: string | null;
  previous: string | null;
  results: any[];
};

// lower-case month names your backend expects (e.g. "october")
export type MonthLower =
  | "january"
  | "february"
  | "march"
  | "april"
  | "may"
  | "june"
  | "july"
  | "august"
  | "september"
  | "october"
  | "november"
  | "december";

// one row in outgoing_sales; API sometimes sends `soudi_hour` (typo) or `saudi_hour`
export type OutgoingSale = {
  time: string; // "YYYY-MM-DD HH:mm:ss"
  amount: number;
  month: string; // "October"
  soudi_hour?: string; // optional label from API (typo variant)
  saudi_hour?: string; // optional label from API (corrected variant)
};

export type AdminDashboard = {
  clients: number;
  month_new_subscription: number;
  month_sales: number;
  month_new_added_building: number;
  outgoing_sales: OutgoingSale[];
  analitycs: { stopped: number; paused: number };
  recent_activity: any[];
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.10.13.75:8015/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any)?.auth?.accessToken;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: [
    "User",
    "Invoice",
    "AddEmployee",
    "AdminEmployeeOverview",
    "GetAllEmpolyeeAdmin",
    "GetAllClientsAdmin",
    "GetClientOverviewAdmin",
    "region",
    "Subscription",
    "AdminDashboard",
  ],
  endpoints: (builder) => ({
    /* ---------- INVOICE ---------- */
    getInvoices: builder.query<any, void>({
      query: () => "/plan/invoice/list/",
      providesTags: ["Invoice"],
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
      query: (page = 1) => `/employees/?page=${page}`,
      providesTags: ["GetAllEmpolyeeAdmin"],
    }),
    getAllClientsAdmin: builder.query<any, number | void>({
      query: (page = 1) => `/clients/?page=${page}`,
      providesTags: ["GetAllClientsAdmin"],
    }),
    getClientOverviewAdmin: builder.query<any, void>({
      query: () => "/clients/overview/",
      providesTags: ["GetClientOverviewAdmin"],
    }),

    /* ---------- ADMIN DASHBOARD (POST year+month) ---------- */
    getAdminDashboard: builder.query<
      AdminDashboard,
      { year: number; month: MonthLower }
    >({
      query: ({ year, month }) => ({
        url: "/dashboard/",
        method: "POST",
        body: {
          year: Number(year),
          month: String(month).toLowerCase() as MonthLower,
        },
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
        return `/plan/subscription/?${qs}`;
      },
      providesTags: ["Subscription"],
    }),
  }),
});

export const {
  // invoice
  useGetInvoicesQuery,
  useGetCalculationInvoiceQuery,
  useAddInvoiceMutation,

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
} = apiSlice;

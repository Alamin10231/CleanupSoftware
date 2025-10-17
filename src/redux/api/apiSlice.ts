import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.10.13.75:8015/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.accessToken;
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
    "GetAllEmpolyeeAdmin",
    "GetAllClientsAdmin",
    "GetClientOverviewAdmin",
    "region",
    "AdminEmployeeOverview",
    "Subscription", // ← added
  ],
  endpoints: (builder) => ({
    // ---------- INVOICE ----------
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

    // ---------- USERS / EMPLOYEES / REGIONS ----------
    getAllClient: builder.query<any, void>({
      query: () => "users/?search=client&",
      providesTags: ["User"],
    }),
    addEmployee: builder.mutation({
      query: (add_employee) => ({
        url: "employees/",
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
      query: () => "overview",
      providesTags: ["AdminEmployeeOverview"],
    }),
    getAllemployeeAdmin: builder.query<any, number | void>({
      query: (page = 1) => `employees/?page=${page}`,
      providesTags: ["GetAllEmpolyeeAdmin"],
    }),
    getAllClientsAdmin: builder.query<any, number | void>({
      query: (page = 1) => `clients/?page=${page}`,
      providesTags: ["GetAllClientsAdmin"],
    }),
    getClientOverviewAdmin: builder.query<any, number | void>({
      query: () => "clients/overview/",
      providesTags: ["GetClientOverviewAdmin"],
    }),

    // ---------- SUBSCRIPTION (GET-only, mirrors invoice) ----------
    // getSubscriptions: builder.query<any, void>({
    //   query: () => "/plan/subscription/list/",
    //   providesTags: ["Subscription"],
    // }),
    getSubscriptions:builder.query<any,void>({
   
      query:()=>"/plan/subscription/status_details",
      providesTags:["Subscription"]
    }),
   getCalculationSubscriptions:builder.query<any,void>({
       query: () => "/plan/subscription/status_details",
    providesTags:["Subscription"]
   })
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

  // subscription (GET-only)
  useGetSubscriptionsQuery,
  useGetCalculationSubscriptionsQuery
} = apiSlice;

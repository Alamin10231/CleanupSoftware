import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.10.13.75:8015/api/v1/",
    // credentials: "include",
    // ✅ Uncomment if you use token-based auth
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.accessToken;
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

    getAllClient: builder.query<any, void>({
      query: () => "users/?search=client&",
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
      providesTags: ["SearchInvoices"],
    }),
   

    employeeOverview: builder.query<any, void>({
      query: () => "overview",
      providesTags: ["AdminEmployeeOverview"],
    }),
    //
    getAllemployeeAdmin: builder.query<any, number | void>({
      query: (page = 1) => `employees/?page=${page}`,
      providesTags: ["GetAllEmployeeAdmin"],
    }),

    getAllClientsAdmin: builder.query<any, number | void>({
      query: (page = 1) => `clients/?page=${page}`,
      providesTags: ["GetAllClientsAdmin"],
    }),
    getClientOverviewAdmin: builder.query<any, void>({
      query: () => "clients/overview/",
      providesTags: ["GetClientOverviewAdmin"],
    }),

    addEmployee: builder.mutation({
      query: (add_employee) => ({
        url: "employees/",
        method: "POST",
        body: add_employee,
      }),
      invalidatesTags: ["AddEmployee"],
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useAddInvoiceMutation,
  useAddEmployeeMutation,
  useGetCalculationInvoiceQuery,
  useGetAllClientQuery,
  useEmployeeOverviewQuery,
  useGetAllemployeeAdminQuery,
  useGetAllClientsAdminQuery,
  useGetClientOverviewAdminQuery,
  useGetServiceAdminOverviewQuery,
  useGetAllServiceDataAdminQuery,
  useGetSearchClientsQuery,
  useGetSearchAllEmpoloyeesQuery,
  useGetSearchAllInvoiceQuery,
} = apiSlice;

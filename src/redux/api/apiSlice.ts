import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Subscription } from "../../assets/assets";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.10.13.61:8015/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Invoice", "AddEmployee", "AdminEmployeeOverview", "GetAllEmpolyeeAdmin"],
  endpoints: (builder) => ({
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
    getAllClient: builder.query<any, void>({
      query: () => "users/?search=client&",
      providesTags: ["User"],
    }),
    employeeOverview: builder.query<any, void>({
      query: () => "overview",
      providesTags: ["AdminEmployeeOverview"],
    }),
    // getAllemployeeAdmin: builder.query<any, void>({
    //   query: () => "employees",
    //   providesTags: ["GetAllEmpolyeeAdmin"],
    // }),
    getAllemployeeAdmin: builder.query<any, number | void>({
      query: (page = 1) => `employees/?page=${page}`,
      providesTags: ["GetAllEmpolyeeAdmin"],
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
  useGetAllemployeeAdminQuery
} = apiSlice;

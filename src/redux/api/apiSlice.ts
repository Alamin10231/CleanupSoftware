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
  tagTypes: ["User", "Invoice", "AddEmployee", "AdminEmployeeOverview", "GetAllEmpolyeeAdmin","GetAllClientsAdmin","GetClientOverviewAdmin"],
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
  useGetClientOverviewAdminQuery
  
} = apiSlice;
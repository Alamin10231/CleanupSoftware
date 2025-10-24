// src/redux/features/employee/report/reporttable.api.ts
import { baseApi } from "@/redux/api/baseApi";

// Minimal types to match your backend
export type EmployeeProfile = {
  id: number;
  department: string | null;
  role: string | null;
  shift: string | null;
  avatar: string | null;
  is_on_leave: boolean;
  location: string | null;
  national_id: string | null;
  contact_number: string | null;
  contract_start: string | null;
  contract_end: string | null;
  base_salary: string | null;
};

export type EmployeeItem = {
  id: number;
  name: string;
  email: string;
  user_type: string;
  prime_phone: string | null;
  is_active: boolean;
  date_joined: string; // ISO
  employee_profile?: EmployeeProfile | null;
  // other fields...
};

export type EmployeePage = {
  count: number;
  next: string | null;
  previous: string | null;
  results: EmployeeItem[];
};

export const employeeDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch 1 page of employees (server already paginates)
    getEmployeesPage: builder.query<EmployeePage, number | void>({
      query: (page = 1) => ({
        url: `/employees/?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Report"],
    }),

    // (kept for your single-employee fetch if you still need it elsewhere)
    getReportTable: builder.query<EmployeeItem, number>({
      query: (id: number) => ({ url: `employees/${id}`, method: "GET" }),
      providesTags: ["Report"],
    }),
  }),
});

export const { useGetEmployeesPageQuery, useGetReportTableQuery } =
  employeeDashboardApi;

// src/redux/features/employee/report/reporttable.api.ts
import { baseApi } from "@/redux/api/baseApi";

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
  date_joined: string;
  employee_profile?: EmployeeProfile | null;
};

export type EmployeePage = {
  count: number;
  next: string | null;
  previous: string | null;
  results: EmployeeItem[];
};

export const employeeDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Fetch employee list (paginated)
    getEmployeesPage: builder.query<EmployeePage, number | void>({
      query: (page = 1) => ({
        url: `/employees/?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Report"],
    }),

    // ✅ Fetch single employee details
    getReportTable: builder.query<EmployeeItem, number>({
      query: (id: number) => ({
        url: `employees/${id}`,
        method: "GET",
      }),
      providesTags: ["Report"],
    }),

    // ✅ POST supervisor form
    createSupervisorForm: builder.mutation<any, Record<string, any>>({
      query: (body) => ({
        url: `supervisor-forms/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Report"], 
    }),
  }),
});


export const {
  useGetEmployeesPageQuery,
  useGetReportTableQuery,
  useCreateSupervisorFormMutation,
} = employeeDashboardApi;

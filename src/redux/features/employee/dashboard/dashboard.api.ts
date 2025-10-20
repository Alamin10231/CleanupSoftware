import { baseApi } from "@/redux/api/baseApi";

export const employeeDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeDashboard: builder.query<any, void>({
      query: () => "task/task_assign_employee/",
      providesTags: ["EmployeeDashboard"],
    }),

    getEmployeeChart: builder.query<any, string>({
      query: (employeeId) => `task/report/employee/${employeeId}/`,
      providesTags: ["EmployeeDashboard"],
    }),
  }),
});

export const { useGetEmployeeDashboardQuery, useGetEmployeeChartQuery } =
  employeeDashboardApi;

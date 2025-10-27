import { baseApi } from "@/redux/api/baseApi";

export const employeeDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeDashboard: builder.query<any, void>({
      query: () => "task/task_assign_employee/",
      providesTags: ["EmployeeDashboard"], // This tag is provided for caching
    }),

    getEmployeeChart: builder.query<any, string>({
      query: (employeeId) => `task/report/employee/${employeeId}/`,
      providesTags: ["EmployeeDashboard"], // This tag is provided for caching
    }),

    createAdminNewPlan: builder.mutation<any, any>({
      query: (body) => ({
        url: "/plan/list/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["EmployeeDashboard"], // Invalidate the dashboard data if a new plan is created
    }),

    updateTaskAssignEmployeeById: builder.mutation<
      any,
      { id: number } & Record<string, any>
    >({
      query: ({ id, ...body }) => ({
        url: `/task/task_assign_employee/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["EmployeeDashboard"], // Invalidate the dashboard data if a task is updated
    }),
  }),
});

export const {
  useGetEmployeeDashboardQuery,
  useGetEmployeeChartQuery,
  useCreateAdminNewPlanMutation,
  useUpdateTaskAssignEmployeeByIdMutation,
} = employeeDashboardApi;

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

    createAdminNewPlan: builder.mutation<any, any>({
      query: (body) => ({
        url: "/plan/list/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["EmployeeDashboard"], 
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
      invalidatesTags: ["EmployeeDashboard"],
    }),
  }),
});

export const {
  useGetEmployeeDashboardQuery,
  useGetEmployeeChartQuery,
  useCreateAdminNewPlanMutation,
  useUpdateTaskAssignEmployeeByIdMutation,
} = employeeDashboardApi;

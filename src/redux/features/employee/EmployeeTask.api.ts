import { baseApi } from "@/redux/api/baseApi";

export const employeetaskapi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeTasks: builder.query({
      query: () => `task/task_assign_employee/`,
      providesTags: ["GetEmployeeTasks"],
    }),
  }),
});

export const { useGetEmployeeTasksQuery } = employeetaskapi;

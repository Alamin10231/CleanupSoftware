import { baseApi } from "@/redux/api/baseApi";

export const employeetaskapi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeTasks: builder.query({
      query: (page = 1) => `task/task_assign_employee/?page=${page}&page_size=10`,
      providesTags: ["task"],
    }),
  }),
});

export const { useGetEmployeeTasksQuery } = employeetaskapi;

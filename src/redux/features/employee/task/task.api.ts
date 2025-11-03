import { baseApi } from "@/redux/api/baseApi";

export const employeetaskapi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeTasks: builder.query({
      query: (page = 1) => `task/task_assign_employee/?page=${page}&page_size=10`,
      providesTags: ["task"],
    }),
    getEmployeeTaskForClient: builder.query<any, void>({
  query: () => `task/task_assign_employee`,
  providesTags: ["task"],
}),

  }),
});

export const { useGetEmployeeTasksQuery, useGetEmployeeTaskForClientQuery } = employeetaskapi;

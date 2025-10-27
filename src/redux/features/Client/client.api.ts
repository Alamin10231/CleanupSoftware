import { baseApi } from "@/redux/api/baseApi";

export const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addClient: builder.mutation({
      query: (data) => ({
        url: `/clients/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["GetAllClientsAdmin"],
    }),
    getClientTasks: builder.query({
      query: (page = 1) => `task/task_assign_client/?page=${page}&page_size=10`,
      providesTags: ["task"],
    }),
  }),
});

export const { useAddClientMutation, useGetClientTasksQuery } = clientApi;

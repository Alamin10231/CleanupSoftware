import { baseApi } from "@/redux/api/baseApi";

export const employeeDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeSubscription: builder.query<any, { page?: number; search?: string; status?: string }>({
      query: ({ page = 1, search, status }) => {
        let url = `plan/subscription/?page=${page}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        if (status && status !== "all") url += `&status=${status}`;
        return url;
      },
      providesTags: ["Subscription"],
    }),
    getCurrentTask: builder.query<any, void>({
      query: () => "task/task_assign_employee/",
      providesTags: ["Subscription"],
    }),
  }),
});

export const { useGetEmployeeSubscriptionQuery, useGetCurrentTaskQuery } = employeeDashboardApi;
import { baseApi } from "@/redux/api/baseApi";

export const employeeDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeSubscription: builder.query<any, void>({
      query: () => "plan/subscription/",
      providesTags: ["Subscription"],
    }),
    getCurrentTask: builder.query<any, void>({
      query: () => "task/task_assign_employee/",
      providesTags: ["Subscription"],
    }),
  }),
});

export const { useGetEmployeeSubscriptionQuery ,useGetCurrentTaskQuery} = employeeDashboardApi;

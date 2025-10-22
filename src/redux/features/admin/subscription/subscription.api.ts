// src/redux/features/admin/users/subscription.api.ts
import { baseApi } from "@/redux/api/baseApi";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCalculationSubscriptions: builder.query<any, void>({
      query: () => "/plan/subscription/status_details/",
      providesTags: ["Subscription"],
    }),

    getSubscriptionPage: builder.query<
      SubsPage,
      { page: number; page_size: number; status?: string }
    >({
      query: ({ page, page_size, status }) => {
        const s = status && status !== "All status" ? status : undefined;
        const qs = new URLSearchParams({
          page: String(page),
          page_size: String(page_size),
          ...(s ? { status: s } : {}),
        }).toString();
        return `/plan/subscription/?${qs}`;
      },
      providesTags: ["Subscription"],
    }),

    getAdminNewplans: builder.query<any, void>({
      query: () => "/plan/subscription/",
      providesTags: ["Subscription"],
    }),

    getCollectionNewPlans: builder.query<any, void>({
      query: () => "/plan/subscription/",
      providesTags: ["Subscription"],
    }),

    getAdminStatus: builder.query<any, { status?: string; page?: number }>({
      query: ({ status = "", page = 1 }) =>
        `/plan/subscription/?page=${page}&status=${encodeURIComponent(status)}`,
      providesTags: ["Subscription"],
    }),

    getCollectionStatus: builder.query<any, { status?: string; page?: number }>({
      query: ({ status = "", page = 1 }) =>
        `/plan/subscription/?page=${page}&status=${encodeURIComponent(status)}`,
      providesTags: ["Subscription"],
    }),

    // Create new plan
    createAdminNewPlan: builder.mutation<any, any>({
      query: (body) => ({
        url: "/plan/list/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subscription"],
    }),

    // ✅ Put assign employee to a task
   updateTaskAssignEmployeeById: builder.mutation<
      any,
      { id: number } & Record<string, any>
    >({
      query: ({ id, ...body }) => ({
        url: `/task/task_assign_employee/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Subscription"],
    }),

  }),
});

// ✅ export all hooks
export const {
  useGetCalculationSubscriptionsQuery,
  useGetSubscriptionPageQuery,
  useGetAdminNewplansQuery,
  useGetCollectionNewPlansQuery,
  useGetAdminStatusQuery,
  useGetCollectionStatusQuery,
  useCreateAdminNewPlanMutation,
  useUpdateTaskAssignEmployeeByIdMutation// <-- added
} = subscriptionApi;

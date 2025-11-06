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
      { page: number; page_size: number; status?: string; search?: string }
    >({
      query: ({ page, page_size, status, search }) => {
        const s = status && status !== "All status" ? status : undefined;
        const qs = new URLSearchParams({
          page: String(page),
          page_size: String(page_size),
          ...(s ? { status: s } : {}),
          ...(search ? { search: search } : {}),
        }).toString();
        return `/plan/subscription/?${qs}`;
      },
      providesTags: ["Subscription"],
    }),

    getCollectionNewPlans: builder.query<any, void>({
      query: () => "/plan/subscription/",
      providesTags: ["Subscription"],
    }),

    getAdminStatus: builder.query<
      any,
      { status?: string; page?: number; search?: string }
    >({
      query: ({ status = "", page = 1, search = "" }) =>
        `/plan/subscription/?page=${page}&status=${encodeURIComponent(
          status
        )}&search=${encodeURIComponent(search)}`,
      providesTags: ["Subscription"],
    }),

    getCollectionStatus: builder.query<
      any,
      { status?: string; page?: number; search?: string }
    >({
      query: ({ status = "", page = 1, search = "" }) =>
        `plan/subscription/?page=${page}&status=${encodeURIComponent(
          status
        )}&search=${encodeURIComponent(search)}`,
      providesTags: ["Subscription"],
    }),

    addSubscription: builder.mutation({
      query: (body) => ({
        url: "plan/subscriptions-create/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subscription"],
    }),

    updateSubscription: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `plan/subscriptions-create/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Subscription"],
    }),
  }),
});

export const {
  useGetCalculationSubscriptionsQuery,
  useGetSubscriptionPageQuery,
  useGetCollectionNewPlansQuery,
  useGetAdminStatusQuery,
  useGetCollectionStatusQuery,
  useAddSubscriptionMutation,
  useUpdateSubscriptionMutation,
} = subscriptionApi;

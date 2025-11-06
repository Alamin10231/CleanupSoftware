// src/redux/features/admin/users/subscription.api.ts
import { baseApi } from "@/redux/api/baseApi";

export type SubsPage = {
  results: any[];
  count: number;
  next?: string | null;
  previous?: string | null;
};

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1️⃣ Calculation summary
    getCalculationSubscriptions: builder.query<any, void>({
      query: () => "/plan/subscription/status_details/",
      providesTags: ["Subscription"],
    }),

    // 2️⃣ Paginated subscription list
    getSubscriptionPage: builder.query<
  SubsPage,
  { page?: number; page_size?: number; status?: string; search?: string }
>({
  query: ({ page = 1, page_size = 10, status, search }) => {
    const params: Record<string, string> = {
      page: String(page),
      page_size: String(page_size),
    };
    if (status && status !== "All status") params.status = status;
    if (search) params.search = search;

    const qs = new URLSearchParams(params).toString();
    return `/plan/subscription/?${qs}`;
  },
  providesTags: ["Subscription"],
}),


    // 3️⃣ New plans collection
    getCollectionNewPlans: builder.query<any, void>({
      query: () => "/plan/subscription/",
      providesTags: ["Subscription"],
    }),

    // 4️⃣ Admin status with pagination
    getAdminStatus: builder.query<
      SubsPage,
      { status?: string; page?: number; search?: string; page_size?: number }
    >({
      query: ({ status = "", page = 1, search = "", page_size = 10 }) => {
        const params: Record<string, string> = {
          page: String(page),
          page_size: String(page_size),
          status,
          search,
        };
        const qs = new URLSearchParams(params).toString();
        return `/plan/subscription/?${qs}`;
      },
      providesTags: ["Subscription"],
    }),

    // 5️⃣ Collection status with pagination
    getCollectionStatus: builder.query<
      SubsPage,
      { status?: string; page?: number; search?: string; page_size?: number }
    >({
      query: ({ status = "", page = 1, search = "", page_size = 10 }) => {
        const params: Record<string, string> = {
          page: String(page),
          page_size: String(page_size),
          status,
          search,
        };
        const qs = new URLSearchParams(params).toString();
        return `/plan/subscription/?${qs}`;
      },
      providesTags: ["Subscription"],
    }),

    // 6️⃣ Add subscription
    addSubscription: builder.mutation({
      query: (body) => ({
        url: "plan/subscriptions-create/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subscription"],
    }),

    // 7️⃣ Update subscription
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
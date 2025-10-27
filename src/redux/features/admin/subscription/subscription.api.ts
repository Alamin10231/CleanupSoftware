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
        return `/plan/subscription/?page${qs}`;
      },
      providesTags: ["Subscription"],
    }),
    getCollectionNewPlans: builder.query<any, void>({
      query: () => "plan/subscription/",
      providesTags: ["Subscription"],
    }),

    getAdminStatus: builder.query<any, { status?: string; page?: number }>({
      query: ({ status = "", page = 1 }) =>
        `plan/subscription/?page=${page}&status=${encodeURIComponent(status)}`,
      providesTags: ["Subscription"],
    }),

    getCollectionStatus: builder.query<any, { status?: string; page?: number }>(
      {
        query: ({ status = "", page = 1 }) =>
          `plan/subscription/?page=${page}&status=${encodeURIComponent(
            status
          )}`,
        providesTags: ["Subscription"],
      }
    ),
    addSubscription: builder.mutation({
      query: (body) => ({
         url: 'plan/subscriptions-create/',
         method: 'POST',
         body
      }),
      invalidatesTags: ["Subscription"]
    })
  }),
});

export const {
  useGetCalculationSubscriptionsQuery,
  useGetSubscriptionPageQuery,
  useGetCollectionNewPlansQuery,
  useGetAdminStatusQuery,
  useGetCollectionStatusQuery,
  useAddSubscriptionMutation
} = subscriptionApi;

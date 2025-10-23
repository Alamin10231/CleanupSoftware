import { baseApi } from "@/redux/api/baseApi";

export const SubscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionClient: builder.query<any, void>({
      query: () => "/plan/subscription/",
      providesTags: ["ClientSubscription"],
    }),
  }),
});

export const {
  useGetSubscriptionClientQuery,
} = SubscriptionApi;

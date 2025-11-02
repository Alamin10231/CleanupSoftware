import { baseApi } from "@/redux/api/baseApi";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (page = 1) => `notifications/?page=${page}`,
      providesTags: ["notification"],
    }),

    markAllRead: builder.mutation({
      query: () => ({
        url: "mark_read_bulk/",
        method: "POST",
      }),
      invalidatesTags: ["notification"],
    }),

    markOneRead: builder.mutation({
  query: (id) => ({
    url: "is_read_action/",
    method: "POST",
    body: { id },  // expects an object with `id`
  }),
  invalidatesTags: ["notification"],
}),

  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAllReadMutation,
  useMarkOneReadMutation,
} = notificationApi;

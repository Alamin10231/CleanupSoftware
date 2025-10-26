import { baseApi } from "@/redux/api/baseApi";

export const notificationApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      getNotifications: builder.query({
         query: () => "all_history/list/",
         providesTags: ['notification']
      })
   })
})

export const { useGetNotificationsQuery } = notificationApi

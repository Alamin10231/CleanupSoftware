import { baseApi } from "@/redux/api/baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/clients/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ClientProfile"],
    }),
  }),
});

export const {
  useUpdateProfileMutation,
} = profileApi;

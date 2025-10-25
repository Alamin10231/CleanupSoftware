import { baseApi } from "@/redux/api/baseApi";

export const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addClient: builder.mutation({
      query: (data) => ({
        url: `/clients/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["GetAllClientsAdmin"],
    }),
  }),
});

export const {
  useAddClientMutation,
} = clientApi;

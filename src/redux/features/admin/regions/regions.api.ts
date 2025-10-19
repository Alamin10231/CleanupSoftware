import { baseApi } from "@/redux/api/baseApi";

export const regionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getregions: builder.query<any, void>({
      query: () => "/locations/overview/",
      providesTags: ["region"],
    }),
    getcalculationregion: builder.query<any, void>({
      query: () => "/locations/overview/",
      providesTags: ["region"],
    }),
    addregion: builder.mutation({
      query: (region) => ({
        url: "/locations/overview/",
        method: "POST",
        body: region,
      }),
      invalidatesTags: ["region"],
    }),
  }),
});

export const {
  useGetregionsQuery,
  useGetcalculationregionQuery,
  useAddregionMutation,
} = regionsApi;

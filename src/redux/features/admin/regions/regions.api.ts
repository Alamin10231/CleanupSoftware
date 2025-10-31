import { baseApi } from "@/redux/api/baseApi";

export const regionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getregions: builder.query<any, void>({
      query: () => "/regions/",
      providesTags: ["region"],
    }),
    searchRegion: builder.query<any, string>({
      query: (search: string) => {
        if (search) {
          return `/regions/?search=${search}`;
        }
        return '/regions/';
      },
      providesTags: ["region"],
    }),
    getcalculationregion: builder.query<any, void>({
      query: () => "/locations/overview/",
      providesTags: ["region"],
    }),
    addregion: builder.mutation({
      query: (region) => ({
        url: "/regions/",
        method: "POST",
        body: region,
      }),
      invalidatesTags: ["region"],
    }),
    getRegions: builder.query<any, void>({
      query: () => "/regionlist/",
      providesTags: ["region"],
    }),
  }),
});

export const {
  useGetregionsQuery,
  useSearchRegionQuery,
  useGetcalculationregionQuery,
  useAddregionMutation,
  useGetRegionsQuery
} = regionsApi;

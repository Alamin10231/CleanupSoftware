import { baseApi } from "@/redux/api/baseApi";

export const ClientCodeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchClientRegion: builder.query({
      query: (search: string) => {
        if (search) {
          return `/regions/?search=${search}`;
        }
        return '/regions/';
      },
      providesTags: ["region"],
    }),
  }),
});

export const {
  useLazySearchClientRegionQuery,
} = ClientCodeApi;

import { baseApi } from "@/redux/api/baseApi";

export const getAllClientsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchAllClient: builder.query({
      query: (search: string) => {
        if (search) {
          return `search_apartment_by_region_client/?search=${search}`;
        }
        return 'search_apartment_by_region_client/';
      },
      providesTags: ["clients"],
    }),
  }),
});

export const {
  useLazySearchAllClientQuery,
} = getAllClientsApi;

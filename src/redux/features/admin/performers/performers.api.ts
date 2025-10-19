import { baseApi } from "@/redux/api/baseApi";
import type { PaginatedResponse } from "@/Types/building.types";

export const performersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopPerformersPage: builder.query<
      PaginatedResponse<TopPerformer>,
      { page?: number; page_size?: number }
    >({
      query: ({ page = 1, page_size = 10 } = {}) =>
        `/employees/top-performers/?page=${page}&page_size=${page_size}`,
    }),
  }),
});

export const { useGetTopPerformersPageQuery } = performersApi;

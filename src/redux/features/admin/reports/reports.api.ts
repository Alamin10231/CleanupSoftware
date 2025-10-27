import { baseApi } from "@/redux/api/baseApi";

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query({
      query: (queryString = "") => {
        // If queryString is provided, use it; otherwise, return base endpoint
        return queryString
          ? `supervisor-forms/?${queryString}`
          : 'supervisor-forms/';
      },
      providesTags: ["reports"],
    }),
  }),
});

export const {
  useGetReportsQuery,
} = reportsApi;

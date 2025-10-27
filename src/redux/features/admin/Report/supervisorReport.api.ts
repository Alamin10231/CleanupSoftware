import { baseApi } from "@/redux/api/baseApi";

export const SupervisorReport = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSupervisorReports: builder.query({
      query: (page: number = 1) => `supervisor-forms/?page=${page}&page_size=10`,
      providesTags: ["GetSupervisorReports"],
    }),
  }),
});

export const { useGetSupervisorReportsQuery } = SupervisorReport;

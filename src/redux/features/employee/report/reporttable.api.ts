import { baseApi } from "@/redux/api/baseApi";

export const employeeDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReportTable: builder.query<any,number>({
      query: (id:number) => `employees/${id}`,
      providesTags: ["Report"],
    }),
  }),
});

export const { useGetReportTableQuery } = employeeDashboardApi;

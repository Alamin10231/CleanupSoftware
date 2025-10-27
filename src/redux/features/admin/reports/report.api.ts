import { baseApi } from "@/redux/api/baseApi";

export const AdminReportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboardReports: builder.query<any, void>({
      query: () => "supervisor-forms/",
      providesTags: ["AdminDashboard"],
    }),
  }),
});

export const { useGetAdminDashboardReportsQuery } = AdminReportsApi;

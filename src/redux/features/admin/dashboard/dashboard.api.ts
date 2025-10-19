import { baseApi } from "@/redux/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboard: builder.query({
      query: ({ year, month }) => ({
        url: "/dashboard/",
        method: "POST",
        body: { year: Number(year), month: String(month).toLowerCase() },
      }),
      providesTags: ["AdminDashboard"],
    }),
  }),
});

export const { useGetAdminDashboardQuery } = dashboardApi;

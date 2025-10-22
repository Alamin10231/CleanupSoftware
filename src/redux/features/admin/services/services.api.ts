import { baseApi } from "@/redux/api/baseApi";

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServiceAdminOverview: builder.query({
      query: () => "task/total-service-details/",
      providesTags: ["GetServiceAdminOverview"],
    }),
    getAllServiceDataAdmin: builder.query({
      query: () => "task/services/details/",
      providesTags: ["GetAllServiceDataAdmin"],
    }),
    getServiceCategories: builder.query({
      query: () => "categories/",
      providesTags: ["ServiceCategories"],
    }),
  }),
});

export const {
  useGetServiceAdminOverviewQuery,
  useGetAllServiceDataAdminQuery,
  useGetServiceCategoriesQuery,
} = servicesApi;

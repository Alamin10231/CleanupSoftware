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
    addServiceCategory: builder.mutation({
      query: (category) => ({
        url: "categories/",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["ServiceCategories"],
    }),
    addService: builder.mutation({
      query: (payload) => ({
         url: "task/task_assign_employee/",
         method: "POST",
         body: payload
      })
    })
  }),
});

export const {
  useGetServiceAdminOverviewQuery,
  useGetAllServiceDataAdminQuery,
  useGetServiceCategoriesQuery,
  useAddServiceCategoryMutation,
  useAddServiceMutation
} = servicesApi;

import { baseApi } from "@/redux/api/baseApi";

export const buildingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => "/locations/overview/",
      providesTags: ["Building"],
    }),
    // GET all buildings with apartments (paginated)
    getBuildings: builder.query({
      query: (page = 1) => `/buildings/?page=${page}`,
      providesTags: ["Building"],
    }),

    getBuilidingBySearch: builder.query({
      query: (search: string) => ({
        url: "/buildings/",
        params: { search },
      }),
      providesTags: ["Building"],
    }),

    // GET single building details
    getBuildingById: builder.query({
      query: (id) => `/buildings/${id}`,
      providesTags: (id) => [{ type: "Building", id }],
    }),

    // POST create new building
    createBuilding: builder.mutation({
      query: (data) => ({
        url: "/buildings/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Building"],
    }),

    // PATCH update existing building
    updateBuilding: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/buildings/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ({ id }) => [{ type: "Building", id }],
    }),

    deleteBuilding: builder.mutation({
      query: (id) => ({
        url: `/buildings/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Building"],
    }),
    createApartment: builder.mutation({
      query: (data) => ({
        url: "/apartments/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Apartment"],
    }),
  }),
});

export const {
  useGetBuildingsQuery,
  useGetBuildingByIdQuery,
  useCreateBuildingMutation,
  useUpdateBuildingMutation,
  useCreateApartmentMutation,
  useDeleteBuildingMutation,
  useGetStatsQuery,
  useGetBuilidingBySearchQuery,
} = buildingApi;

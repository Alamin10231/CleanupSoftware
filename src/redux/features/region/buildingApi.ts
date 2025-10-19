import { apiSlice } from "@/redux/api/apiSlice";

export const buildingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

   // Stats
   getStats: builder.query({
      query: () => "/locations/overview/",
      providesTags: ["Building"],
   }),
    // GET all buildings with apartments (paginated)
    getBuildings: builder.query({
      query: (page = 1) => `/buildings/?page=${page}`,
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

    // DELETE building
    deleteBuilding: builder.mutation({
      query: (id) => ({
        url: `/buildings/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Building"],
    }),
  }),
});

export const {
  useGetBuildingsQuery,
  useGetBuildingByIdQuery,
  useCreateBuildingMutation,
  useUpdateBuildingMutation,
  useDeleteBuildingMutation,
  useGetStatsQuery
} = buildingApi;

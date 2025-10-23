import { baseApi } from "@/redux/api/baseApi";

export const planApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      getPlans: builder.query({
         query: (page = 1) => `plan/list/?page=${page}`,
         providesTags: ["plan"]
      }),
      getPlanById: builder.query({
        query: (id) => `plan/list/${id}/`,
        providesTags: (id) => [{ type: 'plan', id }],
      }),
      addPlan: builder.mutation({
         query: (payload) => ({
            url: "plan/list/",
            method: "POST",
            body: payload
         }),
         invalidatesTags: ['plan'],
      }),
      updatePlan: builder.mutation({
        query: ({ id, ...payload }) => ({
            url: `plan/list/${id}/`,
            method: 'PATCH',
            body: payload,
        }),
        invalidatesTags: (result, error, { id }) => [{ type: 'plan', id }, 'plan'],
      }),
   })
});

export const {
   useGetPlansQuery,
   useGetPlanByIdQuery,
   useAddPlanMutation,
   useUpdatePlanMutation,
} = planApi

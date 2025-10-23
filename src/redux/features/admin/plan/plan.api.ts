import { baseApi } from "@/redux/api/baseApi";

export const planApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      getPlans: builder.query({
         query: (page = 1) => `plan/list/?page=${page}`,
         providesTags: ["plan"]
      }),
      addPlan: builder.mutation({
         query: (payload) => ({
            url: "plan/list/",
            method: "POST",
            body: payload
         }),
      })
   })
});

export const {
   useGetPlansQuery,
   useAddPlanMutation
} = planApi

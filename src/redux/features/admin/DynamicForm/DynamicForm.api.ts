import { baseApi } from "@/redux/api/baseApi";

export const dynamicFormApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDynamicForm: builder.mutation({
      query: (form) => ({
        url: "forms/",
        method: "POST",
        body: form,
      }),
      // invalidatesTags: ["Invoice"], // uncomment if you want cache invalidation
    }),

    getFormById: builder.query({
      query: (id) => ({
        url: `forms/${id}/`,
        method: "GET",
      }),
    }),

    getForms: builder.query({
      query: () => ({
        url: "forms/",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddDynamicFormMutation,
  useGetFormByIdQuery,
  useGetFormsQuery,
} = dynamicFormApi;

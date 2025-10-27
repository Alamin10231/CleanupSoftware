import { baseApi } from "@/redux/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createForm: builder.mutation({
      query: (body) => ({
        url: "forms/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["form"],
    }),
    addResponse: builder.mutation({
      query: (body) => ({
        url: "forms/responses/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["form"],
    }),
    getForms: builder.query({
      query: () => ({
        url: "forms/",
        method: "GET",
      }),
      providesTags: ["form"],
    }),
    getFormSubmissions: builder.query({
      query: (page) => `form-submissions/?page=${page}`,
      providesTags: ["form"],
    }),
    submitForm: builder.mutation({
      query: (body) => ({
        url: "form-submissions/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["form"],
    }),
  }),
});

export const {
  useCreateFormMutation,
  useGetFormsQuery,
  useAddResponseMutation,
  useSubmitFormMutation,
  useGetFormSubmissionsQuery,
} = dashboardApi;

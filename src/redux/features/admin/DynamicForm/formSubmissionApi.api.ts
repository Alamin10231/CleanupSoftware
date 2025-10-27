import { baseApi } from "@/redux/api/baseApi";

export const formSubmissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitForm: builder.mutation({
      query: (data) => ({
        url: "form-submissions/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSubmitFormMutation } = formSubmissionApi;
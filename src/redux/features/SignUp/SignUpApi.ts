
import { apiSlice } from "../../api/apiSlice";

export const SignUpApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/users/register/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignUpMutation } = SignUpApi;

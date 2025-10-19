import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login/",
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: "/users/register/",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/users/verify-otp/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation, useVerifyOtpMutation } =
  authApi;


import { apiSlice } from "../../api/apiSlice";

export const OtpApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/users/verify-otp/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useVerifyOtpMutation } = OtpApi;

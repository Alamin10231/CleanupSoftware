import { baseApi } from "../../api/baseApi";

// Types
interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  refresh: string;
  access: string;
  user: {
    id: number;
    name: string;
    email: string;
    prime_phone: string;
    username: string;
    user_type: string;
    is_active: boolean;
  };
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
  prime_phone: string;
  user_type?: string;
}

interface OtpVerificationData {
  email: string;
  otp: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/users/login/",
        method: "POST",
        body: credentials,
      }),
    }),

    signUp: builder.mutation<any, SignUpData>({
      query: (data) => ({
        url: "/users/register/",
        method: "POST",
        body: data,
      }),
    }),

    verifyOtp: builder.mutation<any, OtpVerificationData>({
      query: (data) => ({
        url: "/users/verify-otp/",
        method: "POST",
        body: data,
      }),
    }),

    refreshToken: builder.mutation<{ access: string }, { refresh: string }>({
      query: (data) => ({
        url: "/users/token/refresh/",
        method: "POST",
        body: data,
      }),
    }),

    getCurrentUser: builder.query<LoginResponse["user"], void>({
      query: () => ({
        url: "/users/me/",
        method: "GET",
      }),
    }),
    forgetPassword: builder.mutation<any, { email: string }>({
      query: (data) => ({
        url: "/users/forget-password/",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/users/reset-password/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useVerifyOtpMutation,
  useRefreshTokenMutation,
  useGetCurrentUserQuery,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApi;

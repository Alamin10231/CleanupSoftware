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
      // Transform response to ensure all fields are present
      transformResponse: (response: LoginResponse) => {
        console.log("Raw API Response:", response);

        // Validate response structure
        if (!response.user) {
          throw new Error("Invalid response: user object missing");
        }

        // Ensure username exists, fallback to email if not present
        if (!response.user.username) {
          console.warn("Username missing in response, using email as fallback");
          response.user.username = response.user.email.split("@")[0];
        }

        console.log("Transformed User:", response.user);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("Login Error:", response);
        return response;
      },
    }),

    signUp: builder.mutation<any, SignUpData>({
      query: (data) => ({
        url: "/users/register/",
        method: "POST",
        body: data,
      }),
      transformErrorResponse: (response) => {
        console.error("Sign Up Error:", response);
        return response;
      },
    }),

    verifyOtp: builder.mutation<any, OtpVerificationData>({
      query: (data) => ({
        url: "/users/verify-otp/",
        method: "POST",
        body: data,
      }),
      transformErrorResponse: (response) => {
        console.error("OTP Verification Error:", response);
        return response;
      },
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
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useVerifyOtpMutation,
  useRefreshTokenMutation,
  useGetCurrentUserQuery,
} = authApi;

import { baseApi } from "@/redux/api/baseApi";

export const SubscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionClient: builder.query<any, void>({
      query: () => "/plan/subscription/",
      providesTags: ["ClientSubscription"],
    }),
    getEmployeeDetails: builder.query<any, number>({

      query: (employeeId) => `/employees/${employeeId}/`,
      providesTags: (result, error, employeeId) => [{ type: "Employee", id: employeeId }],
    }),
  }),
});

export const {
  useGetSubscriptionClientQuery,
  useLazyGetEmployeeDetailsQuery,
} = SubscriptionApi;

// src/redux/features/Client/Request.api.ts
import { baseApi } from "@/redux/api/baseApi";

export const requestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientSubscriptions: builder.query<any, { page?: number; page_size?: number } | void>({
      query: ({ page = 1, page_size = 5 } = {}) =>
        `client_dashboard/client-checkout-forms/?page=${page}&page_size=${page_size}`,
      providesTags: ["ClientSubscriptions"],
    }),

    sendClientRequest: builder.mutation<any, Record<string, any>>({
      query: (body) => ({
        url: `client_dashboard/client-checkout-forms/`,
        method: "POST",
        body,
      }),
    }),

    updateClientRequest: builder.mutation<any, { id: number; body: any }>({
      query: ({ id, body }) => ({
        url: `client_dashboard/client-checkout-forms/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["ClientSubscriptions"],
    }),

    deleteClientRequest: builder.mutation<any, number>({
      query: (id) => ({
        url: `client_dashboard/client-checkout-forms/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["ClientSubscriptions"],
    }),
  }),
});

export const {
  useSendClientRequestMutation,
  useGetClientSubscriptionsQuery,
  useUpdateClientRequestMutation,
  useDeleteClientRequestMutation,
} = requestApi;

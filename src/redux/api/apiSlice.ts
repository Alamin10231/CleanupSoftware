import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Subscription } from "../../assets/assets";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.10.13.61:8015/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Invoice", "subscription"],
  endpoints: (builder) => ({
    getInvoices: builder.query<any, void>({
      query: () => "/plan/invoice/list/",
      providesTags: ["Invoice"],
    }),

    addInvoice: builder.mutation({
      query: (invoice) => ({
        url: "/plan/invoice/list/",
        method: "POST",
        body: invoice,
      }),
      invalidatesTags: ["Invoice"],
    }),

    getSubscription: builder.query<any, void>({
      query: () => "/plan/subscription/list/",
      providesTags: ["subscription"],
    }),

    addSubscription: builder.mutation({
      query: (subscription) => ({
        url: "/plan/invoice/list/",
        method: "POST",
        body: subscription,
      }),
      invalidatesTags: ["subscription"],
    }),
  }),
});

export const { useGetInvoicesQuery, useAddInvoiceMutation } = apiSlice;

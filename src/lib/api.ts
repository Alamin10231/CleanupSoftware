import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const invoiceApi = createApi({
  reducerPath: 'invoiceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://lisa-nondisposable-judgingly.ngrok-free.app/api/v1/' }),
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: () => 'plan/invoice/list/',
    }),
  }),
});

export const { useGetInvoicesQuery } = invoiceApi;

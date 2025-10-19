import { baseApi } from "@/redux/api/baseApi";

export const invoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: (params = "") => `/plan/invoice/list/${params}`,
      providesTags: ["Invoice"],
    }),
    getCalculationInvoice: builder.query({
      query: () => "/plan/calculations/",
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
    getSearchAllInvoice: builder.query({
      query: (searchInvoice = "") =>
        `plan/invoice/list/?search=${searchInvoice}`,
      providesTags: ["SearchInvoices"],
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useAddInvoiceMutation,
  useGetCalculationInvoiceQuery,
  useGetSearchAllInvoiceQuery,
} = invoiceApi;

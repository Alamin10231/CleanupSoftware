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
    updateInvoiceStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/plan/invoice/list/${id}/`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Invoice"],
    }),
    getSearchAllInvoice: builder.query({
      query: (searchInvoice = "") =>
        `plan/invoice/list/?search=${searchInvoice}`,
      providesTags: ["SearchInvoices"],
    }),
    addAdminInvoice: builder.mutation({
      query: (invoice) => ({
        url: "plan/invoice/list/",
        method: "POST",
        body: invoice,
      }),
      invalidatesTags: ["Invoice"],
    }),
    deleteInvoice: builder.mutation({
      query: (id) => ({
        url: `/plan/invoice/list/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Invoice"],
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useAddInvoiceMutation,
  useUpdateInvoiceStatusMutation,
  useGetCalculationInvoiceQuery,
  useGetSearchAllInvoiceQuery,
  useAddAdminInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoiceApi;

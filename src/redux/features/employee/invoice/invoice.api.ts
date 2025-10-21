import { baseApi } from "@/redux/api/baseApi";

export const invoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeInvoice: builder.query<any, { search?: string; page?: number }>({
      query: ({ search = "", page = 1 }) =>
        `invoice_request_from_client/list/?search=${search}&page=${page}`,
      providesTags: ["getEmployeeInvoice"],
    }),
    addEmployeeExpense: builder.mutation({
      query: (expense) => ({
        url: "invoice_request_from_client/list/",
        method: "POST",
        body: expense,
      }),
      invalidatesTags: ["getEmployeeInvoice"],
    }),
  }),
});

export const {
  useGetEmployeeInvoiceQuery,
  useAddEmployeeExpenseMutation,
} = invoiceApi;

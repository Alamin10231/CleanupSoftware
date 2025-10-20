import { baseApi } from "@/redux/api/baseApi";

export const invoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeInvoice: builder.query<any, string | void>({
      query: (search = "") => `invoice_request_from_client/list/?search=${search}`,
      providesTags: ["getEmployeeInvoice"],
    }),
  }),
});

export const {
  useGetEmployeeInvoiceQuery,
} = invoiceApi;

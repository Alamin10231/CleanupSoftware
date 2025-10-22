import { baseApi } from "@/redux/api/baseApi";

export const employeeExpenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all expenses with pagination + search
    getExpenses: builder.query({
      query: ({ page = 1, search = "" }) =>
        `/invoice_request_from_client/list/?page=${page}&search=${search}`,
      providesTags: ["EmployeeExpense"],
    }),

    // ✅ PATCH: update expense status
    updateExpenseStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/invoice_request_from_client/list/${id}/`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["EmployeeExpense"],
    }),
  }),
});

export const { useGetExpensesQuery, useUpdateExpenseStatusMutation } =
  employeeExpenseApi;

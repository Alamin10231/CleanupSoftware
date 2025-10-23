import { baseApi } from "@/redux/api/baseApi";

export const categoryAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query<any, void>({
      query: () => `categories/`,
      providesTags: ["ExpenseCategory"],
    })

  }),
});

export const {
  useGetCategoryQuery,
} = categoryAPI;

import { baseApi } from "@/redux/api/baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSearchClients: builder.query({
      query: (searchTerm = "") => `clients/?search=${searchTerm}`,
      providesTags: ["SearchClients"],
    }),
    getAllClientsAdmin: builder.query({
      query: (page = 1) => `/clients/?page=${page}`,
      providesTags: ["GetAllClientsAdmin"],
    }),
    getClientOverviewAdmin: builder.query({
      query: () => "clients/overview/",
      providesTags: ["GetClientOverviewAdmin"],
    }),
  }),
});

export const {
  useGetSearchClientsQuery,
  useGetAllClientsAdminQuery,
  useGetClientOverviewAdminQuery,
} = usersApi;

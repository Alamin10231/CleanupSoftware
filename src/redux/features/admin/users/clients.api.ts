// src/redux/features/admin/users/clients.api.ts
import { baseApi } from "@/redux/api/baseApi";

type ClientProfileInput = {
  avatar?: string | null;
  location?: string;
  birth_date?: string; // ISO
};

type CreateClientBody = {
  name: string;
  email: string;
  prime_phone: string;
  client_profile?: ClientProfileInput;
};

export const clientsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSearchClients: builder.query<any, string | undefined>({
      query: (searchTerm = "") => `/clients/?search=${searchTerm}`,
      providesTags: ["SearchClients"],
    }),

    getAllClientsAdmin: builder.query<any, number | undefined>({
      query: (page = 1) => `/clients/?page=${page}`,
      providesTags: ["GetAllClientsAdmin"],
    }),

    getClientOverviewAdmin: builder.query<any, void>({
      query: () => `/clients/overview/`,
      providesTags: ["GetClientOverviewAdmin"],
    }),

    createAdminClient: builder.mutation<any, CreateClientBody>({
      query: (body) => ({
        url: `/clients/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["GetAllClientsAdmin", "SearchClients", "GetClientOverviewAdmin"],
    }),

    updateClient: builder.mutation<any, { id: number; body: Partial<CreateClientBody> }>({
      query: ({ id, body }) => ({
        url: `/clients/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["GetAllClientsAdmin", "SearchClients", "GetClientOverviewAdmin"],
    }),

    deleteClient: builder.mutation<any, number>({
      query: (id) => ({
        url: `/clients/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["GetAllClientsAdmin", "SearchClients", "GetClientOverviewAdmin"],
    }),
    getClientDetails: builder.query({
    query: (id) => `/adminViewClientData/${id}/`,
      providesTags: ["GetAllClientsAdmin"],
    }),
  }),
});

export const {
  useGetSearchClientsQuery,
  useGetAllClientsAdminQuery,
  useGetClientOverviewAdminQuery,
  useCreateAdminClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useGetClientDetailsQuery,
} = clientsApi;

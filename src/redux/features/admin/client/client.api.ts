// import { baseApi } from "@/redux/api/baseApi";

// export const servicesApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     createAdminClient: builder.mutation<any, {
//       name: string;
//       email: string;
//       prime_phone: string;
//       address?: string;
//     }>({
//       query: (body) => ({
//         url: "/clients/",
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: ["Clients"], 
//     }),
//   }),
// });

// export const { useCreateAdminClientMutation } = servicesApi;


import { baseApi } from "@/redux/api/baseApi";

export const profileSettingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateEmployeeProfile: builder.mutation({
      query: ({ id, name, phone }) => ({
        url: `/employees/${id}/`,
        method: "PATCH",
        body: { name, prime_phone: phone },
      }),
      invalidatesTags: ["Employee"],
    }),

    updateEmployeeAvatar: builder.mutation({
      query: ({ id, file }) => {
        const fd = new FormData();
        fd.append("employee_profile.avatar", file);
        return { url: `/employees/${id}/`, method: "PATCH", body: fd };
      },
      invalidatesTags: ["Employee"],
    }),
    updateClientProfile: builder.mutation({
      query: ({ id, name, phone }) => ({
        url: `/clients/${id}/`,
        method: "PATCH",
        body: { name, prime_phone: phone },
      }),
      invalidatesTags: ["Employee"],
    }),

    updateClientAvatar: builder.mutation({
      query: ({ id, file }) => {
        const fd = new FormData();
        fd.append("client_profile.avatar", file);
        return { url: `/clients/${id}/`, method: "PATCH", body: fd };
      },
      invalidatesTags: ["Employee"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useUpdateEmployeeProfileMutation,
  useUpdateEmployeeAvatarMutation,
  useUpdateClientProfileMutation,
  useUpdateClientAvatarMutation,
} = profileSettingApi;

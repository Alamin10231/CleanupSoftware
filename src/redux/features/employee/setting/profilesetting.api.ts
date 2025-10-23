// src/redux/features/employee/setting/profilesetting.api.ts
import { baseApi } from "@/redux/api/baseApi";

type JsonData = Record<string, any>;
type UpdateEmployeeArgs = { id: number; data: FormData | JsonData };

// Optional: stricter type for avatar-only mutation
type UpdateAvatarArgs = { id: number; file: File }; // field name 'avatar' (DRF-style)

export const profileSettingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // --- Me ---
    getMe: builder.query<any, void>({
      query: () => ({ url: "/employees/me/", method: "GET" }),
      providesTags: ["UpdateProfile"],
    }),

    // --- General profile update (JSON or FormData) ---
    updateEmployeeProfile: builder.mutation<any, UpdateEmployeeArgs>({
      query: ({ id, data }) => {
        const isForm = typeof FormData !== "undefined" && data instanceof FormData;
        return {
          url: `/employees/${id}/`,
          method: "PATCH",
          headers: isForm ? undefined : { "Content-Type": "application/json", Accept: "application/json" },
          body: isForm ? data : JSON.stringify(data),
          responseHandler: "text" as const, // avoids JSON-parse crash on HTML errors
        };
      },
      invalidatesTags: ["UpdateProfile"],
    }),

    // --- Avatar-only update (always FormData) ---
    updateEmployeeAvatar: builder.mutation<any, UpdateAvatarArgs>({
      query: ({ id, file }) => {
        const fd = new FormData();
        // 👇 match your backend field name: 'avatar' (change to 'photo' if needed)
        fd.append("avatar", file);

        return {
          url: `/employees/${id}/`,
          method: "PATCH",
          body: fd,                 // don't set Content-Type for FormData
          responseHandler: "text" as const,
        };
      },
      invalidatesTags: ["UpdateProfile"],
    }),

    // --- (Optional) Remove avatar endpoint if your API supports it ---
    // Some backends accept PATCH { avatar: null } to clear; others have a dedicated route.
    clearEmployeeAvatar: builder.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: `/employees/${id}/`,
        method: "PATCH",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ avatar: null }),
        responseHandler: "text" as const,
      }),
      invalidatesTags: ["UpdateProfile"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetMeQuery,
  useUpdateEmployeeProfileMutation,
  useUpdateEmployeeAvatarMutation,
  useClearEmployeeAvatarMutation,
} = profileSettingApi;

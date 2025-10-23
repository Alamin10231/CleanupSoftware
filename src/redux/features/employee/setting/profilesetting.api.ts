// src/redux/features/employee/setting/profilesetting.api.ts
import { baseApi } from "@/redux/api/baseApi";

type JsonData = Record<string, any>;
type UpdateEmployeeArgs = { id: number; data: FormData | JsonData };
type UpdateAvatarArgs = { id: number; file: File };

const safeParse = (x: any) => {
  if (!x) return {};
  if (typeof x === "string") {
    try { return x ? JSON.parse(x) : {}; } catch { return {}; }
  }
  return x;
};

// normalize helper so Navbar can use user.avatar / user.avatarUrl directly
const normalizeAvatar = (raw: any) => {
  const data = safeParse(raw);
  const avatar =
    data?.avatar ||
    data?.avatarUrl ||
    data?.employee_profile?.avatar ||
    "";
  return { ...data, avatar, avatarUrl: avatar };
};

export const profileSettingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<any, void>({
      query: () => ({ url: "/employees/me/", method: "GET" }),
      providesTags: ["UpdateProfile"],
      transformResponse: normalizeAvatar,
    }),

    updateEmployeeProfile: builder.mutation<any, UpdateEmployeeArgs>({
      query: ({ id, data }) => {
        const isForm = typeof FormData !== "undefined" && data instanceof FormData;
        return {
          url: `/employees/${id}/`,
          method: "PATCH",
          headers: isForm ? undefined : {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: isForm ? data : JSON.stringify(data),
          responseHandler: (r) => r.text(), // keep tolerant
        };
      },
      transformResponse: normalizeAvatar,   // ✅ parsed + normalized
      invalidatesTags: ["UpdateProfile"],
    }),

    updateEmployeeAvatar: builder.mutation<any, UpdateAvatarArgs>({
      query: ({ id, file }) => {
        const fd = new FormData();
        fd.append("avatar", file);
        return {
          url: `/employees/${id}/`,
          method: "PATCH",
          body: fd,
          responseHandler: (r) => r.text(),
        };
      },
      transformResponse: normalizeAvatar,   // ✅ parsed + normalized
      invalidatesTags: ["UpdateProfile"],
    }),

    clearEmployeeAvatar: builder.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: `/employees/${id}/`,
        method: "PATCH",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ avatar: null }),
        responseHandler: (r) => r.text(),
      }),
      transformResponse: normalizeAvatar,   // ✅ parsed + normalized (avatar becomes "")
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

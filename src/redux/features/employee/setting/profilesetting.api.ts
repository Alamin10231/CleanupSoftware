// src/redux/features/employee/setting/profilesetting.api.ts
import { baseApi } from "@/redux/api/baseApi";

type JsonData = Record<string, any>;
type UpdateEmployeeArgs = { id: number; data: FormData | JsonData };
type UpdateAvatarArgs = { id: number; file: File };

const safeParse = (x: any) => {
  if (!x) return {};
  if (typeof x === "string") {
    try {
      return x ? JSON.parse(x) : {};
    } catch {
      return {};
    }
  }
  return x;
};

// normalize helper so we can always access avatar/avatarUrl
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
    // GET current user
    getMe: builder.query<any, void>({
      query: ({id}) => ({ url: `/employees/${id}/`, method: "GET" }),
      providesTags: ["UpdateProfile"],
      transformResponse: normalizeAvatar,
    }),

    // PATCH: update any profile field (name, email, etc.)
    updateEmployeeProfile: builder.mutation<any, UpdateEmployeeArgs>({
      query: ({ id, data }) => {
        const isForm = typeof FormData !== "undefined" && data instanceof FormData;
        return {
          url: `/employees/${id}/`,
          method: "PATCH",
          headers: isForm
            ? undefined
            : { "Content-Type": "application/json", Accept: "application/json" },
          body: isForm ? data : JSON.stringify(data),
          responseHandler: async (r) => {
            try { return await r.json(); } catch { return {}; }
          },
        };
      },
      transformResponse: normalizeAvatar,
      invalidatesTags: ["UpdateProfile"],
    }),

    // PATCH: update avatar only
    updateEmployeeAvatar: builder.mutation<any, UpdateAvatarArgs>({
      query: ({ id, file }) => {
        const fd = new FormData();
        fd.append("avatar", file);
        return { url: `/employees/${id}/`, method: "PATCH", body: fd };
      },
      transformResponse: normalizeAvatar,
      invalidatesTags: ["UpdateProfile"],
    }),

    // PATCH: clear avatar
    clearEmployeeAvatar: builder.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: `/employees/${id}/`,
        method: "PATCH",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ avatar: null }),
      }),
      transformResponse: normalizeAvatar,
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

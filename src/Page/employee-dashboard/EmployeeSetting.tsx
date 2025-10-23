// src/pages/EmployeeProfileSettingsPage.tsx
import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useUpdateEmployeeProfileMutation } from "@/redux/features/employee/setting/profilesetting.api";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Camera } from "lucide-react";
import { toast } from "sonner";

type RootState = {
  auth: {
    user: {
      id?: number;
      name?: string;
      email?: string;
      phone?: string;
      role?: string;
      avatar?: string;
      avatarUrl?: string;
      user_type?: string;
      employee_profile?: {
        id?: number;
        department?: string;
        role?: string;
        shift?: string;
        avatar?: string | null;
        [k: string]: any;
      };
    } | null;
  };
};

const fallbackAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=User";
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

const EmployeeProfileSettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [updateEmployeeProfile, { isLoading, isSuccess, isError, error }] =
    useUpdateEmployeeProfileMutation();

  // ---- Form state
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
  });

  // ---- Avatar preview (LOCAL ONLY)
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(
    user?.avatar ||
      user?.avatarUrl ||
      user?.employee_profile?.avatar ||
      fallbackAvatar
  );

  const EMPLOYEE_ID = user?.id as number | undefined;

  const handleProfileChange = (
    field: keyof typeof profileData,
    value: string
  ) => setProfileData((prev) => ({ ...prev, [field]: value }));

  const handlePickAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setAvatarFile(f);
    setAvatarPreview(URL.createObjectURL(f)); // preview only (do NOT persist)
  };

  const handleSaveProfile = async () => {
    if (!EMPLOYEE_ID) {
      toast.error("Missing employee ID.");
      return;
    }

    try {
      let payload: FormData | { name: string; email: string };

      if (avatarFile) {
        const fd = new FormData();
        fd.append("name", profileData.name);
        fd.append("email", profileData.email);
        fd.append("avatar", avatarFile); // match backend field
        payload = fd;
      } else {
        payload = { name: profileData.name, email: profileData.email };
      }

      const raw = await updateEmployeeProfile({
        id: EMPLOYEE_ID,
        data: payload,
      }).unwrap();

      const data = safeParse(raw);

      // ✅ Normalize avatar from any of these spots:
      const serverAvatar: string =
        data?.avatar ||
        data?.avatarUrl ||
        data?.employee_profile?.avatar ||
        user?.avatar ||
        user?.avatarUrl ||
        user?.employee_profile?.avatar ||
        "";

      // Update Redux exactly like you do for name
      const updatedUser = {
        ...user,
        name: data?.name ?? profileData.name,
        email: data?.email ?? profileData.email,
        employee_profile: data?.employee_profile ?? user?.employee_profile,
        avatar: serverAvatar,
        avatarUrl: serverAvatar,
      };

      dispatch(setCredentials({ user: updatedUser }));
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // optional: free preview blob
      try {
        if (avatarPreview?.startsWith("blob:"))
          URL.revokeObjectURL(avatarPreview);
      } catch {}

      toast.success("Profile updated successfully.");
    } catch (err: any) {
      const status = err?.status ?? err?.originalStatus;
      const msg =
        typeof err?.data === "string"
          ? err.data
          : err?.data?.detail ||
            "Update failed. Please check your inputs and try again.";
      toast.error(`(${status || "Error"}) ${msg}`);
      console.error("❌ Update failed:", err);
    }
  };

  const statusText = useMemo(() => {
    if (isLoading) return "Saving...";
    if (isSuccess) return "Saved ✔";
    if (isError) return "Save failed";
    return "";
  }, [isLoading, isSuccess, isError]);

  return (
    <div className="space-y-6">
      {/* Profile Settings */}
      <div className="bg-white rounded-lg border p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Profile Settings</h1>
            <p className="text-sm text-gray-500 mt-1">
              Update your name, email, and profile picture.
            </p>
          </div>

          {statusText && (
            <span className="text-sm">
              {statusText}{" "}
              {isError && (
                <span className="text-red-600">
                  {typeof (error as any)?.data === "string"
                    ? (error as any).data
                    : (error as any)?.data?.detail || "Please try again."}
                </span>
              )}
            </span>
          )}
        </div>

        {/* Profile Picture */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <img
              src={avatarPreview}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border"
            />
            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 cursor-pointer">
              <Camera size={14} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePickAvatar}
              />
            </label>
          </div>
          <div className="text-xs text-gray-500">
            JPG/PNG/GIF • ~1MB max (server-dependent)
          </div>
        </div>

        {/* Full Name & Email */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm">
              Full Name
            </Label>
            <Input
              id="fullName"
              value={profileData.name}
              onChange={(e) =>
                setProfileData((p) => ({ ...p, name: e.target.value }))
              }
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) =>
                setProfileData((p) => ({ ...p, email: e.target.value }))
              }
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSaveProfile} disabled={isLoading}>
            {isLoading ? "Saving…" : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileSettingsPage;

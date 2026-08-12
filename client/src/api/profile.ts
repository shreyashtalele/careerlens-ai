import { api } from "./client";
import { Profile, UpdateProfileData } from "@/types/models";

export const profileApi = {
  getProfile: (): Promise<Profile> => {
    return api.get<Profile>("/profile");
  },

  updateProfile: (data: UpdateProfileData): Promise<Profile> => {
    return api.patch<Profile>("/profile", data);
  },

  deleteAccount: (
    password: string,
  ): Promise<{ success: boolean; message: string }> => {
    return api.delete<{ success: boolean; message: string }>(
      `/profile?password=${encodeURIComponent(password)}`,
    );
  },
};

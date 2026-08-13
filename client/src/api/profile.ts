import { api } from "./client";
import { apiClient } from "./client";
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
    return apiClient
      .delete<{ success: boolean; message: string }>("/profile", {
        data: { password },
      })
      .then((response) => response.data);
  },
};

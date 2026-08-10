import { apiClient } from "./client";
import { UpdateProfileData, ProfileResponse } from "@/types/models";

export const profileApi = {
  getProfile: () => {
    return apiClient.get<ProfileResponse>("/profile");
  },

  updateProfile: (data: UpdateProfileData) => {
    return apiClient.patch<ProfileResponse>("/profile", data);
  },

  deleteAccount: (password: string) => {
    return apiClient.delete<{ success: boolean; message: string }>("/profile", {
      data: { password },
    });
  },
};

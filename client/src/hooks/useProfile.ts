import { useState, useEffect } from "react";
import { profileApi } from "@/api/profile";
import { Profile, UpdateProfileData } from "@/types/models";
import { toast } from "@/lib/toast";
import { logError } from "@/lib/error-handler";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await profileApi.getProfile();
      setProfile(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load profile";
      setError(message);
      logError(err, "Fetch Profile");
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: UpdateProfileData) => {
    setIsLoading(true);
    setError(null);
    try {
      const updated = await profileApi.updateProfile(data);
      setProfile(updated);
      toast.success("Profile updated successfully");
      return updated;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update profile";
      setError(message);
      toast.error(message);
      logError(err, "Update Profile");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async (password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await profileApi.deleteAccount(password);
      toast.success("Account deleted successfully");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete account";
      setError(message);
      toast.error(message);
      logError(err, "Delete Account");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    isLoading,
    error,
    fetchProfile,
    updateProfile,
    deleteAccount,
  };
}

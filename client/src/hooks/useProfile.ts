import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:7000/api";

interface Profile {
  id: string;
  userId: string;
  headline?: string;
  bio?: string;
  skills?: string[];
  phone?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  location?: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch profile
  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data.data);
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to load profile";
      setError(message);
      console.error("Profile error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (data: Partial<Profile>) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(`${API_URL}/profile`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data.data);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to update profile";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete account
  const deleteAccount = async (password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { password },
      });
      localStorage.removeItem("token");
      return true;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to delete account";
      setError(message);
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

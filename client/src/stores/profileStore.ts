import { create } from "zustand";
import { Profile } from "@/types/models";

interface ProfileState {
  profile: Profile | null;
  isLoading: boolean;
  isEditing: boolean;
  error: string | null;
  setProfile: (profile: Profile) => void;
  updateProfile: (data: Partial<Profile>) => void;
  setEditing: (isEditing: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  isLoading: false,
  isEditing: false,
  error: null,

  setProfile: (profile) => set({ profile }),

  updateProfile: (data) =>
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...data } : null,
    })),

  setEditing: (isEditing) => set({ isEditing }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  reset: () =>
    set({ profile: null, isLoading: false, isEditing: false, error: null }),
}));

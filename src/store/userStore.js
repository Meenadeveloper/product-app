"use client";

import { create } from "zustand";
import { getProfile } from "@/services/propertyAPI";

const useUserStore = create((set) => ({
  profile: null,
  loading: false,
  error: null,

  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getProfile();
      const profile = data?.data || data;
      set({ profile, loading: false });
      return { ok: true, data: profile };
    } catch (error) {
      set({
        profile: null,
        error: error?.message || "Failed to fetch profile",
        loading: false,
      });
      return { ok: false, error };
    }
  },

   updateProfile: async (profileData) => {
    set({ loading: true, error: null });
    try {
      await updateProfile(profileData);
      set({ loading: false });
      // Optionally, refetch profile to sync
      await getProfile().then((data) => set({ profile: data }));
    } catch (error) {
      set({
        error: error.message || "Failed to update profile",
        loading: false,
      });
      throw error;
    }
  },

  clearUser: () => set({ profile: null }),
}));

export default useUserStore;

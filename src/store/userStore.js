"use client";

import { create } from "zustand";
import { getProfile } from "@/services/propertyAPI";

const useUserStore = create((set) => ({
  profile: null,

  fetchProfile: async () => {
    try {
      const data = await getProfile();
      set({ profile: data?.data || data });
    } catch (error) {
      console.error("Profile fetch failed");
    }
  },

  clearUser: () => set({ profile: null }),
}));

export default useUserStore;
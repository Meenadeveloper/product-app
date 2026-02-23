import axiosInstance from "@/services/axiosInstance";
import { API_ENDPOINTS } from "@/services/apiEndpoints";

export async function getSEO(pageKey) {
  try {
    const res = await axiosInstance.get(
      `${API_ENDPOINTS.SEO}?page=${pageKey}`
    );

    return res?.data?.data || null;
  } catch (error) {
    console.error("SEO fetch failed:", error.message);
    return null;
  }
}
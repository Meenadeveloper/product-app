import axiosInstance from "@/services/axiosInstance";
import { API_ENDPOINTS } from "@/services/apiEndpoints";
import { cache } from "react";
export const getProperty = cache(async (id) => {
  try {
    const res = await axiosInstance.get(
      `${API_ENDPOINTS.PROPERTY_DETAIL}/${id}`
    );

    console.log("Fetched property data:", res?.data?.data); // Debug log
    console.log("API Endpoint:", `${API_ENDPOINTS.PROPERTY_DETAIL}/${id}`); // Debug log
    return res?.data?.data || null;
  } catch (error) {
    console.error("Property fetch failed:", error.message);
    return null;
  }
});
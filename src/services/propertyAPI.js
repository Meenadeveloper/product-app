import { API_ENDPOINTS } from "@/services/apiEndpoints";
import axiosInstance, { apiForFiles } from "@/services/axiosInstance";

/* --------------------------------------------------
   COMMON RESPONSE HANDLER
-------------------------------------------------- */

const handleResponse = (res) => res.data;

const handleError = (error) => {
  console.error("API Error:", error?.response?.data || error.message);
  throw error?.response?.data || error;
};

/* --------------------------------------------------
   AUTH APIs
-------------------------------------------------- */

export const registerUser = async (data) => {
  try {
    const res = await axiosInstance.post(API_ENDPOINTS.REGISTER, data);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const loginUser = async (data) => {
  try {
    const res = await axiosInstance.post(API_ENDPOINTS.LOGIN, data);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const changePassword = async (data) => {
  try {
    const res = await axiosInstance.post(API_ENDPOINTS.CHANGE_PASSWORD, data);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const sendForgetPasswordOtp = async (data) => {
  try {
    const res = await axiosInstance.post(
      API_ENDPOINTS.FORGET_PASSWORD_OTP_SEND,
      data
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const verifyForgetPasswordOtp = async (data) => {
  try {
    const res = await axiosInstance.post(
      API_ENDPOINTS.FORGET_PASSWORD_VERIFY_OTP,
      data
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const updateForgetPassword = async (data) => {
  try {
    const res = await axiosInstance.post(
      API_ENDPOINTS.FORGET_PASSWORD_UPDATE,
      data
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

/* --------------------------------------------------
   PROFILE APIs
-------------------------------------------------- */

export const getProfile = async () => {
  try {
    const res = await axiosInstance.get(API_ENDPOINTS.PROFILE);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const updateProfile = async (data) => {
  try {
    const res = await apiForFiles.post(
      API_ENDPOINTS.PROFILE_UPDATE,
      data
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

/* --------------------------------------------------
   PROPERTY FILTER APIs
-------------------------------------------------- */

export const fetchFilterMaster = async () => {
  try {
    const res = await axiosInstance.get(
      API_ENDPOINTS.PROPERTY_FILTER_MASTER
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const fetchPropertyFilterMaster = async (filterParam = "") => {
  try {
    const res = await axiosInstance.get(
      API_ENDPOINTS.PROPERTY_FILTER_MASTER,
      {
        params: { filter: filterParam },
      }
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

/* --------------------------------------------------
   PROPERTY LISTING APIs
-------------------------------------------------- */

export const fetchHomePageData = async () => {
  try {
    const res = await axiosInstance.get(API_ENDPOINTS.HOME_API);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const propertyFilterList = async (params = {}) => {
  try {
    const res = await axiosInstance.get(
      API_ENDPOINTS.PROPERTY_FILTER_LIST,
      { params }
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const propertyList = async (params = {}) => {
  try {
    const res = await axiosInstance.get(
      API_ENDPOINTS.PROPERTY_LIST,
      { params }
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const propertyDetail = async (id) => {
  try {
    const res = await axiosInstance.get(
      `${API_ENDPOINTS.PROPERTY_DETAIL}/${id}`
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

/* --------------------------------------------------
   WISHLIST APIs
-------------------------------------------------- */

export const addToWishlist = async (data) => {
  try {
    const res = await axiosInstance.post(
      API_ENDPOINTS.ADD_WISHLIST,
      data
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const fetchWishlist = async () => {
  try {
    const res = await axiosInstance.get(
      API_ENDPOINTS.WISHLIST_LIST
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

/* --------------------------------------------------
   BLOG / SLIDER / FEATURED
-------------------------------------------------- */

export const fetchBlogList = async () => {
  try {
    const res = await axiosInstance.get(API_ENDPOINTS.BLOG_LIST);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const fetchSliderImages = async () => {
  try {
    const res = await axiosInstance.get(API_ENDPOINTS.SLIDER_IMAGES);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const fetchFeaturedProperties = async () => {
  try {
    const res = await axiosInstance.get(
      API_ENDPOINTS.FEATURE_PROPERTY_LIST
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

/* --------------------------------------------------
   ENQUIRY / CAREER
-------------------------------------------------- */

export const submitEnquiry = async (data) => {
  try {
    const res = await axiosInstance.post(
      API_ENDPOINTS.ENQUIRY,
      data
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const submitLandOwnerEnquiry = async (data) => {
  try {
    const res = await axiosInstance.post(
      API_ENDPOINTS.LAND_OWNER_ENQUIRY,
      data
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const submitJobApplication = async (data) => {
  try {
    const res = await apiForFiles.post(
      API_ENDPOINTS.CAREER_FORM_SUBMIT,
      data
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};
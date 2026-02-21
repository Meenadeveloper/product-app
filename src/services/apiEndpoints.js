const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://www.lowcommissionqatar.com/backend/api/";

export const API_ENDPOINTS = {
  REGISTER: `${BASE_URL}register`,
  LOGIN: `${BASE_URL}login`,
  CHANGE_PASSWORD: `${BASE_URL}change_password`,
  FORGET_PASSWORD_OTP_SEND: `${BASE_URL}forget_password/send_otp`,
  FORGET_PASSWORD_VERIFY_OTP: `${BASE_URL}forget_password/verify_otp`,
  FORGET_PASSWORD_UPDATE: `${BASE_URL}forget_password/password_update`,
  LOGOUT: `${BASE_URL}logout`,
  PROFILE: `${BASE_URL}get_profile`,
  PROFILE_UPDATE: `${BASE_URL}update_profile`,
  // DELETE_PROPERTY: (id) => `${BASE_URL}/property/delete/${id}`,

  // property filter api's

  PROPERTY_FILTER_MASTER: `${BASE_URL}user/master-filter`,
  HOME_API: `${BASE_URL}user/dasboard`,
  PROPERTY_FILTER_LIST: `${BASE_URL}user/property-list-filter`,
  PROPERTY_LIST: `${BASE_URL}user/property-list`,
  PROPERTY_DETAIL: `${BASE_URL}user/property-details`,
  ENQUIRY: `${BASE_URL}enquiry`,
  LAND_OWNER_ENQUIRY: `${BASE_URL}land_owner_enquiry`,
  WISHLIST_LIST: `${BASE_URL}wishlist_list`,
  ADD_WISHLIST: `${BASE_URL}wishlist_request`,
  BLOG_LIST: `${BASE_URL}user/blog-list`,
  SLIDER_IMAGES: `${BASE_URL}user/sliderimage`,
  FEATURE_PROPERTY_LIST: `${BASE_URL}user/featured-list`,
  CAREER_FORM_SUBMIT: `${BASE_URL}career`,
  PROPERTY_SUGGESTION: `${BASE_URL}user/property-suggesstion`,

};

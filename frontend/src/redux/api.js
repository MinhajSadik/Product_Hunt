import axios from "axios";
const devEnv = process.env.NODE_ENV === "development";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const login = (formData) => API.post(`/api/v1/login`, formData);
export const register = (formData) => API.post(`/api/v1/register`, formData);
export const updateProfile = (profileData) =>
  API.put(`/api/v1/profile/update`, profileData);

export const updatePassword = (passwordData) =>
  API.put(`/api/v1/password/update`, passwordData);

export const forgotPassword = (forgotData) =>
  API.post(`/api/v1/password/forgot`, forgotData);

export const resetPassword = (resetData, token) =>
  API.put(`/api/v1/password/reset/${token}`, resetData);

export const getProducts = (link) => API.get(`/api/v1/products/${link}`);

export const getProductDetails = (id) => API.get(`/api/v1/product/${id}`);

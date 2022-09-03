import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });

//get token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("token")).token
    }`;
  }
  // console.log("config", req.headers.Authorization);
  return req;
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

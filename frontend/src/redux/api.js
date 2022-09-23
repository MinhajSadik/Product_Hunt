import axios from "axios";
const devEnv = process.env.NODE_ENV === "development";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

// const API = axios.create({
//   baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
// });

console.log(REACT_APP_DEV_API, REACT_APP_PROD_API, devEnv);

const API = axios.create({
  baseURL: REACT_APP_DEV_API,
});

//get token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("token")).token
    }`;
  }
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

import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });

//get token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = (formData) => API.post(`/api/v1/login`, formData);
export const register = (formData) => API.post(`/api/v1/register`, formData);

// export const getProducts = () => API.get(`/api/v1/products`);

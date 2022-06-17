import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });

export const login = (formData) => API.post(`/api/v1/login`, formData);
export const register = (formData) => API.post(`/api/v1/register`, formData);

// export const getProducts = () => API.get(`/api/v1/products`);

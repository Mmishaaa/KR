import axios, { InternalAxiosRequestConfig } from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URI || "http://localhost:7000/api",
});

const authInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (config.headers) {
    config.headers.authorization = `Bearer ${token}`;
  }
  
  return config;
};

client.interceptors.request.use(authInterceptor);

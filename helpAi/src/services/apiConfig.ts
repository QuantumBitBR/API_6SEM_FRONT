import axios, { type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:5000"
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token && !config.url?.includes("/login")) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export { api };

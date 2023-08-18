import axios from "axios";
import envConfig from "./envConfig";

export const api = axios.create({ baseURL: envConfig.restPath });

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      window.location.href = "/";
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

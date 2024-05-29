import axios, { AxiosError } from "axios";

const $api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

$api.interceptors.request.use((config) => {
  const localStorage = window.localStorage;
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

$api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      if (error.response.status === 401) {
        const { localStorage, location } = window;
        location.pathname = "/auth";
        localStorage.removeItem("token");
        return Promise.reject({
          ...error,
          message: "Session expired. Please, log in",
        });
      } else {
        return Promise.reject({
          ...error,
          message: "Server error",
        });
      }
    }
  }
);

export default $api;

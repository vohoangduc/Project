import axios from "axios";

const token = localStorage.getItem("user_token");
const instance = axios.create({
  baseURL: import.meta.VITE_APP_BASE_ENDPOINT_API,
  timeout: 1000 * 60, // 60 secs
});

instance.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete instance.defaults.headers.common.Authorization;
    }
    return config;
  },

  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // Modify error
    if (error?.message === "canceled") return Promise.reject(error);
    error.response.data ||= {};
    error.response.data.errors = [];
    return Promise.reject(error);
  }
);

export default instance;

import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosClient.interceptors.request.use((config) => {
  if (["post", "put", "patch"].includes(config.method || "")) {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default axiosClient;

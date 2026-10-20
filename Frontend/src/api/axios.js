import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://filmypass-production.up.railway.app/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 4000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log network/backend error for dev debugging, graceful handling in caller
    console.warn(
      `[Axios API Warning]: ${error.config?.url || "API"} unreachable or returned error. Falling back to local demo state.`,
      error?.message,
    );
    return Promise.reject(error);
  },
);

export default apiClient;

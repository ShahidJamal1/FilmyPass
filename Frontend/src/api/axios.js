import axios from "axios";

// Determine API base URL dynamically
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && !envUrl.includes("localhost")) {
    return envUrl;
  }
  if (
    typeof window !== "undefined" &&
    window.location.hostname !== "localhost" &&
    window.location.hostname !== "127.0.0.1"
  ) {
    // When running in production on any deployed domain (Vercel, Netlify, etc.)
    return "https://filmypass-production.up.railway.app/api/v1";
  }
  return envUrl || "https://filmypass-production.up.railway.app/api/v1";
};

const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn(
      `[Axios API Warning]: ${error.config?.url || "API"} returned error:`,
      error?.message,
    );
    return Promise.reject(error);
  },
);

export default apiClient;

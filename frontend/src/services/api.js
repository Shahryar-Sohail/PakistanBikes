import axios from "axios";
import { LOCAL_STORAGE_KEYS } from "../constants";

/**
 * Central Axios instance.
 * Base URL is read from the VITE_API_URL environment variable so it can
 * differ between dev / staging / production without code changes.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Request interceptor ───────────────────────────────────────────────────────
// Attach the JWT Bearer token from localStorage to every outgoing request.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor ──────────────────────────────────────────────────────
// Handle 401 Unauthorized globally: clear stored credentials and redirect to login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

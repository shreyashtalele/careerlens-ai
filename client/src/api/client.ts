import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { toast } from "@/lib/toast";
import { logError } from "@/lib/error-handler";
import { ApiResponse } from "@/types/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:7000/api";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    logError(error, "API Request");
    return Promise.reject(error);
  },
);

// Response interceptor - Handle 401
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const url = error.config?.url;

    logError(error, "API Response");

    // If 401 and NOT delete account endpoint, redirect to login
    if (
      status === 401 &&
      !url?.includes("/profile") &&
      !url?.includes("delete")
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      const isAuthPage = ["/login", "/register"].includes(
        window.location.pathname,
      );
      if (!isAuthPage) {
        toast.error("Your session has expired. Please login again.");
        window.location.href = "/login";
      }
    }

    // For delete account 401, let the component handle it
    if (status === 401 && url?.includes("/profile")) {
      // Don't redirect, let the error propagate to the component
      return Promise.reject(error);
    }

    if (status === 403) {
      toast.error("You do not have permission to perform this action.");
    }

    if (status === 404) {
      toast.error("Resource not found.");
    }

    if (status === 429) {
      toast.warning("Too many requests. Please wait a moment and try again.");
    }

    if (status && status >= 500) {
      toast.error("Server error. Please try again later.");
    }

    return Promise.reject(error);
  },
);

// Type-safe API helpers
export const api = {
  get: <T>(url: string): Promise<T> => {
    return apiClient.get<ApiResponse<T>>(url).then((res) => res.data.data);
  },

  post: <T>(url: string, data?: unknown): Promise<T> => {
    return apiClient
      .post<ApiResponse<T>>(url, data)
      .then((res) => res.data.data);
  },

  patch: <T>(url: string, data?: unknown): Promise<T> => {
    return apiClient
      .patch<ApiResponse<T>>(url, data)
      .then((res) => res.data.data);
  },

  delete: <T>(url: string): Promise<T> => {
    return apiClient.delete<ApiResponse<T>>(url).then((res) => res.data.data);
  },

  put: <T>(url: string, data?: unknown): Promise<T> => {
    return apiClient
      .put<ApiResponse<T>>(url, data)
      .then((res) => res.data.data);
  },
};

export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    return data?.message || error.message || "An unexpected error occurred";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
};

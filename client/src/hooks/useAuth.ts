import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "@/lib/toast";
import { logError } from "@/lib/error-handler";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:7000/api";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ApiErrorResponse {
  message: string;
  errors?: Array<{ field: string; message: string }>;
}

export function useAuth() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    const toastId = toast.loading("Creating your account...");

    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        fullName: data.name,
        email: data.email,
        password: data.password,
      });

      toast.dismiss(toastId);
      toast.success("Account created successfully! Please login.");
      navigate("/login");
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      toast.dismiss(toastId);

      let message = "Registration failed. Please try again.";
      if (error.response?.data?.message) {
        message = error.response.data.message;
      }
      if (error.response?.data?.errors) {
        const fieldErrors = error.response.data.errors
          .map((e) => e.message)
          .join(", ");
        message = fieldErrors || message;
      }

      setError(message);
      toast.error(message);
      logError(err, "Registration");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginData) => {
    setIsLoading(true);
    setError(null);
    const toastId = toast.loading("Signing in...");

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: data.email,
        password: data.password,
      });

      const token = response.data.data.token;
      const user = response.data.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.dismiss(toastId);
      toast.success(`Welcome back, ${user.name || user.email}!`);
      navigate("/dashboard");
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      toast.dismiss(toastId);

      const message =
        error.response?.data?.message ||
        "Invalid credentials. Please try again.";
      setError(message);
      toast.error(message);
      logError(err, "Login");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.info("Logged out successfully");
    navigate("/login");
  };

  return {
    register,
    login,
    logout,
    isLoading,
    error,
  };
}

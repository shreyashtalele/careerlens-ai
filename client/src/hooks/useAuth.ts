import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

export function useAuth() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        fullName: data.name, // ← Backend expects 'fullName'
        email: data.email,
        password: data.password,
      });
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (err: any) {
      const message = err.response?.data?.message || "Registration failed";
      setError(message);
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: data.email,
        password: data.password,
      });
      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
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

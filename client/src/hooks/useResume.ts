import { useState, useEffect } from "react";
import { resumeApi } from "@/api/resume";
import { Resume, CreateResumeData } from "@/types/models";

export function useResume() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all resumes
  const loadResumes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await resumeApi.getResumes();
      setResumes(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load resumes");
    } finally {
      setIsLoading(false);
    }
  };

  // Load single resume
  // Load single resume
  const loadResume = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      console.log("loadResume - Token exists?", !!token);
      console.log("loadResume - Resume ID:", id);

      const data = await resumeApi.getResume(id);
      console.log("loadResume - Data received:", data);
      setSelectedResume(data);
    } catch (err: any) {
      console.error("loadResume - Error:", err);
      console.error("loadResume - Response:", err.response);

      const message =
        err.response?.data?.message || err.message || "Failed to load resume";
      setError(message);

      // If 401, redirect to login (handled by interceptor)
      // If 404, show not found
      if (err.response?.status === 404) {
        setError("Resume not found");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Create resume
  const createResume = async (data: CreateResumeData) => {
    setError(null);
    try {
      const newResume = await resumeApi.createResume(data);
      setResumes([...resumes, newResume]);
      return newResume;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create resume");
      throw err;
    }
  };

  // Update resume
  const updateResume = async (id: string, data: Partial<CreateResumeData>) => {
    setError(null);
    try {
      const updated = await resumeApi.updateResume(id, data);
      setResumes(resumes.map((r) => (r.id === id ? updated : r)));
      if (selectedResume?.id === id) {
        setSelectedResume(updated);
      }
      return updated;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update resume");
      throw err;
    }
  };

  // Delete resume
  const deleteResume = async (id: string) => {
    setError(null);
    try {
      await resumeApi.deleteResume(id);
      setResumes(resumes.filter((r) => r.id !== id));
      if (selectedResume?.id === id) {
        setSelectedResume(null);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete resume");
      throw err;
    }
  };

  // Set default resume
  const setDefault = async (id: string) => {
    setError(null);
    try {
      await resumeApi.setDefaultResume(id);
      setResumes(
        resumes.map((r) => ({
          ...r,
          isDefault: r.id === id,
        })),
      );
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to set default resume");
      throw err;
    }
  };

  // Load resumes on mount
  useEffect(() => {
    loadResumes();
  }, []);

  return {
    resumes,
    selectedResume,
    isLoading,
    error,
    loadResumes,
    loadResume,
    createResume,
    updateResume,
    deleteResume,
    setDefault,
  };
}

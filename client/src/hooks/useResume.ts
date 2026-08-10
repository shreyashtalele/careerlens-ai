import { useState, useEffect } from "react";
import {
  resumeApi,
  Resume,
  CreateResumeData,
  UpdateResumeData,
} from "@/api/resume";

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
  const loadResume = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await resumeApi.getResume(id);
      setSelectedResume(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load resume");
    } finally {
      setIsLoading(false);
    }
  };

  // Create resume - ADDED
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
  const updateResume = async (id: string, data: UpdateResumeData) => {
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
      const updated = await resumeApi.setDefaultResume(id);
      setResumes(
        resumes.map((r) => ({
          ...r,
          isDefault: r.id === id,
        })),
      );
      if (selectedResume?.id === id) {
        setSelectedResume(updated);
      }
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
    createResume, // ← Make sure this is exported
    updateResume,
    deleteResume,
    setDefault,
  };
}

import { useState, useEffect } from "react";
import { resumeApi } from "@/api/resume";
import { Resume, CreateResumeData } from "@/types/models";
import { toast } from "@/lib/toast";
import { logError } from "@/lib/error-handler";

export function useResume() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadResumes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await resumeApi.getResumes();
      setResumes(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load resumes";
      setError(message);
      logError(err, "Load Resumes");
    } finally {
      setIsLoading(false);
    }
  };

  const loadResume = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await resumeApi.getResume(id);
      setSelectedResume(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load resume";
      setError(message);
      logError(err, "Load Resume");
    } finally {
      setIsLoading(false);
    }
  };

  const createResume = async (data: CreateResumeData) => {
    setError(null);
    try {
      const newResume = await resumeApi.createResume(data);
      setResumes([...resumes, newResume]);
      toast.success("Resume created successfully");
      return newResume;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create resume";
      setError(message);
      toast.error(message);
      logError(err, "Create Resume");
      throw err;
    }
  };

  const updateResume = async (id: string, data: Partial<CreateResumeData>) => {
    setError(null);
    try {
      const updated = await resumeApi.updateResume(id, data);
      setResumes(resumes.map((r) => (r.id === id ? updated : r)));
      if (selectedResume?.id === id) {
        setSelectedResume(updated);
      }
      toast.success("Resume updated successfully");
      return updated;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update resume";
      setError(message);
      toast.error(message);
      logError(err, "Update Resume");
      throw err;
    }
  };

  const deleteResume = async (id: string) => {
    setError(null);
    try {
      await resumeApi.deleteResume(id);
      setResumes(resumes.filter((r) => r.id !== id));
      if (selectedResume?.id === id) {
        setSelectedResume(null);
      }
      toast.success("Resume deleted successfully");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete resume";
      setError(message);
      toast.error(message);
      logError(err, "Delete Resume");
      throw err;
    }
  };

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
      toast.success("Default resume updated");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to set default resume";
      setError(message);
      toast.error(message);
      logError(err, "Set Default Resume");
      throw err;
    }
  };

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

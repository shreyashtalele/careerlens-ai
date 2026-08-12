import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useResume } from "@/hooks/useResume";
import { ResumeView } from "@/components/resume/ResumeView";
import { ResumeForm } from "@/components/resume/ResumeForm";
import { Resume } from "@/types/models";
import { ResumeDetailSkeleton } from "@/components/resume/ResumeSkeleton";

export default function ResumeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedResume, loadResume, updateResume, isLoading, error } =
    useResume();
  const [isEditing, setIsEditing] = useState(false);
  const [resumeData, setResumeData] = useState<Resume | null>(null);

  useEffect(() => {
    console.log("ResumeDetail: id =", id);
    console.log("Token exists?", !!localStorage.getItem("token"));

    if (id) {
      console.log("Loading resume with id:", id);
      loadResume(id);
    }
  }, [id]);

  useEffect(() => {
    console.log("selectedResume changed:", selectedResume);
    console.log("Error:", error);

    if (selectedResume) {
      console.log("Formatting resume data...");
      const formattedResume: Resume = {
        ...selectedResume,
        personalDetails: selectedResume.personalDetails || {
          fullName: "",
          email: "",
          phone: "",
          location: "",
          linkedin: "",
          github: "",
          website: "",
        },
        skills: selectedResume.skills || [],
        experience: selectedResume.experience || [],
        education: selectedResume.education || [],
        projects: selectedResume.projects || [],
      };
      setResumeData(formattedResume);
    }
  }, [selectedResume, error]);

  const handleSave = async (data: Resume) => {
    if (!id) return;
    try {
      await updateResume(id, data);
      setIsEditing(false);
      if (id) loadResume(id);
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  if (isLoading) {
    return <ResumeDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error: {error}</p>
        <button
          onClick={() => navigate("/resumes")}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          ← Back to Resumes
        </button>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Resume not found</p>
        <button
          onClick={() => navigate("/resumes")}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          ← Back to Resumes
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {resumeData.title}
          </h1>
          {resumeData.isDefault && (
            <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-full">
              Default
            </span>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/resumes")}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            ← Back
          </button>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Edit Resume
            </button>
          ) : (
            <button
              onClick={() => {
                setIsEditing(false);
                if (id) loadResume(id);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <ResumeForm
          resume={resumeData}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <ResumeView resume={resumeData} />
      )}
    </div>
  );
}

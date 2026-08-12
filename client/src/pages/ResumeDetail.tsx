import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useResume } from "@/hooks/useResume";
import { ResumeView } from "@/components/resume/ResumeView";
import { ResumeForm } from "@/components/resume/ResumeForm";
import { Resume } from "@/types/models";
import { ResumeDetailSkeleton } from "@/components/resume/ResumeSkeleton";
import { Button, Badge } from "@/components/ui";
import { ArrowLeft, Edit, X } from "lucide-react";

export default function ResumeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedResume, loadResume, updateResume, isLoading, error } =
    useResume();
  const [isEditing, setIsEditing] = useState(false);
  const [resumeData, setResumeData] = useState<Resume | null>(null);

  useEffect(() => {
    if (id) {
      loadResume(id);
    }
  }, [id]);

  useEffect(() => {
    if (selectedResume) {
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
  }, [selectedResume]);

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
        <Button
          variant="outline"
          onClick={() => navigate("/resumes")}
          className="mt-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Resumes
        </Button>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Resume not found</p>
        <Button
          variant="outline"
          onClick={() => navigate("/resumes")}
          className="mt-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Resumes
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {resumeData.title}
          </h1>
          {resumeData.isDefault && (
            <Badge variant="success" className="mt-2">
              Default
            </Badge>
          )}
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate("/resumes")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          {!isEditing ? (
            <Button variant="primary" onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Resume
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                if (id) loadResume(id);
              }}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
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

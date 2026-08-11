import { useState } from "react";
import { useResume } from "@/hooks/useResume";
import { useNavigate } from "react-router-dom";
import { ResumeListSkeleton } from "@/components/resume/ResumeSkeleton";

export default function Resumes() {
  // Add 'createResume' here ↓↓↓
  const { resumes, isLoading, deleteResume, setDefault, createResume } =
    useResume();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      // Get user from localStorage
      const userStr = localStorage.getItem("user");
      console.log("Raw userStr from localStorage:", userStr);

      const user = userStr ? JSON.parse(userStr) : {};
      console.log("Parsed user object:", user);
      console.log("User name:", user.name);
      console.log("User email:", user.email);

      const resumeData = {
        title: newTitle,
        personalDetails: {
          fullName: user.name || "Test User",
          email: user.email || "test@example.com",
          phone: "",
          location: "",
          linkedin: "",
          github: "",
          website: "",
        },
        summary: "",
        skills: [],
        experience: [],
        education: [],
        projects: [],
      };

      console.log("Sending resume data:", JSON.stringify(resumeData, null, 2));

      await createResume(resumeData);

      setShowCreateForm(false);
      setNewTitle("");
    } catch (err) {
      console.error("Create failed:", err);
    }
  };

  // ... rest of your code stays the same
  const handleDelete = async (id: string) => {
    try {
      await deleteResume(id);
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (isLoading) {
    return <ResumeListSkeleton />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Resumes</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + New Resume
        </button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <form onSubmit={handleCreate}>
            <div className="flex gap-4">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter resume title..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Resume List */}
      {resumes.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500">No resumes yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Create your first resume to get started
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {resume.title}
                  </h3>
                  {resume.isDefault && (
                    <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-full">
                      Default
                    </span>
                  )}
                  <p className="text-sm text-gray-400 mt-2">
                    Updated: {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  {!resume.isDefault && (
                    <button
                      onClick={() => setDefault(resume.id)}
                      className="text-xs text-blue-600 hover:text-blue-700"
                    >
                      Set Default
                    </button>
                  )}
                  <button
                    onClick={() => navigate(`/resumes/${resume.id}`)}
                    className="text-xs text-gray-600 hover:text-gray-800"
                  >
                    View
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(resume.id)}
                    className="text-xs text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Resume?
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

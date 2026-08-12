import { useState } from "react";
import { useResume } from "@/hooks/useResume";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Button, Badge } from "@/components/ui";
import { FileText, Plus, Trash2, Star, Eye } from "lucide-react";

export default function Resumes() {
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
      // Get user from localStorage for personalDetails
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : {};

      await createResume({
        title: newTitle,
        personalDetails: {
          fullName: user.fullName || user.name || "",
          email: user.email || "",
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
      });
      setShowCreateForm(false);
      setNewTitle("");
    } catch (err) {
      console.error("Create failed:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteResume(id);
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resumes</h1>
          <p className="text-gray-500 mt-1">Manage your resumes</p>
        </div>
        <Button variant="primary" onClick={() => setShowCreateForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Resume
        </Button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleCreate} className="flex gap-4">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter resume title..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              <Button type="submit">Create</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Resume List */}
      {resumes.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No resumes yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Create your first resume to get started
            </p>
            <Button
              variant="primary"
              className="mt-4"
              onClick={() => setShowCreateForm(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Resume
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resumes.map((resume) => (
            <Card
              key={resume.id}
              className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {resume.title}
                      </h3>
                      {resume.isDefault && (
                        <Badge variant="success">Default</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      Updated: {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    {!resume.isDefault && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDefault(resume.id)}
                        className="text-xs text-blue-600 hover:text-blue-700"
                      >
                        <Star className="w-3 h-3 mr-1" />
                        Set Default
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/resumes/${resume.id}`)}
                      className="text-xs text-gray-600 hover:text-gray-800"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowDeleteConfirm(resume.id)}
                      className="text-xs text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
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
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

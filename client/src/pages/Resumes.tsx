import { useState } from "react";
import { useResume } from "@/hooks/useResume";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Button, Badge } from "@/components/ui";
import { FileText, Plus, Trash2, Star, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/Animated";

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
      <FadeIn>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Resumes
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mt-1">
              Manage your resumes
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowCreateForm(true)}
            className="w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Resume
          </Button>
        </div>
      </FadeIn>

      {/* Create Form */}
      {showCreateForm && (
        <FadeIn>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <form
                onSubmit={handleCreate}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter resume title..."
                  className="flex-1 px-4 py-3 sm:py-2 text-base sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1 sm:flex-none">
                    Create
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 sm:flex-none"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {/* Resume List */}
      {resumes.length === 0 ? (
        <FadeIn>
          <Card>
            <CardContent className="p-8 sm:p-12 text-center">
              <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg sm:text-xl text-gray-500">No resumes yet</p>
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
        </FadeIn>
      ) : (
        <StaggerChildren>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumes.map((resume) => (
              <motion.div
                key={resume.id}
                variants={StaggerItem}
                className="h-full"
              >
                <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 h-full flex flex-col">
                  <CardContent className="p-4 sm:p-6 flex flex-col flex-1">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-3 sm:gap-0">
                      <div className="flex-1 w-full sm:w-auto">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words">
                            {resume.title}
                          </h3>
                          {resume.isDefault && (
                            <Badge variant="success" className="text-xs">
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">
                          Updated:{" "}
                          {new Date(resume.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-row sm:flex-col gap-1 sm:gap-1 w-full sm:w-auto justify-start sm:justify-start flex-wrap sm:flex-nowrap">
                        {!resume.isDefault && (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 sm:flex-none"
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDefault(resume.id)}
                              className="text-xs text-blue-600 hover:text-blue-700 w-full sm:w-auto"
                            >
                              <Star className="w-3 h-3 mr-1" />
                              Set Default
                            </Button>
                          </motion.div>
                        )}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 sm:flex-none"
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/resumes/${resume.id}`)}
                            className="text-xs text-gray-600 hover:text-gray-800 w-full sm:w-auto"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 sm:flex-none"
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowDeleteConfirm(resume.id)}
                            className="text-xs text-red-600 hover:text-red-700 w-full sm:w-auto"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </StaggerChildren>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full"
          >
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
          </motion.div>
        </div>
      )}
    </div>
  );
}

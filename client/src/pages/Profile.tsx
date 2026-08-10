import { useState } from "react";
import { useProfile } from "@/hooks/useProfile";

export default function Profile() {
  const { profile, isLoading, updateProfile, deleteAccount } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    headline: "",
    bio: "",
    location: "",
    phone: "",
    website: "",
    github: "",
    linkedin: "",
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  // Load profile data into form when editing
  const startEditing = () => {
    if (profile) {
      setFormData({
        headline: profile.headline || "",
        bio: profile.bio || "",
        location: profile.location || "",
        phone: profile.phone || "",
        website: profile.website || "",
        github: profile.github || "",
        linkedin: profile.linkedin || "",
      });
      setIsEditing(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteAccount(deletePassword);
      // Redirect to login
      window.location.href = "/login";
    } catch (err) {
      // Error handled by hook
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        {!isEditing && (
          <button
            onClick={startEditing}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>

      {!isEditing ? (
        // View Mode
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          {/* Basic Info */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              About
            </h3>
            <p className="mt-2 text-gray-700">{profile?.bio || "No bio yet"}</p>
          </div>

          {/* Headline & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Headline
              </h3>
              <p className="mt-1 text-gray-700">
                {profile?.headline || "Not set"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Location
              </h3>
              <p className="mt-1 text-gray-700">
                {profile?.location || "Not set"}
              </p>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Skills
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile?.skills && profile.skills.length > 0 ? (
                profile.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-sm">No skills added</span>
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </h3>
            <p className="mt-1 text-gray-700">
              {profile?.phone || "No phone set"}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Links
            </h3>
            <div className="mt-2 space-y-1">
              {profile?.website && (
                <p className="text-blue-600">
                  <span className="text-gray-500">Website: </span>
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profile.website}
                  </a>
                </p>
              )}
              {profile?.github && (
                <p className="text-blue-600">
                  <span className="text-gray-500">GitHub: </span>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profile.github}
                  </a>
                </p>
              )}
              {profile?.linkedin && (
                <p className="text-blue-600">
                  <span className="text-gray-500">LinkedIn: </span>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profile.linkedin}
                  </a>
                </p>
              )}
            </div>
          </div>

          {/* Delete Account */}
          <div className="pt-6 border-t border-red-100">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Delete Account
            </button>
          </div>
        </div>
      ) : (
        // Edit Mode
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Headline
            </label>
            <input
              type="text"
              value={formData.headline}
              onChange={(e) =>
                setFormData({ ...formData, headline: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Senior Software Engineer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us about yourself"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., San Francisco, CA"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+1 234 567 8900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://yourwebsite.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GitHub
            </label>
            <input
              type="url"
              value={formData.github}
              onChange={(e) =>
                setFormData({ ...formData, github: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://github.com/username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn
            </label>
            <input
              type="url"
              value={formData.linkedin}
              onChange={(e) =>
                setFormData({ ...formData, linkedin: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Delete Account Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Delete Account
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              This action is permanent and cannot be undone. Enter your password
              to confirm.
            </p>
            <form onSubmit={handleDelete}>
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import { useAuthStore } from "@/stores/authStore";
import { useFormWithValidation } from "@/hooks/useFormWithValidation";
import { profileSchema, ProfileFormData } from "@/lib/validations";
import {
  Card,
  CardContent,
  Button,
  Badge,
  Avatar,
  AvatarFallback,
} from "@/components/ui";
import { MapPin, Globe, Link, Edit, Save, X } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/Animated";
import { toast } from "@/lib/toast";

export default function Profile() {
  const { profile, isLoading, updateProfile, deleteAccount } = useProfile();
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useFormWithValidation(profileSchema);

  useEffect(() => {
    if (profile && isEditing) {
      setValue("headline", profile.headline || "");
      setValue("bio", profile.bio || "");
      setValue("location", profile.location || "");
      setValue("phone", profile.phone || "");
      setValue("website", profile.website || "");
      setValue("github", profile.github || "");
      setValue("linkedin", profile.linkedin || "");
      setValue("portfolio", profile.portfolio || "");
    }
  }, [profile, isEditing, setValue]);

  const startEditing = () => {
    if (profile) {
      setIsEditing(true);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const cleanedData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          value === "" ? undefined : value,
        ]),
      );
      await updateProfile(cleanedData);
      setIsEditing(false);
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!deletePassword) {
      toast.error("Please enter your password");
      return;
    }

    if (deletePassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      await deleteAccount(deletePassword);
      // Only reaches here if successful
      setShowDeleteConfirm(false);
      setDeletePassword("");
      // Hook will navigate to login
    } catch (err: any) {
      // Error already handled in hook, just keep modal open
      console.error("Delete failed:", err);
      // DO NOT navigate, DO NOT close modal
    }
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  const displayName = user?.fullName || profile?.userId || "User";

  const getInitials = () => {
    if (displayName && displayName !== "User") {
      return displayName.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-500 mt-1">
              Manage your personal information
            </p>
          </div>
          {!isEditing && (
            <Button variant="primary" onClick={startEditing}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </FadeIn>

      {/* Profile Card */}
      <FadeIn delay={0.1}>
        <Card>
          {!isEditing ? (
            // View Mode
            <>
              <CardContent className="p-6 space-y-6">
                {/* Avatar and Basic Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-start gap-6"
                >
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="text-2xl bg-blue-100 text-blue-700">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      {displayName}
                    </h2>
                    {profile?.headline && (
                      <p className="text-gray-600">{profile.headline}</p>
                    )}
                    {profile?.location && (
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" />
                        {profile.location}
                      </p>
                    )}
                  </div>
                  <Badge variant="success" className="self-start">
                    Active
                  </Badge>
                </motion.div>

                {/* Bio */}
                {profile?.bio && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="border-t border-gray-100 pt-4"
                  >
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                      About Me
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {profile.bio}
                    </p>
                  </motion.div>
                )}

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="border-t border-gray-100 pt-4"
                >
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Contact
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {profile?.phone && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-sm">{profile.phone}</span>
                      </div>
                    )}
                    {profile?.website && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <a
                          href={profile.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Website
                        </a>
                      </div>
                    )}
                    {profile?.github && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Link className="w-4 h-4 text-gray-400" />
                        <a
                          href={profile.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          GitHub
                        </a>
                      </div>
                    )}
                    {profile?.linkedin && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Link className="w-4 h-4 text-gray-400" />
                        <a
                          href={profile.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          LinkedIn
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Skills */}
                {profile?.skills && profile.skills.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="border-t border-gray-100 pt-4"
                  >
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                      Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + index * 0.05 }}
                        >
                          <Badge variant="default">{skill}</Badge>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ✅ FIXED: Delete Account Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="border-t border-red-100 pt-4"
                >
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <h3 className="text-sm font-medium text-red-800">
                      Danger Zone
                    </h3>
                    <p className="text-sm text-red-600 mt-1">
                      Permanently delete your account and all associated data.
                    </p>
                    <Button
                      variant="danger"
                      size="sm"
                      className="mt-3"
                      onClick={() => setShowDeleteConfirm(true)}
                    >
                      Delete Account
                    </Button>
                  </div>
                </motion.div>
              </CardContent>
            </>
          ) : (
            // Edit Mode
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Edit Profile
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        reset();
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Headline */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Headline
                    </label>
                    <input
                      type="text"
                      {...register("headline")}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.headline ? "border-red-500" : "border-gray-200"
                      }`}
                      placeholder="e.g., Senior Software Engineer"
                    />
                    {errors.headline && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.headline.message}
                      </p>
                    )}
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      {...register("bio")}
                      rows={4}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.bio ? "border-red-500" : "border-gray-200"
                      }`}
                      placeholder="Tell us about yourself"
                    />
                    {errors.bio && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.bio.message}
                      </p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      {...register("location")}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.location ? "border-red-500" : "border-gray-200"
                      }`}
                      placeholder="e.g., San Francisco, CA"
                    />
                    {errors.location && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.location.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      {...register("phone")}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.phone ? "border-red-500" : "border-gray-200"
                      }`}
                      placeholder="+1 234 567 8900"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Website */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <input
                      type="url"
                      {...register("website")}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.website ? "border-red-500" : "border-gray-200"
                      }`}
                      placeholder="https://yourwebsite.com"
                    />
                    {errors.website && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.website.message}
                      </p>
                    )}
                  </div>

                  {/* GitHub */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GitHub
                    </label>
                    <input
                      type="url"
                      {...register("github")}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.github ? "border-red-500" : "border-gray-200"
                      }`}
                      placeholder="https://github.com/username"
                    />
                    {errors.github && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.github.message}
                      </p>
                    )}
                  </div>

                  {/* LinkedIn */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      {...register("linkedin")}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.linkedin ? "border-red-500" : "border-gray-200"
                      }`}
                      placeholder="https://linkedin.com/in/username"
                    />
                    {errors.linkedin && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.linkedin.message}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </form>
          )}
        </Card>
      </FadeIn>

      {/* ✅ FIXED: Delete Account Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
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
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                Password must be at least 6 characters
              </p>
              <div className="flex gap-3 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeletePassword("");
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="danger" className="flex-1">
                  Delete Account
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

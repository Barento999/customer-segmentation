import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserProfile, updateUserProfile } from "../services/api";

const Profile = () => {
  const { user, login } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    full_name: "",
    password: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getUserProfile();
      setProfile(data);
      setFormData({
        username: data.username || "",
        email: data.email || "",
        full_name: data.full_name || "",
        password: "",
      });
    } catch (error) {
      console.error("Failed to load profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      // Only send fields that have values
      const updateData = {};
      if (formData.username) updateData.username = formData.username;
      if (formData.email) updateData.email = formData.email;
      if (formData.full_name) updateData.full_name = formData.full_name;
      if (formData.password) updateData.password = formData.password;

      await updateUserProfile(updateData);

      setMessage({ type: "success", text: "Profile updated successfully!" });
      setEditing(false);

      // Reload profile
      await loadProfile();

      // Clear password field
      setFormData({ ...formData, password: "" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.detail || "Failed to update profile",
      });
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setEditing(false);
    setFormData({
      username: profile.username || "",
      email: profile.email || "",
      full_name: profile.full_name || "",
      password: "",
    });
    setMessage({ type: "", text: "" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <span className="text-5xl">👤</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 text-lg">Manage your account settings</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-6 border border-gray-100">
          {message.text && (
            <div
              className={`mb-4 p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-100 border border-green-400 text-green-700"
                  : "bg-red-100 border border-red-400 text-red-700"
              }`}>
              {message.text}
            </div>
          )}

          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-3xl">
                  {user?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {profile?.full_name || profile?.username}
                </h2>
                <p className="text-gray-600">@{profile?.username}</p>
                <span className="inline-block mt-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                  {profile?.role}
                </span>
              </div>
            </div>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold shadow-md hover:shadow-lg transform hover:scale-105">
                ✏️ Edit Profile
              </button>
            )}
          </div>

          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password (leave blank to keep current)
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold text-white shadow-md transition-all ${
                    saving
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:shadow-lg transform hover:scale-[1.02]"
                  }`}>
                  {saving ? "Saving..." : "💾 Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  disabled={saving}
                  className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02]">
                  ❌ Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-blue-600">
                    {profile?.total_predictions || 0}
                  </p>
                  <p className="text-sm text-gray-600">Predictions Made</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {profile?.total_saved_profiles || 0}
                  </p>
                  <p className="text-sm text-gray-600">Saved Profiles</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-purple-600">
                    {profile?.role === "admin" ? "∞" : "✓"}
                  </p>
                  <p className="text-sm text-gray-600">Access Level</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Username</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {profile?.username}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {profile?.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {new Date(profile?.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

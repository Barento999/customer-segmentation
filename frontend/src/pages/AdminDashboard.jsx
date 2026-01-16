import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPredictions: 0,
    totalProfiles: 0,
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddUser, setShowAddUser] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [newUserData, setNewUserData] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
    role: "user",
  });

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const response = await api.get("/admin/users");
      setUsers(response.data.users || []);

      setStats({
        totalUsers: response.data.total || 0,
        totalPredictions: response.data.total_predictions || 0,
        totalProfiles: response.data.total_profiles || 0,
      });
    } catch (error) {
      console.error("Failed to fetch admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", newUserData);
      setMessage({ type: "success", text: "User added successfully!" });
      setShowAddUser(false);
      setNewUserData({
        username: "",
        email: "",
        password: "",
        full_name: "",
        role: "user",
      });
      fetchAdminData();
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.detail || "Failed to add user",
      });
    }
  };

  const handleDeleteUser = async (userId, username) => {
    if (!confirm(`Are you sure you want to delete user "${username}"?`)) {
      return;
    }

    try {
      await api.delete(`/admin/users/${userId}`);
      setMessage({ type: "success", text: "User deleted successfully!" });
      fetchAdminData();
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.detail || "Failed to delete user",
      });
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      await api.put(`/admin/users/${userId}/role`, { role: newRole });
      setMessage({ type: "success", text: "Role updated successfully!" });
      fetchAdminData();
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.detail || "Failed to update role",
      });
    }
  };

  const handleToggleActive = async (userId, username, isActive) => {
    try {
      await api.put(`/admin/users/${userId}/toggle-active`);
      setMessage({
        type: "success",
        text: `User ${username} ${isActive ? "deactivated" : "activated"}!`,
      });
      fetchAdminData();
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.detail || "Failed to toggle user status",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="rounded-full h-16 w-16 border-4 border-accent-orange/30 border-t-accent-orange"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-red/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent-orange/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-warm rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">👑</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold gradient-text">
                  Admin Dashboard
                </h1>
              </div>
              <p className="text-text-secondary">
                Welcome back,{" "}
                <span className="font-semibold text-text-primary">
                  {user?.full_name || user?.username}
                </span>
              </p>
            </div>
            <button
              onClick={() => setShowAddUser(true)}
              className="px-6 py-3 bg-gradient-secondary text-white rounded-xl hover:shadow-lg transition-all font-semibold shadow-md transform hover:scale-105">
              ➕ Add User
            </button>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-xl shadow-lg border-2 ${
              message.type === "success"
                ? "bg-green-50 border-accent-green text-green-800"
                : "bg-red-50 border-accent-red text-red-800"
            }`}>
            <div className="flex items-center justify-between">
              <span>{message.text}</span>
              <button
                onClick={() => setMessage({ type: "", text: "" })}
                className="font-bold text-xl hover:opacity-70">
                ×
              </button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass bg-gradient-primary rounded-xl p-6 text-white shadow-lg card-hover border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Total Users</p>
                <p className="text-4xl font-bold mt-2">{stats.totalUsers}</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-4xl">👥</span>
              </div>
            </div>
          </div>

          <div className="glass bg-gradient-secondary rounded-xl p-6 text-white shadow-lg card-hover border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">
                  Total Predictions
                </p>
                <p className="text-4xl font-bold mt-2">
                  {stats.totalPredictions}
                </p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-4xl">📊</span>
              </div>
            </div>
          </div>

          <div className="glass bg-gradient-purple rounded-xl p-6 text-white shadow-lg card-hover border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">
                  Total Profiles
                </p>
                <p className="text-4xl font-bold mt-2">{stats.totalProfiles}</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-4xl">📋</span>
              </div>
            </div>
          </div>
        </div>

        {/* Add User Modal */}
        {showAddUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Add New User
              </h2>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={newUserData.username}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        username: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={newUserData.email}
                    onChange={(e) =>
                      setNewUserData({ ...newUserData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={newUserData.full_name}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        full_name: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newUserData.password}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        password: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    value={newUserData.role}
                    onChange={(e) =>
                      setNewUserData({ ...newUserData, role: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 bg-gradient-secondary text-white rounded-xl hover:shadow-lg font-semibold transition-all">
                    ✅ Add User
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddUser(false)}
                    className="flex-1 py-3 px-4 bg-gray-200 text-text-primary rounded-xl hover:bg-gray-300 font-semibold transition-all">
                    ❌ Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="glass rounded-2xl shadow-2xl p-6 border border-white/30 backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
            <span>👥</span> User Management
          </h2>

          {users.length === 0 ? (
            <p className="text-text-secondary text-center py-8">
              No users found
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">
                      Username
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">
                      Full Name
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">
                      Role
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-4 text-text-primary font-medium">
                        {u.username}
                      </td>
                      <td className="py-3 px-4 text-text-secondary">
                        {u.email}
                      </td>
                      <td className="py-3 px-4 text-text-secondary">
                        {u.full_name || "-"}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={u.role}
                          onChange={(e) =>
                            handleChangeRole(u.id, e.target.value)
                          }
                          disabled={u.id === user?.id}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold border-2 focus:ring-2 focus:ring-accent-blue ${
                            u.id === user?.id
                              ? "bg-gray-100 cursor-not-allowed border-gray-300"
                              : "bg-white hover:bg-gray-50 border-gray-300"
                          } ${
                            u.role === "admin"
                              ? "text-accent-orange"
                              : "text-text-primary"
                          }`}>
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() =>
                            handleToggleActive(u.id, u.username, u.is_active)
                          }
                          className={`px-3 py-1 rounded-full text-xs font-semibold hover:opacity-80 transition-opacity ${
                            u.is_active
                              ? "bg-accent-green/10 text-accent-green border-2 border-accent-green/20"
                              : "bg-gray-100 text-text-secondary border-2 border-gray-300"
                          }`}>
                          {u.is_active ? "✓ Active" : "○ Inactive"}
                        </button>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDeleteUser(u.id, u.username)}
                          disabled={u.id === user?.id}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                            u.id === user?.id
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-accent-red/10 text-accent-red hover:bg-accent-red/20 border-2 border-accent-red/20"
                          }`}>
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
